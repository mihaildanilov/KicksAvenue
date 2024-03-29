import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ProductModel } from '../models/ProductModel';
import { isAuth } from '../utils/utils';

export const productRouter = express.Router();
// /api/prodcuts
productRouter.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await ProductModel.find();
		res.json(products);
	})
);
// /api/slug/tshirt
productRouter.get(
	'/slug/:slug',
	asyncHandler(async (req, res) => {
		const product = await ProductModel.findOne({ slug: req.params.slug });
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ message: 'Product Not Found' });
		}
	})
);
// /api/products/updateCountInStock
//TODO implement this!!!
productRouter.put(
	'/products/updateCountInStock',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const products = req.body.products;

		const promises = products.map(async (p: { id: string; countInStock: number }) => {
			const productId = p.id;
			const countInStock = p.countInStock;

			const product = await ProductModel.findByIdAndUpdate(
				productId,
				{ countInStock },
				{ new: true }
			);

			return product;
		});

		const updatedProducts = await Promise.all(promises);

		res.json(updatedProducts);
	})
);

productRouter.post('/', async (req, res) => {
	try {
		// Check if a product with the same name and slug already exists
		const existingProduct = await ProductModel.findOne({
			name: req.body.name,
			slug: req.body.slug,
		});
		if (existingProduct) {
			return res.status(409).json({ message: 'Product already exists' });
		}

		// Create a new product with the data from the request
		const product = new ProductModel({
			name: req.body.name,
			slug: req.body.slug,
			imageSrc: req.body.image,
			imageAlt: req.body.imageAlt,
			price: req.body.price,
			brand: req.body.brand,
			category: req.body.category,
			description: req.body.description,
			countInStock: req.body.countInStock,
			rating: req.body.rating,
			numberOfReviews: req.body.numberOfReviews,
			color: req.body.color,
		});
		// Save the new product to the database
		const savedProduct = await product.save();

		// Return the saved product as the response
		res.send(savedProduct);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
});

productRouter.put('/slug/:slug', async (req, res) => {
	const productSlug = req.params.slug;
	try {
		const product = await ProductModel.findOne({ slug: productSlug });
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}

		product.name = req.body.name;
		product.slug = req.body.slug;
		if (req.body.imageSrc) {
			product.imageSrc = req.body.image;
		}
		product.imageAlt = req.body.imageAlt;
		product.price = req.body.price;
		product.brand = req.body.brand;
		product.category = req.body.category;
		product.description = req.body.description;
		product.countInStock = req.body.countInStock;
		product.rating = req.body.rating;
		product.numberOfReviews = req.body.numberOfReviews;
		product.color = req.body.color;
		const updatedProduct = await product.save();
		res.send(updatedProduct);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
});

productRouter.delete('/slug/:slug', isAuth, async (req: Request, res: Response) => {
	const productSlug = req.params.slug;
	try {
		// Find and delete the product
		const deletedProduct = await ProductModel.findOneAndDelete({ slug: productSlug });

		if (deletedProduct) {
			res.status(200).json({ message: 'Product deleted successfully' });
		} else {
			res.status(404).json({ message: 'Product not found' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
});

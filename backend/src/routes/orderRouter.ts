import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { Product, ProductModel } from '../models/ProductModel';
import { isAuth } from '../utils/utils';
import { Order, OrderModel } from '../models/OrderModel';
export const orderRouter = express.Router();

orderRouter.get(
	'/mine',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const orders = await OrderModel.find({ user: req.user._id });
		res.json(orders);
	})
);

orderRouter.get(
	'/:id',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const order = await OrderModel.findById(req.params.id);
		if (order) {
			res.json(order);
		} else {
			res.status(404).json({ message: 'Order Not Found' });
		}
	})
);

orderRouter.post(
	'/',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		try {
			if (!req.body.orderItems || req.body.orderItems.length === 0) {
				res.status(400).json({ message: 'Cart is empty' });
			} else {
				const createdOrder = await OrderModel.create({
					orderItems: req.body.orderItems.map((x: Product) => ({
						...x,
						product: x._id,
					})),
					shippingAddress: req.body.shippingAddress,
					paymentMethod: req.body.paymentMethod,
					itemsPrice: req.body.itemsPrice,
					shippingPrice: req.body.shippingPrice,
					taxPrice: req.body.taxPrice,
					totalPrice: req.body.totalPrice,
					user: req.user._id,
				} as Order);

				for (const orderItem of createdOrder.orderItems) {
					const product = await ProductModel.findById(orderItem.product);
					if (product) {
						product.countInStock -= Number(orderItem.quantity);
						await product.save();
					}
				}

				res.status(201).json({ message: 'Order Created', order: createdOrder });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'An error occurred while processing your request' });
		}
	})
);

orderRouter.put(
	'/:id/pay',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const order = await OrderModel.findById(req.params.id);

		if (order) {
			order.isPaid = true;
			order.paidAt = new Date(Date.now());
			order.paymentResult = {
				paymentId: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.email_address,
			};
			const updatedOrder = await order.save();

			res.send({ order: updatedOrder, message: 'Order Paid Successfully' });
		} else {
			res.status(404).json({ message: 'Order Not Found' });
		}
	})
);

orderRouter.get(
	'/',
	isAuth,
	asyncHandler(async (req, res) => {
		const orders: Order[] = await OrderModel.find({});
		res.json(orders);
	})
);

orderRouter.put(
	'/:id/deliver',
	isAuth,
	asyncHandler(async (req: Request, res: Response) => {
		const order = await OrderModel.findById(req.params.id);

		if (order) {
			order.isDelivered = true;
			order.deliveredAt = new Date(Date.now());

			const updatedOrder = await order.save();

			res.send({ order: updatedOrder, message: 'Order Delivered Successfully' });
		} else {
			res.status(404).json({ message: 'Order Not Found' });
		}
	})
);

orderRouter.delete('/:id', isAuth, async (req: Request, res: Response) => {
	const orderId = req.params.id;

	try {
		// Find the order by ID
		const order = await OrderModel.findById(orderId);

		if (!order) {
			return res.status(404).json({ message: 'Order not found' });
		}

		// Delete the order
		await OrderModel.findByIdAndDelete(orderId);

		return res.status(200).json({ message: 'Order deleted successfully' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal server error' });
	}
});

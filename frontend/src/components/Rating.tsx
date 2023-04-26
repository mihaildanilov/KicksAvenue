/* eslint-disable indent */

interface RatingProps {
	rating: number;
	numberOfReviews?: number;
	caption?: string;
}

const Rating = (props: RatingProps) => {
	const { rating, numberOfReviews, caption } = props;
	return (
		<div className="">
			<span>
				<i
					className={
						rating >= 1
							? 'fas fa-star'
							: rating >= 0.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>
				<i
					className={
						rating >= 2
							? 'fas fa-star'
							: rating >= 1.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>
				<i
					className={
						rating >= 3
							? 'fas fa-star'
							: rating >= 2.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>
				<i
					className={
						rating >= 4
							? 'fas fa-star'
							: rating >= 3.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			<span>
				<i
					className={
						rating >= 5
							? 'fas fa-star'
							: rating >= 4.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			{caption ? (
				<span>{caption}</span>
			) : numberOfReviews != null && numberOfReviews !== 0 ? (
				<span>{' ' + numberOfReviews + ' reviews'}</span>
			) : (
				<span />
			)}
		</div>
	);
};

export default Rating;

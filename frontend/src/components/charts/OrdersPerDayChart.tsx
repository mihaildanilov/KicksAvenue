import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGetAllOrdersQuery } from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { LoadingBox, MessageBoxError } from '../toasts';

const OrdersPerDayChart = () => {
	Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
	const { data: orders, isLoading: isLoadingOrders, error: errorOrders } = useGetAllOrdersQuery();

	const data = {
		labels: orders?.reduce<string[]>((acc, order) => {
			const date = new Date(order.createdAt).toLocaleDateString();
			if (!acc.includes(date)) {
				acc.push(date);
			}
			return acc;
		}, []),
		datasets: [
			{
				label: 'Orders per Day',
				data: orders?.reduce<{ [key: string]: number }>((acc, order) => {
					const date = new Date(order.createdAt).toLocaleDateString();
					if (!acc[date]) {
						acc[date] = 0;
					}
					acc[date]++;
					return acc;
				}, {}),
				fill: false,
				backgroundColor: '#2bff5d',
				borderColor: '#2bff5d',
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return isLoadingOrders ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<LoadingBox text="Action in progress" />
		</div>
	) : errorOrders ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<MessageBoxError message={getError(errorOrders as unknown as ApiError)} />
		</div>
	) : (
		<div className="">
			<div className="rounded-lg bg-white p-4 shadow">
				<Line data={data} options={options} />
			</div>
		</div>
	);
};

export default OrdersPerDayChart;

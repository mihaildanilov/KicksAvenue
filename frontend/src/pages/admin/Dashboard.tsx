import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	TotalSalesChart,
	OrdersPerDayChart,
	AverageOrderValueChart,
} from '../../components/charts';
import { LoadingBox, MessageBoxError } from '../../components/toasts';
import {
	useGetAllUsersQuery,
	useGetAllOrdersQuery,
	useGetProductQuery,
	useGetAllContactUsMessages,
} from '../../hooks';
import { ApiError } from '../../types';
import { getError } from '../../utils';
import { faChalkboardUser, faDollarSign, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
	const { data: users, isLoading: isLoadingUsers, error: errorUsers } = useGetAllUsersQuery();
	const { data: orders, isLoading: isLoadingOrders, error: errorOrders } = useGetAllOrdersQuery();
	const {
		data: products,
		isLoading: isLoadingProducts,
		error: errorProducts,
	} = useGetProductQuery();
	const undeliveredOrderCount = orders?.filter((order) => order.isDelivered === false).length;
	const {
		data: messages,
		isLoading: isLoadingMessages,
		error: errorMessages,
	} = useGetAllContactUsMessages();
	const unansweredMessageCount = messages?.filter(
		(message) => message.isAnswered === false
	).length;

	let totalEarnings = 0;
	orders?.forEach((order) => {
		totalEarnings += order.totalPrice;
	});

	return isLoadingUsers || isLoadingOrders || isLoadingProducts || isLoadingMessages ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<LoadingBox text="Action in progress" />
		</div>
	) : errorUsers || errorOrders || errorProducts || errorMessages ? (
		<div className="pt-[3.25rem] sm:ml-[20rem]">
			<MessageBoxError message={getError(errorUsers as unknown as ApiError)} />
		</div>
	) : (
		<div>
			<div className="mb-6 rounded-md border-b border-gray-200 bg-gray-50 p-4  pt-3">
				<h1 className=" pb-1 text-4xl font-bold text-gray-500">Dashboard</h1>
				<p className="mt-2 pb-2 text-lg text-gray-500">
					Welcome to the dashboard of your e-commerce store! Here, you can easily track
					your store&apos;s performance and make informed decisions.
				</p>
			</div>
			<div>
				<div className="mx-6 flex flex-wrap justify-between sm:justify-start">
					<div className="w-full  px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0 lg:mb-6 xl:w-1/3">
						<div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
							<div className="rounded-full bg-pink-600 bg-opacity-75 p-3">
								<svg
									className="h-8 w-8 text-white"
									viewBox="0 0 28 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
										fill="currentColor"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinejoin="round"
									/>
									<path
										d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
										stroke="currentColor"
										strokeWidth="2"
									/>
								</svg>
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{products?.length}
								</h4>
								<div className="text-gray-500">Available products</div>
							</div>
						</div>
					</div>
					<div className="w-full px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0  lg:mb-6 xl:w-1/3">
						<div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
							<div className="rounded-full bg-indigo-600 bg-opacity-75 p-3">
								<svg
									className="h-8 w-8 text-white"
									viewBox="0 0 28 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
										fill="currentColor"
									/>
									<path
										d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
										fill="currentColor"
									/>
									<path
										d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
										fill="currentColor"
									/>
									<path
										d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
										fill="currentColor"
									/>
									<path
										d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
										fill="currentColor"
									/>
									<path
										d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
										fill="currentColor"
									/>
								</svg>
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{users?.length}
								</h4>
								<div className="text-gray-500">Total customers</div>
							</div>
						</div>
					</div>

					<div className="w-full px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0 lg:mb-6 xl:w-1/3">
						<div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
							<div className="flex items-center justify-center rounded-full bg-orange-600 bg-opacity-75 p-3">
								<svg
									className="h-8 w-8 pt-1 text-white"
									viewBox="0 0 28 28"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
										fill="currentColor"
									/>
									<path
										d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
										fill="currentColor"
									/>
									<path
										d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
										fill="currentColor"
									/>
								</svg>
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{orders?.length}
								</h4>
								<div className="text-gray-500">Total orders</div>
							</div>
						</div>
					</div>

					<div className="w-full px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0 lg:mb-6 xl:w-1/3">
						<div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
							<div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 bg-opacity-75 p-3">
								<FontAwesomeIcon
									className="text-[27px] text-white"
									icon={faDollarSign}
								/>
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{totalEarnings.toFixed(2)}$
								</h4>
								<div className="text-gray-500">Total earnings</div>
							</div>
						</div>
					</div>
					<div className="w-full px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0  lg:mb-6 xl:w-1/3">
						<div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
							<div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-300 bg-opacity-75 p-3">
								<FontAwesomeIcon
									className="text-[23px] text-white"
									icon={faChalkboardUser}
								/>
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{undeliveredOrderCount}
								</h4>
								<div className="text-gray-500">Unfulfilled orders</div>
							</div>
						</div>
					</div>
					<div className="w-full px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0  lg:mb-6 xl:w-1/3">
						<div className="flex items-center rounded-md bg-white px-5 py-6 shadow-sm">
							<div className=" flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 bg-opacity-75 p-3">
								<FontAwesomeIcon
									className="text-[27px] text-white "
									icon={faEnvelope}
								/>
							</div>

							<div className="mx-5">
								<h4 className="text-2xl font-semibold text-gray-700">
									{unansweredMessageCount}
								</h4>
								<div className="text-gray-500">New letters</div>
							</div>
						</div>
					</div>

					<div className="w-full px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0 lg:mb-6 xl:w-1/3">
						<TotalSalesChart />
					</div>
					<div className="w-full px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0 lg:mb-6 xl:w-1/3">
						<OrdersPerDayChart />
					</div>
					<div className="w-full px-6 pt-6 sm:mb-6 sm:w-1/2 sm:pt-0 lg:mb-6  xl:w-1/3">
						<AverageOrderValueChart />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	itemName: string;
}

const ModalOutOfStock = (props: ModalProps) => {
	if (!props.isOpen) return null;

	return (
		<div className="top-32 fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<div
					className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-headline">
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
								<svg
									className="h-6 w-6 text-red-600"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</div>
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3
									className="text-lg leading-6 font-medium text-gray-900"
									id="modal-headline">
									{props.itemName} is out of stock
								</h3>
								<div className="mt-2">
									<p className="text-sm leading-5 text-gray-500">
										Unfortunately, {props.itemName} is currently out of stock.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
						<span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
							<button
								type="button"
								className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
								onClick={props.onClose}>
								Close
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalOutOfStock;

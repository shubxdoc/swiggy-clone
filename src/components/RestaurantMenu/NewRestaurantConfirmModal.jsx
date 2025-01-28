const NewRestaurantConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <>
      {isOpen && <div onClick={onClose} className="fixed inset-0"></div>}
      <div
        className={`${
          isOpen ? "bottom-5" : "-bottom-full"
        } fixed transition-all duration-300 inset-x-0 sm:max-w-lg sm:w-full m-3 sm:mx-auto`}
      >
        <div className="flex flex-col bg-white border shadow-md pointer-events-auto rounded-xl">
          <div className="flex items-center justify-between px-4 py-3">
            <h3 id="hs-basic-modal-label" className="font-bold text-gray-800 ">
              Items already in cart
            </h3>
          </div>
          <div className="p-4 overflow-y-auto">
            <p className="mt-1 text-sm text-gray-600">
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </p>
          </div>
          <div className="flex items-center justify-between px-4 py-3 gap-x-2">
            <button
              onClick={onClose}
              type="button"
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-800 uppercase bg-white border border-green-600 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
            >
              no
            </button>
            <button
              onClick={onConfirm}
              type="button"
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white uppercase bg-green-600 border border-transparent rounded-lg gap-x-2 hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none "
            >
              Yes, start afresh
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRestaurantConfirmModal;

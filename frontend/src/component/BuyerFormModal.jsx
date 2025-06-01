import React from 'react';

const BuyerFormModal = ({
  showBuyerForm,
  setShowBuyerForm,
  buyerData,
  setBuyerData,
  selectedPhone,
  handleBuyerFormChange,
  handleMarkAsSold
}) => {
  return (
    <div className={`inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showBuyerForm ? 'fixed' : 'hidden'}`}>
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Add Buyer Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Name *</label>
            <input
              type="text"
              name="buyer"
              value={buyerData.buyer}
              onChange={handleBuyerFormChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="buyerPhone"
              value={buyerData.buyerPhone}
              onChange={handleBuyerFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={buyerData.price}
              onChange={handleBuyerFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Address</label>
            <textarea
              name="buyerAddress"
              value={buyerData.buyerAddress}
              onChange={handleBuyerFormChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setShowBuyerForm(false)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => handleMarkAsSold(selectedPhone?._id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Mark as Sold
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerFormModal;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import axios from 'axios';

const api = {
  addPhone: async (phoneData) => {
    await axios.post('http://localhost:3000/api/phone', phoneData);
    console.log('Adding phone:', phoneData);
    return { success: true };
  }
};

const AddPhone = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    imei: '',
    costPrice: '',
    expectedSellingPrice: '',
    condition: 'Like New',
    seller: '',
    sellerAadharNumber: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.brand || !formData.model || !formData.imei || !formData.costPrice || !formData.expectedSellingPrice || !formData.seller || !formData.sellerAadharNumber) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await api.addPhone(formData);
      alert('Phone added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding phone:', error);
      alert('Error adding phone. Please try again.');
    }
    setLoading(false);
  };

  const handleReset = () => {
    setFormData({
      brand: '',
      model: '',
      imei: '',
      costPrice: '',
      expectedSellingPrice: '',
      condition: 'Like New',
      seller: '',
      sellerAadharNumber: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Phone</h1>
                <p className="text-gray-600 mt-1">Enter phone details to add to inventory</p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Phone Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Phone Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Apple, Samsung, OnePlus..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="iPhone 14, Galaxy S23..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IMEI Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="imei"
                    value={formData.imei}
                    onChange={handleChange}
                    placeholder="15-digit IMEI number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
              </div>

              {/* Pricing Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cost Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleChange}
                      placeholder="25000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Selling Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="expectedSellingPrice"
                      value={formData.expectedSellingPrice}
                      onChange={handleChange}
                      placeholder="30000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seller Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="seller"
                      value={formData.seller}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seller Aadhar Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="sellerAadharNumber"
                      value={formData.sellerAadharNumber}
                      onChange={handleChange}
                      placeholder="1234-5678-9012"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any additional notes about the phone condition, accessories, etc..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding Phone...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Add Phone
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPhone;
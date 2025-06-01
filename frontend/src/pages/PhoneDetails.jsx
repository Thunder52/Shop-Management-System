import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaCheckCircle, FaTrash } from 'react-icons/fa';
import BuyerFormModal from '../component/BuyerFormModal';

const Detail = ({ label, value }) => (
  <div>
    <span className="font-semibold">{label}:</span> {value}
  </div>
);

const PhoneDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [buyerData, setBuyerData] = useState({
    buyer: '',
    price: 0,
    buyerAddress: '',
  });

  const fetchPhone = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/phones/${id}`);
      setPhone(res.data);
    } catch (err) {
      console.error('Error fetching phone:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhone();
  }, [id]);

  const handleBuyerFormChange = (e) => {
    setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
  };

  const handleMarkAsSold = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/phones/${id}/sell`, buyerData);
      await fetchPhone();
      setShowBuyerForm(false);
      setBuyerData({ buyer: '', price: 0, buyerAddress: '' });
      alert('Phone marked as sold!');
    } catch (err) {
      console.error('Error marking phone as sold:', err);
      alert('Failed to mark as sold.');
    }
  };

  const deletePhone = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/phones/${id}`);
      alert('Phone deleted successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error deleting phone:', err);
      alert('Failed to delete phone.');
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading phone details...</div>;
  }

  if (!phone) {
    return <div className="text-center text-red-500 py-10">Phone not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </button>
      </div>

      {/* Phone Details Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📱 Phone Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <Detail label="Brand" value={phone.brand} />
          <Detail label="Model" value={phone.model} />
          <Detail label="IMEI" value={phone.imei} />
          <Detail label="Cost Price" value={`₹${phone.costPrice}`} />
          <Detail label="Expected Selling Price" value={`₹${phone.expectedSellingPrice}`} />
          <Detail label="Status" value={phone.sold ? '✅ Sold' : '🟢 Available'} />
          <Detail label="Condition" value={phone.condition} />
          <Detail label="Seller" value={phone.seller} />
          <Detail label="Seller Aadhar Number" value={phone.sellerAadharNumber} />
          <Detail label="Notes" value={phone.notes || 'N/A'} />
        </div>

        {phone.sold && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🧾 Buyer Details</h3>
            <Detail label="Buyer" value={phone.buyer} />
            <Detail label="Sold Price" value={`₹${phone.soldPrice}`} />
            <Detail label="Address" value={phone.buyerAddress} />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-4">
          {!phone.sold && (
            <button
              onClick={() => setShowBuyerForm(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg flex items-center"
            >
              <FaCheckCircle className="mr-2" /> Mark as Sold
            </button>
          )}
          <button
            onClick={deletePhone}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center"
          >
            <FaTrash className="mr-2" /> Delete Phone
          </button>
        </div>
      </div>

      {/* Buyer Modal */}
      <BuyerFormModal
        showBuyerForm={showBuyerForm}
        setShowBuyerForm={setShowBuyerForm}
        buyerData={buyerData}
        setBuyerData={setBuyerData}
        selectedPhone={phone}
        handleBuyerFormChange={handleBuyerFormChange}
        handleMarkAsSold={handleMarkAsSold}
      />
    </div>
  );
};

export default PhoneDetailPage;

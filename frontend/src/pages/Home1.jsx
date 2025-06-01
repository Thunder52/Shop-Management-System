import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, DollarSign, Package, TrendingUp, AlertCircle } from 'lucide-react';
import BuyerFormModal from '../component/BuyerFormModal'; 
import axios from 'axios';

const api = {
  getPhones: async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/phones');
      return response.data;
    } catch (error) {
      console.error('Error fetching phones:', error);
    }
  },
  searchPhones: async (query) => {
    const phones = await api.getPhones();
    return phones.filter(phone => 
      phone.brand.toLowerCase().includes(query.toLowerCase()) ||
      phone.model.toLowerCase().includes(query.toLowerCase()) ||
      phone.imei.includes(query)
    );
  },
  markAsSold: async (id, buyerData) => {
    await axios.patch(`http://localhost:3000/api/phones/${id}/sell`, buyerData);
    console.log(`Marking phone ${id} as sold with buyer data:`, buyerData);
  }
};

const Homepage = () => {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, available: 0, sold: 0, totalValue: 0 });
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [buyerData, setBuyerData] = useState({
    buyer: '', price: 0, buyerAddress: ''
  });

  useEffect(() => {
    fetchPhones();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setFilteredPhones(phones);
    }
  }, [searchQuery, phones]);

  useEffect(() => {
    calculateStats();
  }, [phones]);

  const fetchPhones = async () => {
    setLoading(true);
    try {
      const phoneData = await api.getPhones();
      setPhones(phoneData);
      setFilteredPhones(phoneData);
    } catch (error) {
      console.error('Error fetching phones:', error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredPhones(phones);
      return;
    }
    
    setLoading(true);
    try {
      const results = await api.searchPhones(searchQuery);
      setFilteredPhones(results);
    } catch (error) {
      console.error('Error searching phones:', error);
    }
    setLoading(false);
  };

  const calculateStats = () => {
    const total = phones.length;
    const available = phones.filter(p => !p.sold).length;
    const sold = phones.filter(p => p.sold).length;
    const totalValue = phones.reduce((sum, phone) => sum + (phone.sold ? 0 : phone.expectedSellingPrice), 0);
    
    setStats({ total, available, sold, totalValue });
  };

  const handleMarkAsSold = async (phoneId) => {
    try {
      await api.markAsSold(phoneId, buyerData);
      console.log(buyerData);
      await fetchPhones();
      setShowBuyerForm(false);
      setBuyerData({ buyer: '', price: 0, buyerAddress: '' });
      alert('Phone marked as sold successfully!');
    } catch (error) {
      console.error('Error marking phone as sold:', error);
      alert('Error marking phone as sold');
    }
  };

  const handleBuyerFormChange = (e) => {
    setBuyerData({ ...buyerData, [e.target.name]: e.target.value });
  };

  const StatsCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <Icon className="h-8 w-8" style={{ color }} />
      </div>
    </div>
  );

  const PhoneCard = ({ phone }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{phone.brand} {phone.model}</h3>
            <p className="text-gray-600 text-sm">IMEI: {phone.imei}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            phone.sold ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {phone.sold ? 'Sold' : 'Available'}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Cost Price:</span>
            <span className="font-medium">₹{phone.costPrice?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expected Price:</span>
            <span className="font-medium">₹{phone.expectedSellingPrice?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Condition:</span>
            <span className="font-medium">{phone.condition}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link
            to={`/phones/${phone._id}`}
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 text-center"
          >
            <Eye className="h-4 w-4" />
            View
          </Link>
          {!phone.sold && (
            <button
              onClick={() => { 
                setSelectedPhone(phone); 
                setShowBuyerForm(true); 
              }}
              className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
            >
              <DollarSign className="h-4 w-4" />
              Sell
            </button>
          )}
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Phone Inventory</h1>
          <p className="text-gray-600">Manage your phone inventory efficiently</p>
        </div>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard icon={Package} title="Total Phones" value={stats.total} color="#3B82F6" />
            <StatsCard icon={TrendingUp} title="Available" value={stats.available} color="#10B981" />
            <StatsCard icon={DollarSign} title="Sold" value={stats.sold} color="#F59E0B" />
            <StatsCard icon={AlertCircle} title="Total Value" value={`₹${stats.totalValue.toLocaleString()}`} color="#8B5CF6" />
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by brand, model, or IMEI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhones.map(phone => (
                <PhoneCard key={phone._id} phone={phone} />
              ))}
            </div>
          )}
        </div>

        <BuyerFormModal
  showBuyerForm={showBuyerForm}
  setShowBuyerForm={setShowBuyerForm}
  buyerData={buyerData}
  setBuyerData={setBuyerData}
  selectedPhone={selectedPhone}
  handleBuyerFormChange={handleBuyerFormChange}
  handleMarkAsSold={handleMarkAsSold}
/>
      </div>
    </div>
  );
};

export default Homepage;
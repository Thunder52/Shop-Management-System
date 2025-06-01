import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, Package } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PhoneManager</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/add"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive('/add-phone') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>Add Phone</span>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/"
              className={`p-2 rounded-lg ${
                isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <Home className="h-6 w-6" />
            </Link>
            <Link
              to="/add-phone"
              className={`p-2 rounded-lg ${
                isActive('/add-phone') ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
              }`}
            >
              <Plus className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
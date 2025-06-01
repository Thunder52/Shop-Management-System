import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Home1 from './pages/Home1';
import PhoneDetails from './pages/PhoneDetails';
import AddPhone from './pages/AddPhone';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home1 />} />
      <Route path="/phones/:id" element={<PhoneDetails />} />
      <Route path="/add" element={<AddPhone />} />
    </Routes>
  </Router>
);

export default App;
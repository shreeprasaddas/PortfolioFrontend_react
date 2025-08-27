import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import Contact from './component/conatac-page';
import Footer from './component/footer';

import './App.css'; 
import SecondHome from './component/second-home';
import Home from './component/home-page';
import Portfolio from './component/portfolio-page';
import Solutions from './component/solutions-page';
import AdminDashboard from './component/dashboard/AdminDashboard';
import AdminRegister from './component/dashboard/AdminRegister';

function App() {
  return (
    <Router>
      
        <NavBar />
        <Routes>
          <Route path="/" element={<SecondHome />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/register" element={<AdminRegister />} />
        </Routes>
        <Footer />
      
     
    </Router>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Careers from './pages/Careers'
import AdminDashboard from './pages/AdminDashboard'
import AddProperty from './pages/AddProperty'
import EditProperty from './pages/EditProperty'
import './styles/App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

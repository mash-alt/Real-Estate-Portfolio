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

// Layout component for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/properties" element={<PublicLayout><Properties /></PublicLayout>} />
      <Route path="/properties/:id" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
      <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/dashboard/add-property" element={<AddProperty />} />
      <Route path="/edit-property/:id" element={<EditProperty />} />
    </Routes>
  )
}

export default App

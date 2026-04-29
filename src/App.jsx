import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Overtime from './pages/Overtime'
import AnnualLeave from './pages/AnnualLeave'
import Severance from './pages/Severance'
import LaborPension from './pages/LaborPension'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overtime" element={<Overtime />} />
        <Route path="/annual-leave" element={<AnnualLeave />} />
        <Route path="/severance" element={<Severance />} />
        <Route path="/labor-pension" element={<LaborPension />} />
      </Routes>
    </Layout>
  )
}

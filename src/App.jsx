import { useState } from 'react'
import './Index.css'
import { Navigate, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Houstonrealestate from './pages/Houstonrealestate'
import ColumbusRealEstate from './pages/ColumbusRealEstate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Checkout from './pages/Checkout'
import OrderHistory from './components/columbus/OrderHistory'


function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to="/sale/domain-name=columbusrealestate.com" replace />} />
        {/* <Route path='forsale/houstonrealestate.com' element={<Houstonrealestate />} /> */}
        <Route path='sale/domain-name=columbusrealestate.com' element={<ColumbusRealEstate />} />
        <Route path='cart/checkout=176573365&tmskey=columbusrealestate.com' element={<Checkout />} />
        <Route path='order-history' element={<OrderHistory/>} />
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App

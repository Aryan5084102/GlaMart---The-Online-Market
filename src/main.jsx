import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import  Home  from './pages/Home.jsx'
import Cart from './components/Cart/Cart.jsx'
import Wishlist from '../src/components/Wishlist/Wishlist.jsx'
import  Layout  from './components/Layout/Layout.jsx'
import Singlepage from './components/Singlepage/Singlepage.jsx'
import HomePage from './pages/HomePage.jsx'
import Tshirt from './components/Caterory Section/Tshirt.jsx'
import Shoes from './components/Caterory Section/Shoes.jsx'
import Watch  from './components/Caterory Section/Watch.jsx'
import Bag from './components/Caterory Section/Bag.jsx'
import Sunglass from './components/Caterory Section/Sunglass.jsx'
import Jewellery from './components/Caterory Section/Jewellery.jsx'
import Login from './components/Loginpage/Login.jsx'
import Testing from './Testing.jsx'
import PaymentSuccess from './components/Cart/PaymentSuccess.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
        <Route path='/tshirt' element={<Tshirt />} />
        <Route path='/shoes' element={<Shoes />} />
        <Route path='/watch' element={<Watch />} />
        <Route path='/bag' element={<Bag />} />
        <Route path='/sunglass' element={<Sunglass />} />
        <Route path='/jewellery' element={<Jewellery />} />
        <Route path='/' element={<Home />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/singlepage/:id' element={<Singlepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/testing' element={<Testing />} />
        {/* <Route path='/paymentSuccess' element={<PaymentSuccess />} /> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

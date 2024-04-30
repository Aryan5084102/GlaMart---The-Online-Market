import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import CartContext from '../context/cart-context'
import axios from 'axios'
import {toast } from 'react-toastify';
import wishContext from '../context/wish-context'
import searchContext from '../context/search-context'
import CountItemCart from '../context/count-item-cart'
import WishCountItem from '../context/wish count-item'
import LoginContext from '../context/login-context'



function Layout() {
  const [wholeProduct, setWholeProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [countItemCart, setCountItemCart] = useState(0)
  const [wishCountItem, setWishCountItem] = useState(0)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")) || [])



  const addToCart = (id) => {
    setCart([...cart, id]);
    setCountItemCart(countItemCart + 1)
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item !== id));
    if(!(countItemCart === 0)){
      setCountItemCart(countItemCart-1)
    }
  }

  const removeFromWishlist = (id) =>{
    setWishlist(wishlist.filter((item) => item !== id))
    if(!(wishCountItem === 0)){
      setWishCountItem(wishCountItem - 1)
    }
  }

  const addToWishlist = (id) => {
    setWishlist([...wishlist, id])
    setWishCountItem(wishCountItem + 1)
  }

  const AllProduct = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=100');
      setWholeProduct(response.data.products)
      setFilteredData(response.data.products.slice(0, 30))
    } catch {
      console.log("Error");
    }
  }

  const filterDataBasedOnSearch = () => {
    const data = wholeProduct.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredData([...data])

  }

  useEffect(() => {
    AllProduct();
  }, []);
  useEffect(() => {
    if (searchTerm.length !== 0) {
      filterDataBasedOnSearch();

    }
    else {
      setFilteredData(wholeProduct.slice(0, 30))
    }
  }, [searchTerm])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "kminchelle",
        password: '0lelplR',
      })
    });
    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem("userData", JSON.stringify(data));
      setTimeout(function () {
        toast.success("Log in Successfully !")
      }, 2000);

      navigate(-1)
    } else {
      console.error('Login failed');
      toast.warning(" Invalid Credential !")
    }
  };

  


  return (

    <LoginContext.Provider value={{username,setUsername,password, setPassword, handleSubmit, userData, setUserData}}>
    <searchContext.Provider value={{ searchTerm, setSearchTerm, filteredData, setFilteredData }}>
      <wishContext.Provider value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, wholeProduct, setWholeProduct,}}>
        <CountItemCart.Provider value={{countItemCart, setCountItemCart}} >
        <WishCountItem.Provider value={{wishCountItem, setWishCountItem}}>
          <Navbar />
          <Outlet />
          <Footer />
        </WishCountItem.Provider>
        </CountItemCart.Provider>
        </CartContext.Provider>
      </wishContext.Provider>
    </searchContext.Provider>
    </LoginContext.Provider>
  )
}

export default Layout
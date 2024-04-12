import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import CartContext from '../context/cart-context'
import axios from 'axios'
import wishContext from '../context/wish-context'
import searchContext from '../context/search-context'



function Layout() {
  const [wholeProduct, setWholeProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const addToCart = (id) => {
    setCart([...cart, id]);
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item !== id));
  }

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item !== id))
  }

  const addToWishlist = (id) => {
    setWishlist([...wishlist, id])
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

  return (

    // <loginContext.Provider value={{username,setUsername}}>
    <searchContext.Provider value={{ searchTerm, setSearchTerm, filteredData, setFilteredData }}>
      <wishContext.Provider value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist }}>
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, wholeProduct, setWholeProduct }}>
          <Navbar />
          <Outlet />
          <Footer />
        </CartContext.Provider>
      </wishContext.Provider>
    </searchContext.Provider>
    // </loginContext.Provider>
  )
}

export default Layout
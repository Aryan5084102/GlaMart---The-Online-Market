import React, { useContext, useState } from 'react'
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import searchContext from './context/search-context';
import Badge from '@mui/material/Badge';
import CountItemCart from './context/count-item-cart';
import WishCountItem from './context/wish count-item';
import LoginContext from './context/login-context';
import logo from '../assets/favicon.png'

function Navbar() {
  const {userData} = useContext(LoginContext)

  const [loginText, setLoginText] = useState("Log in")
  const {countItemCart} = useContext(CountItemCart)
  const {wishCountItem} = useContext(WishCountItem)
  const {setSearchTerm} = useContext(searchContext)

  const loginSubmit = () =>{
    }
    const searchProductitem = (val) => {
      setSearchTerm(val)
  }

  return (
    <>
      <div className='flex bg-[#D7E4C0] justify-between items-center px-4 py-2 sticky top-0 left-0 z-10 '>
        <Link to="/" className='flex items-center '>
          <div className='w-20 h-16 mr-1  '> <img  src={logo} alt='Logo' /> </div>
          <div className='text-3xl font-extrabold hover:text-[#0B7A74] cursor-text  '> <a href='#'>GlaMart</a> </div>
        </Link>
        <div className='flex items-center w-1/3 h-10 bg-white rounded-lg '>
          <div className='mx-3 text-[#0B7A74]'> <FaSearch /> </div>
          <div>
            <input type='text'
              placeholder='Search your own Desire Products'
              className='outline-none hover:outline-none mr-20 px-3 text-xl border-white'
              onChange={(e) => searchProductitem(e.target.value)}
            />
          </div>
        </div>
        <Link to='/' className='flex items-center w-14 text-xl hover:text-[#0B7A74] justify-between '>
          <div className='text-[#040606] hover:text-[#0B7A74]  mr-1'><FaHome /></div>
          <div className='font-bold hover:text-[#0B7A74] '>Home</div>
        </Link>
        <Link to='./wishlist' className='flex items-center w-14 text-xl ml-3 hover:text-[#0B7A74] justify-between '>
        <div className='font-bold hover:text-[#0B7A74] mr-1 '>Wishlist</div>
          <div className='relative text-[#040606] hover:text-[#0B7A74] font-bold  mr-1'><Badge badgeContent={wishCountItem} color="warning" >
            <IoIosHeartEmpty size={24} />
          </Badge>
          </div>
        </Link>
        <Link to='./cart' className='flex items-center w-14 text-xl hover:text-[#0B7A74] justify-between '>
        <div className='font-bold mr-1 '>Cart</div>
          <div className='text-[#040606] hover:text-[#0B7A74] mr-1'> <Badge badgeContent={countItemCart} color="warning" >
            <FaShoppingCart />
          </Badge>
          </div>
        </Link>
        <Link onClick={loginSubmit()} to="/login" className="px-3 py-2 bg-[#0B7A74] text-[#ffff]" >
            {loginText}
        </Link>
          
      </div>
    </>
  )
}

export default Navbar
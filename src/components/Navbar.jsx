import React, { useContext, useState } from 'react'
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import searchContext from './context/search-context';
import { CgProfile } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import Badge from '@mui/material/Badge';


function Navbar() {
  const { setSearchTerm } = useContext(searchContext)
  const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")) || [])
  console.log(userData, "userData value")


  const searchProductitem = (val) => {
    setSearchTerm(val)
  }

  const logoutButtonHandler = () => {
    sessionStorage.removeItem(userData)
    window.location.reload
  }

  return (
    <>
      <ToastContainer limit={3}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <div className='flex bg-[#D7E4C0] justify-between items-center px-4 py-2 sticky top-0 left-0 z-10 '>
        <Link to="/" className='flex items-center '>
          <div className='w-20 h-16 mr-1 '> <img src='../favicon/favicon.png' alt='Logo' /> </div>
          <div className='text-3xl font-extrabold hover:text-[#0B7A74] cursor-text '> <a href='#'>GlaMart</a> </div>
        </Link>
        <div className='flex items-center w-1/3 h-10 bg-white rounded-lg'>
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
          <div className='relative text-[#040606] hover:text-[#0B7A74] font-bold  mr-1'><Badge badgeContent={3} color="warning" >
            <IoIosHeartEmpty size={24} />
          </Badge>
          </div>
        </Link>
        <Link to='./cart' className='flex items-center w-14 text-xl hover:text-[#0B7A74] justify-between '>
        <div className='font-bold mr-1 '>Cart</div>
          <div className='text-[#040606] hover:text-[#0B7A74] mr-1'> <Badge badgeContent={1} color="warning" >
            <FaShoppingCart />
          </Badge>
          </div>
        </Link>
        {
          userData.length !== 0 ?
            (<Link to="/profile" className=" text-xl flex items-center justify-center gap-1  text-[#0B7A74]" >
              <div><CgProfile /></div>
              <div>username</div>
            </Link>) :
            (<Link to="/login" className="px-3 py-2 bg-[#0B7A74] text-[#ffff]" >
              Log in
            </Link>)

        }
      </div>
    </>
  )
}

export default Navbar
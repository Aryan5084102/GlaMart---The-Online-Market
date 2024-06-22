import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { IoIosHeartEmpty,IoIosHeart } from "react-icons/io";
import wishContext from '../context/wish-context'
import {toast} from "react-toastify";

function Card({product}) {
  const { wishlist, addToWishlist,removeFromWishlist } = useContext(wishContext)
  const [isInWishlist, setIsInWishlist] = useState(wishlist.includes(product.id)?true:false)

  // console.log(addToWishlist,"add to wish list item ")

  const handleAddToWishlist =(id) =>{
    if(isInWishlist){
      toast.error("Removed from Wishlist!")
      removeFromWishlist(product.id);
      setIsInWishlist(false);
    }
    else{
      toast.success("Added to Wishlist!")
      addToWishlist(product.id);
      setIsInWishlist(true);
    }
  }

  const navigate = useNavigate();
  return (
    <>
          <div 
          className='card w-56 h-80 cursor-pointer hover:scale-[1.1]'>
                <div className= 'object-contain relative '>
                   <Link to='#' onClick={() => handleAddToWishlist(product.id)} className='absolute right-1 top-1 text-3xl text-[#0B7A74]'>
                     { isInWishlist ?
                      <IoIosHeart className='text-red-500'/> :
                      <IoIosHeartEmpty /> 
                      }
                   </Link>
                   <img className='h-52 w-56' src={product.thumbnail} alt='Error'  onClick={()=>navigate(`/singlepage/${product.id}`)} />
                </div>
                <div  onClick={()=>navigate(`/singlepage/${product.id}`)}
                 className='pt-1 h-24 flex justify-center items-center flex-col  '>
                   <div className='title text-center pl-1 text-[18px] w-44 overflow-hidden whitespace-nowrap '>{product.title}</div>
                      <p className='rate text-center  text-[16px] text-[#0B7A74]'> <span className='text-[16px] font-semibold'>Price:</span> &#8377;{(product.price * 10).toFixed(0)}</p>
                      <div className='text-center'>
                        <Rating name="read-only" defaultValue={product.rating} precision={0.5} readOnly />
                      </div>
                </div>
          </div> 
    </>
  )
}

export default Card;
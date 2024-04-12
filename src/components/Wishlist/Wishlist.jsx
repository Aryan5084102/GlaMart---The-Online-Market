import React, { useContext, useEffect, useState } from 'react'
import { Trash } from 'lucide-react'
import { FaShoppingCart } from 'react-icons/fa'
import CartContext from '../context/cart-context'
import wishContext from '../context/wish-context'
import EmptyWishlist from './EmptyWishlist'
import { Rating } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Wishlist(props) {
  const wishId = props.id

  const { wholeProduct } = useContext(CartContext)
  const { wishlist, removeFromWishlist } = useContext(wishContext)
  const [filterWishlistItem, setFilterWishlistItem] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    wishlistData()
  }, [])

  const wishlistData = () => {
    const filterWishlist = wholeProduct.filter((item) => wishlist.includes(item.id))
    setFilterWishlistItem(filterWishlist)
  }

  const handleRemoveFromWishlist = (wishId) => {
    removeFromWishlist(wishId)
    wishlistData()
  }

  return (
    filterWishlistItem.length ?

      (<div className='w-full flex justify-center flex-col items-center py-5 '>
        <h1 className="text-3xl mb-5 font-bold tracking-tight text-gray-900 sm:text-4xl">
          My Wishlist
        </h1>
        <section aria-labelledby="cart-heading" className=" w-3/4 rounded-lg bg-slate-100 lg:col-span-8">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>
          <ul role="list" className="divide-y divide-gray-200 ">
            {filterWishlistItem?.map((items) => (
              <div key={items.id} className="" >
                <li className="flex py-6 sm:py-6 ">
                  <div className='flex' onClick={() => navigate(`/singlepage/${items.id}`)}>
                    <div className="flex-shrink-0 ">
                      <img
                        src={items.thumbnail}
                        alt={items.title}
                        className="sm:h-38 px-2 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-xl">
                              {items.title}
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-sm text-gray-500">
                              <Rating name="read-only" defaultValue={items.rating} precision={0.5} readOnly />
                            </p>
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-2xl font-medium text-[#0B7A74]">&#8377;
                              {items.price * 10}
                            </p> &nbsp;
                            <p className="text-xs font-medium text-gray-800 line-through">
                              &nbsp;&nbsp; &#8377;{((items.price * 10) + (items.discountPercentage / 100 * items.price * 10)).toFixed(2)}
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm font-medium text-[#0B7A74]">{items.discountPercentage}% off</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <div className="mb-2 flex">
                  <div className="ml-6 flex text-sm">
                    <button type="button" onClick={() => handleRemoveFromWishlist(items.id)} className="flex items-center space-x-1 px-2 py-1 pl-0">
                      <Trash size={18} className="text-red-500" />
                      <span className="text-[15px] font-medium text-red-500">Remove from Wishlist</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </section>
      </div>)
      :
      (<EmptyWishlist />)
  )
}

export default Wishlist
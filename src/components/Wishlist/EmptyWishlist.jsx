import React from 'react'
import { useNavigate } from 'react-router-dom'

function EmptyWishlist() {
    const navigate = useNavigate()
    return (
        <div className='w-full min-h-96 flex flex-col gap-10 justify-center items-center '>
            <img className='w-[400px] h-[400px]' src="https://cdn.dribbble.com/users/1010436/screenshots/13921028/dribble_shot_62_4x.jpg" alt="EmptyWishlistImg" />
            <h3 className='text-5xl font-extrabold text-[#0B7A74] '> Nothing In The Wishlist</h3>
            <button
                onClick={() => { navigate('/') }}
                className='px-3 py-2 my-3 bg-[#0B7A74] text-[#ffff]'>Go To Shopping
            </button>
        </div>
    )
}

export default EmptyWishlist
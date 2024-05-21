import React, { useContext, useEffect } from 'react'
import CountItemCart from '../context/count-item-cart';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/cart-context';


function paymentSuccess() {
    // const { setCountItemCart} = useContext(CountItemCart)
    // const { cart} = useContext(CartContext)
    const navigate = useNavigate()
    // console.log(setCountItemCart , "setCountItemCart")
    // console.log(cart, "cart")



    // useEffect(()=>{
    //     if(setCountItemCart === 0){
    //         setCountItemCart
    //     }
    // }, [setCountItemCart, paymentSuccess, cart])
    return (
        <>
            <div className='w-full h-full flex justify-center items-center flex-col'>
                <img src='https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png' alt='Payment Success' />
                <button
                    onClick={() => { navigate('/') }}
                    className='px-3 py-2 my-3 bg-[#0B7A74] text-[#ffff]'>Go To More Shopping
                </button>
            </div>
        </>
    )
}
export default paymentSuccess;
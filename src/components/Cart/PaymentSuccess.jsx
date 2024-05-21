import React from 'react'
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
    const navigate = useNavigate()
    return (
        <>
            <div className='w-full h-full flex flex-col bg-red-500 '>
                <img src='https://i.gifer.com/XD4x.gif' alt='Payment Successful' />
                <h1 className='text-5xl font-extrabold text-[#0B7A74]'>Payment Successful</h1>
                <button
                    onClick={() => { navigate('/') }}
                    className='px-3 py-2 my-3 bg-[#0B7A74] text-[#ffff]'>Go To Shopping
                </button>
            </div>
        </>
    )
}
export default  PaymentSuccess;

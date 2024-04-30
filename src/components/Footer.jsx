import { ChevronRight } from 'lucide-react'
import React from 'react'
import logo from '../assets/favicon.png'


function Footer() {
  return (
<div>
    <footer className="w-full bg-[#D7E4C0] ">
      <hr className="my-8" />
      <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
        <div className="w-full px-4 md:w-1/2 lg:px-0 flex flex-col ">
            <img
                className='h-24 w-40 mb-5 '
             src={logo} alt='Error404' />
          <h1 className="max-w-sm text-2xl font-bold">GlaMart - The Online Market</h1>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
          {Array.from({ length: 1 }).map((_, i) => (
            <div key={i} className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 ">Company</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                <li>About us</li>
                <li>Company History</li>
                <li>Our Team</li>
                <li>Our Vision</li>
              </ul>
            </div>
          ))}
          <ul className="flex flex-col ml-20  space-y-4 text-[14px] font-medium text-gray-500">
                <li>Terms and Condition</li>
                <li>Refund Policy</li>
                <li>Shipping Policy</li>
                <li>Our Claim</li>
                <li>Help and Support</li>
              </ul>  
        </div>
      </div>
      <div className='copyright text-center pt-1 w-full h-8 text-white bg-[#0B7A74]'>
            Build by Aryan Verma &copy; Copyright 2024. All Right Reserved by GlaMart.
      </div>
    </footer>
</div>
  )
}

export default Footer
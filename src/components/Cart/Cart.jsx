import React, { useContext, useEffect, useState } from 'react'
import cartContext from '../context/cart-context'
import { Trash } from 'lucide-react'
import { Rating } from '@mui/material'
import Modal from './Modal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyCart from './EmptyCart'


function Cart(props) {
  const { cart, removeFromCart, wholeProduct } = useContext(cartContext)
  const [filteredData, setFilteredData] = useState([])
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [discountPrice, setDiscountPrice] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [moreItem, setMoreItem] = useState(1)

  const IncreaseItem =() =>{
    setMoreItem(moreItem + 1)
  }
  const DecreaseItem = () =>{
    if(moreItem > 1)
    setMoreItem(moreItem -1)
  }
  
  
  useEffect(() => {
    filterData();
  }, [])

  const removeFromCartButtonHandler = (id) => {
    removeFromCart(id);
    filterData();
  }

  const filterData = () => {
    const filter = wholeProduct.filter(item => cart.includes(item.id));
    setFilteredData(filter)
  }
  
  


  useEffect(()=>{
    let temp = 0;
    filteredData.forEach((items) =>{
      temp = temp + (items.price)
    }
    // console.log(items, "items data")
    )
    setTotalPrice(temp)
    
  }, [filteredData])  

  useEffect(()=>{
    let discount = 0;
    filteredData.forEach((savemoney)=>{
     discount = discount + ((savemoney.price * 10 * (savemoney.discountPercentage/100)))
    })
    setDiscountPrice(discount)
  }, [filteredData])

  useEffect(()=>{
    let shippingcost = 0;
    if (totalPrice >= 300) {
      shippingcost = shippingcost +  0;
    } else {
      shippingcost = shippingcost + 100;
    }
    setShipping(shippingcost)
  }, [shipping, Cart])

  const overallCost = (totalPrice*10) + shipping

  const buyNow = async () => {
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      // date: new Date().toLocalString(
      //   "en-US",
      //   {
      //     month: "short",
      //     day: "2-digit",
      //     year: "numeric",
      //   }
      // )
    }
    var options = {
      key: "rzp_test_DHRXCwOsSU6EQ7",
      key_secret: "TzoSK7XqA91akBb5D98L6CaA",
      amount: parseInt(overallCost * 100 * moreItem),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "GlaMart",
      description: "for testing purpose",
      image: ".favicon/favicon.png",
      prefill: {
        name: "Aryan Verma",
        email: "aryanji@gmail.com",
        contact: "8756119548",
      },
      handler: function (response) {

        // console.log(response)
        toast.success('Payment Successful')
          // console.log(response, "data in response")
        const paymentId = response.razorpay_payment_id

        // console.log(paymentId, "data in paymentId")

        // store in firebase 
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        try {
          const result = addDoc(collection(fireDB, "orders"), orderInfo)
        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
  }
  return (
     
    filteredData.length !== 0 ?

   ( <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-slate-100 lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {filteredData?.map((product) => (
                <div key={product.id} className="">
                  <li className="flex py-6 sm:py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="sm:h-38 px-2 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-xl">
                              {product.title}
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-sm text-gray-500">
                              <Rating name="read-only" defaultValue={product.rating} precision={0.5} readOnly />
                            </p>
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-2xl font-medium text-[#0B7A74]">&#8377;
                              {(product.price * 10)* moreItem}
                            </p> &nbsp;
                            <p className="text-xs font-medium text-gray-800 line-through">
                              &nbsp;&nbsp; &#8377;{(((product.price * 10) + (product.discountPercentage / 100 * product.price * 10))* moreItem).toFixed(2) }
                            </p>
                            &nbsp;&nbsp;
                            <p className="text-sm font-medium text-[#0B7A74]">{product.discountPercentage}% off</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button onClick={() =>DecreaseItem()} type="button" className="h-7 w-7">
                        -
                      </button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        Value={moreItem}
                        readOnly
                      />
                      {/* {moreItem} */}
                      <button onClick={() =>IncreaseItem()} type="button" className="flex h-7 w-7 items-center justify-center">
                        +
                      </button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button type="button" onClick={() => removeFromCartButtonHandler(product.id)} className="flex items-center space-x-1 px-2 py-1 pl-0">
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Total Price</dt>
                  <dd className="text-sm font-medium text-gray-900">₹ {totalPrice * 10 * moreItem }</dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span> Total Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-[#0B7A74]">- ₹ {(discountPrice * moreItem).toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-[#0B7A74]">{shipping}</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹ {overallCost * moreItem}</dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-[#0B7A74]">
                You will save ₹ {(discountPrice * moreItem).toFixed(2)} on this order
              </div>
            </div>
            <Modal name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow} 
            />
          </section>
        </form>
      </div>
    </div>) :
    

   ( <EmptyCart />)
    
  )
}

export default Cart
import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const categories = [
                {   
                    id: 1,
                    item: "TShirt",
                    imgUrl: "https://images.bewakoof.com/t1080/men-s-purple-beast-within-graphic-printed-oversized-t-shirt-581488-1701342754-1.jpg"       
                },
                {
                    id: 2,
                    item: "Shoes",
                    imgUrl: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/i/b/t/-original-imaggbvzwyhty7zy.jpeg?q=90&crop=false"       
                },
                {
                    id: 3,
                    item: "Watch",
                    imgUrl: "https://www.soosi.co.in/cdn/shop/products/WhatsAppImage2023-03-25at1.32.38AM_1200x1200.jpg?v=1679739030"       
                },
                {
                    id: 4,
                    item: "Bag",
                    imgUrl: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6130a094622557.5e8373506b486.jpg"       
                },
                {
                    id: 5,
                    item: "Sunglass",
                    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvpY0NnTbsyCFly9ILJNDIaH6Ix6ebqHprBg&usqp=CAU",       
                },
                {
                    id: 6,
                    item: "Jewellery",
                    imgUrl: "https://i.pinimg.com/564x/b1/0e/7b/b10e7b5a22e458fd912f1a36de2a5c32.jpg"       
                },
]

function Categories() {
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
     <div  className='flex justify-center w-full bg-[#fff] mt-2  items-center'>
        <div key={categories.id} className=' w-11/12 h-36 flex flex-row justify-between text-[16px] '>
        { categories.map((showitem)=>{
          return(
            <Link to={`./${showitem.item.toLowerCase()}`} className='flex flex-col items-center  '>
                <div className='w-24 h-24 rounded-full overflow-hidden  hover:scale-[1.1] '> 
                    <img className='w-full h-full' src={showitem.imgUrl} alt='Electronics' />
                </div>
                <div  className='mt-2'>{showitem.item}</div>
            </Link>
          )
        }
    )}
        </div>
     </div>
    </>
  )
}

export default Categories
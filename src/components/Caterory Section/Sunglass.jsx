import { Rating } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Sunglass() {
  const [data, setData] = useState();


  const fetchItems = async () =>{
    try{
    const res = await axios.get('https://dummyjson.com/products/category/sunglasses');
    setData(res.data.products);
    }catch{
      console.log("Error");
    }
  }
  useEffect(()=>{
    fetchItems();
  },[])
  return (
    <div className='flex mt-10  flex-row flex-wrap gap-5 mx-5'>
      {data?.map((items) => (
        <Link to={`/singlepage/${items.id}`} key={items.id} 
          onClick={()=>navigate(`/singlepage/${props.id}`)} >
          <div className='card w-56 h-80 cursor-pointer hover:scale-[1.1]'>
            <div className='object-contain '>
              <img className='h-52 w-56' src={items.thumbnail} alt='Error' />
            </div>
            <div className='pt-1 h-24 flex justify-center flex-col'>
              <div className='title text-center pl-1 text-[18px] '>{items.title}</div>
              <p className='rate text-center text-[16px] text-[#0B7A74]'>
                <span className='text-[16px] font-semibold'>Price:</span> &#8377;{items.price * 10}
              </p>
              <div className='text-center'>
                <Rating name="read-only" defaultValue={items.rating} precision={0.5} readOnly />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Sunglass
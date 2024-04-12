import React, { useContext, useEffect, useState } from 'react'
import SellIcon from '@mui/icons-material/Sell';
import { Rating } from '@mui/material'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Button from '../Button/Button'
import { Skeleton, Stack } from '@mui/material';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import wishContext from '../context/wish-context';

function Singlepage() {
    const { wishlist, addToWishlist,removeFromWishlist } = useContext(wishContext)
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [productDetail, setProductDetail] = useState()
    const [productImg, setProductImg] = useState()
    const { id } = useParams();


  const handleAddToWishlistInSinglePage =() =>{
    if(isInWishlist){
      removeFromWishlist(productDetail.id);
      setIsInWishlist(false);
    }
    else{
      addToWishlist(productDetail.id);
      setIsInWishlist(true);
    }
  }

    const getProductDetails = async (id) => {
        let res = await axios.get(`https://dummyjson.com/products/${id}`)
        setProductDetail(res.data);
        setIsInWishlist(wishlist.includes(res.data.id)?true:false)
        setProductImg(res.data.images[0])
    }

    useEffect(() => {
        getProductDetails(id)
    }, [])

    return (
        productDetail ?
            (<div className=' flex w-100%  my-3' key={productDetail?.id}>
                <div className=' flex justify-center w-1/2 '>
                    <div className='small w-20 h-20 mx-3  flex flex-col justify-between '>
                        {
                            productDetail?.images.map((img) => (
                                <img className='rounded-md object-cover my-1 hover:border-black border-2 scale-[1.02] cursor-pointer' src={img} alt='Error404' onMouseOver={() => setProductImg(img)} />
                            ))
                        }
                    </div>

                    <div className='large relative  '>
                        <img className='object-contain cursor-pointer rounded-md  h-[400px] w-[500px] ' src={productImg} alt='error' />
                    </div>
                    <Link to='#' onClick={() => handleAddToWishlistInSinglePage()} className='absolute cursor-pointer left-[700px] text-3xl text-[#0B7A74]'>
                        {isInWishlist ?
                            <IoIosHeart className='text-red-500' /> :
                            <IoIosHeartEmpty />
                        }
                    </Link>
                </div>
                <div className='w-1/2 '>
                    {
                        productDetail &&
                        <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                            <h2 className="text-sm font-semibold tracking-widest text-gray-500">{productDetail.brand}</h2>
                            <h1 className="my-3 text-2xl font-semibold text-black">{productDetail.title}</h1>
                            <div className="mb-2 mt-6 flex items-center border-b-2 ">
                                <span className="title-font text-xl font-bold text-[#0B7A74] mr-3"> &#8377;{productDetail.price * 10}</span>
                                <span className="title-font text-[15px] font-bold text-gray-900 mr-3"><del>&#8377;{((productDetail.price * 10) + (productDetail.discountPercentage / 100 * productDetail.price * 10)).toFixed(2)}</del></span>
                                <span className="title-font text-[16px] font-bold text-[#0B7A74]">{productDetail.discountPercentage}% off</span>
                            </div>
                            <Rating name="read-only" defaultValue={productDetail.rating} precision={0.5} readOnly />
                        </div>

                    }
                    <div className="offers pl-10 mt-4 text-justify mr-4">
                        <h3 className='my-3 text-[18px] font-semibold' >Available Offers:</h3>
                        <div className="bank-offer">
                            <div className='offer-sell'><SellIcon className='sell-icon text-[#0B7A74]' /><b>Partner Offer : </b>Purchase now & get a surprise cashback coupon in 2024.</div>
                            <div className='offer-sell'><SellIcon className='sell-icon text-[#0B7A74]' /><b>Partner Offer : </b>Sign up for GlaMart and get GlaMart Gift Card worth up to ₹500*</div>
                            <div className='offer-sell'><SellIcon className='sell-icon text-[#0B7A74]' /><b>Bank Offer : </b>Flat ₹100 Instant Cashback on Paytm Wallet. Min Order ₹1000. Valid once per User</div>
                            <div className='offer-sell'><SellIcon className='sell-icon text-[#0B7A74]' /><b>Bank Offer : </b>5% Cashback on Axis Bank Card</div>
                        </div>
                    </div>
                    <div className='ml-10 mt-5 w-1/2  flex justify-between'>
                        <Button id={productDetail?.id} />
                    </div>
                </div>
            </div>)

            :

            (<div className='loader-single '>
                {/* Loading.... */}
                <Stack spacing={1}>
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                    {/* For other variants, adjust the size with `width` and `height` */}
                    <div className="loading-single flex justify-center">
                        <Skeleton variant="circular" width={400} height={400} />
                        <div className="load-single">
                            <Skeleton variant="rectangular" width={410} height={200} />
                            <Skeleton variant="rounded" width={400} height={200} />
                        </div>
                    </div>
                </Stack>
            </div>)








    )
}

export default Singlepage










// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Skeleton from '@mui/material/Skeleton';

// const data = [
//     {
//         src: 'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
//         title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
//         channel: 'Don Diablo',
//         views: '396k views',
//         createdAt: 'a week ago',
//     },
//     {
//         src: 'https://i.ytimg.com/vi/_Uu12zY01ts/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLCpX6Jan2rxrCAZxJYDXppTP4MoQA',
//         title: 'Queen - Greatest Hits',
//         channel: 'Queen Official',
//         views: '40M views',
//         createdAt: '3 years ago',
//     },
//     {
//         src: 'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
//         title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
//         channel: 'Calvin Harris',
//         views: '130M views',
//         createdAt: '10 months ago',
//     },
// ];

// function Media(props) {
//     const { loading = false } = props;

//     return (
//         <Grid container wrap="nowrap">
//             {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
//                 <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
//                     {item ? (
//                         <img
//                             style={{ width: 210, height: 118 }}
//                             alt={item.title}
//                             src={item.src}
//                         />
//                     ) : (
//                         <Skeleton variant="rectangular" width={210} height={118} />
//                     )}

//                     {item ? (
//                         <Box sx={{ pr: 2 }}>
//                             <Typography gutterBottom variant="body2">
//                                 {item.title}
//                             </Typography>
//                             <Typography display="block" variant="caption" color="text.secondary">
//                                 {item.channel}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                                 {`${item.views} • ${item.createdAt}`}
//                             </Typography>
//                         </Box>
//                     ) : (
//                         <Box sx={{ pt: 0.5 }}>
//                             <Skeleton />
//                             <Skeleton width="60%" />
//                         </Box>
//                     )}
//                 </Box>
//             ))}
//         </Grid>
//     );
// }

// Media.propTypes = {
//     loading: PropTypes.bool,
// };

// export default function YouTube() {
//     return (
//         <Box sx={{ overflow: 'hidden' }}>
//             <Media loading />
//             <Media />
//         </Box>
//     );
// }
import React, {useState,useContext } from 'react';
import cartContext from '../context/cart-context';
import CountItemCart from '../context/count-item-cart'
import { Link, useNavigate } from 'react-router-dom';

function Button(props) {
  const  productId= props.id;
  const {countItemCart, setCountItemCart} = useContext(CountItemCart)
  const {cart,addToCart} = useContext(cartContext);
  const [addToCartText, setAddToCartText] = useState(()=>{
    return cart.includes(productId)?"Go to Cart":"Add to Cart"
  });
  

  const navigate = useNavigate()

  const handleAddToCartClick = () => {
    
    if (addToCartText === "Add to Cart"){
      setAddToCartText("Go to Cart");
      addToCart(productId);
      setCountItemCart(countItemCart + 1)
    }else{
       navigate("/cart")
    }
  };

  const handleBuyNowClick = () => {
    addToCart(productId)
    navigate("/cart")
  };

  return (
    <>
      <button
        onClick={() => {handleAddToCartClick()}}
        className={`inline-block px-4 py-2 mr-5 text-[16px] font-semibold cursor-pointer text-[#fff] hover:scale-[1.02]  ${addToCartText === "Go to Cart" ? "bg-[#e8db28]" : "bg-[#0B7A74]"
          }`}
      >
        {addToCartText}
      </button>
      <Link
        to='#'
        onClick={handleBuyNowClick}
        className={`inline-block px-4 py-2 text-[16px] font-semibold cursor-pointer text-[#fff] hover:scale-[1.02] bg-[#e84528] `}
      >
        Buy Now
      </Link>
    </>
  );
}

export default Button;

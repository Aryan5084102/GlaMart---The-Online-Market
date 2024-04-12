import React from 'react'
import Categories from '../components/Categories'
import  CarouselItem  from '../components/CarouselItem'
import MensItems from '../components/MensItems'

function HomePage() {
  return (
    <div>
            <Categories />
            <CarouselItem />
            <MensItems />
    </div>
  )
}

export default HomePage
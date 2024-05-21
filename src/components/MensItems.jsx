import React, { useContext } from 'react'
import searchContext from './context/search-context';
import Card from './Card/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

function MensItems() {
  const { filteredData } = useContext(searchContext);


  return (
    <>
      <ToastContainer limit={3}
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />

      <div className='w-full'>
        <div className='w-100%  justify-center card-container mt-10 flex flex-row flex-wrap gap-5  '>
          {
            filteredData?.map((cardItem) => (
              <div key={cardItem.id} className='flex items-center  '>
                <Card product={cardItem} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )

}

export default MensItems






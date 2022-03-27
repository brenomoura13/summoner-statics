import Image from 'next/image'
import React from 'react'

const Jinx: React.FC = () => {
  return (
    <figure className='jinx'>
      <div className="jinx__container">
        <Image 
        src='/assets/imagens/jinx.webp' 
        alt='jinx'
        width={'800px'}
        height={'767px'}
        />
      </div>
    </figure>
    )
  }
  
  export default Jinx
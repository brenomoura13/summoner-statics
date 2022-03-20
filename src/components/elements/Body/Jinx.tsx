import Image from 'next/image'
import React from 'react'

const Jinx: React.FC = () => {
  return (
    <figure className='jinx'>
      <div className="jinx__container">
        <Image 
        src='/assets/imagens/jinx.png' 
        alt='jinx'
        width={'1024px'}
        height={'1308px'}
        />
      </div>
    </figure>
    )
  }
  
  export default Jinx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className='cabecalho'>
    <Image src="/assets/imagens/logo.png" alt="Logo do site"  width={'128px'} height={'128px'} className="cabecalho__logo"/>
    <nav className='cabecalho__nav'>
      <ul className='cabecalho__lista'>
        <li className='cabecalho__lista--linha'>
          <Link href="/" passHref> 
            <a className='cabecalho__lista--link'>home</a> 
          </Link>
        </li>
        <li className='cabecalho__lista--linha'>
          <Link href="/sobre" passHref> 
            <a className='cabecalho__lista--link'>sobre</a> 
          </Link>
        </li>
      </ul>
    </nav>
  </header>
  )
}

export default Header
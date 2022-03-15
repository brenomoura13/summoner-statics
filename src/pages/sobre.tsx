import { NextSeo } from 'next-seo'
import React from 'react'
import Footer from '../components/elements/Footer/Footer'
import Header from '../components/elements/Header/Header'

const Sobre: React.FC = () => {
  return (
    <div>
      <NextSeo 
      title='Sobre | Summoner Statics' 
      description='Then with a short description here.'
      />
      <Header />
      <main>
        <h1>Sobre</h1>
      </main>
      <Footer />
    </div>
  )
}

export default Sobre
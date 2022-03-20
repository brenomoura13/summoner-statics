import { NextSeo } from 'next-seo'
import React from 'react'
import Footer from '../components/elements/Footer/Footer'
import Header from '../components/elements/Header/Header'

const Sobre: React.FC = () => {
  return (
    <section className='summoner_statics'>
      <NextSeo 
      title='Sobre | Summoner Statics' 
      description='Sobre a Summoner Statics'
      />
      <Header />
      <section className="about">
        <h1 className="about__title">summoner statics</h1>
        <p className="about__text">criado com <b className='negrito'>♥</b> para todos</p>
      </section>
      <Footer />
    </section>
  )
}

export default Sobre
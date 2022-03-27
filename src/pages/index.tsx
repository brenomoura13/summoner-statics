import { NextSeo } from 'next-seo'
import React from 'react'
import Jinx from '../components/elements/Body/Jinx'
import Search from '../components/elements/Body/Search'
import Footer from '../components/elements/Footer/Footer'
import Header from '../components/elements/Header/Header'

const Home: React.FC = () => {
  return (
    <section className='summoner__statics'>
      <NextSeo 
      title='Home | Summoner Statics' 
      description='Home page da Summoner Statics.'
      />
      <Header />
      <Search />
      <Jinx />
      <Footer />
    </section>
  )
}

export default Home
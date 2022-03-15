import { NextSeo } from 'next-seo'
import React from 'react'
import Search from '../components/elements/Body/Search'
import Footer from '../components/elements/Footer/Footer'
import Header from '../components/elements/Header/Header'

const Home: React.FC = () => {
  return (
    <div>
      <NextSeo 
      title='Home | Summoner Statics' 
      description='Then with a short description here.'
      />
      <Header />
      <Search />
      <Footer />
    </div>
  )
}

export default Home
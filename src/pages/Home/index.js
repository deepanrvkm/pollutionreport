import React from 'react'
import './style.scss'
import { Header, PollutionChart, Footer } from '../../components';

const Home = () => {  
  return (
    <>
        <Header/>
        <PollutionChart/>
        <Footer/>
     </>
  )
}

export default Home
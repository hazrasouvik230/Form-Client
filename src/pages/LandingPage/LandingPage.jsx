import React from 'react'
import Footer from '../LandingPage/Footer/Footer'
import LandingNavbar from '../LandingPage/LandingNavbar/LandingNavbar'
import LandingContainer from '../LandingPage/LandingContainer/LandingContainer'

const LandingPage = () => {
  return (
    <div style={{background: "black"}}>
        <LandingNavbar />
        <LandingContainer />
        <Footer />
    </div>
  )
}

export default LandingPage
import React from 'react'
import styles from  './LandingNavbar.module.css'
import { useNavigate } from 'react-router-dom'

const LandingNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.landingNavbar}>
        <div className={styles.logo}>
            <img src="./SVG.png" alt="" />
            <p>FormBot</p>
        </div>

        <div className={styles.buttons}>
            <button className={styles.signinBtn} onClick={() => navigate('/signup')}>Sign in</button>
            <button className={styles.createBtn} onClick={() => navigate('/signup')}>Create a FormBot</button>
        </div>
    </div>
  )
}

export default LandingNavbar
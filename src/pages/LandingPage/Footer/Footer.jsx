import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div>
          <div style={{display: 'flex', alignItems: 'center', gap: '.3rem'}}>
            <img src="./SVG.png" alt="" /> <span style={{fontSize: '1.5rem', fontWeight: '600'}}>FormBot</span>
          </div>
          <p>Made with ❤️ by</p>
          <p>@SOUVIK HAZRA</p>
        </div>
        
        <div className={styles.links}>
            <p className={styles.header}>Product</p>
            <p>Status <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
            <p>Documentation <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
            <p>Roadmap <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
            <p>Pricing <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
        </div>
        
        <div className={styles.links}>
          <p className={styles.header}>Community</p>
          <p>Discord <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
          <p>Github repository <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
          <p>Twitter <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
          <p>LinkedIn <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
          <p>OSS Friends <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
        </div>
        
        <div className={styles.company}>
          <p className={styles.header}>Comapny</p>
          <p>About</p>
          <p>Contact</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
        </div>
    </div>
  )
}

export default Footer
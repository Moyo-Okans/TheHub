import React from 'react'

const footer = () => {
  return (
    <div className='footerContainer'>
      <div className='footerLogoContainer'>
         <img className='footerLogo' src="/src/assets/logo.png" alt="logo" />
        <p>The Hub</p>
      </div>
        <div className='footerText'>
            <p>© 2025 TheHub.</p>
            <p>Community guidelines.Term of service</p>
            <p>Made with love by Moyosore</p>
        </div>
    </div>
  )
}

export default footer
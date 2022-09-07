import React from 'react'
import DigitalSquare from '../images/DigitalSquareLogo.png'
import IntelliSoftLogo from '../images/IntelliSoftLogo.png'
const LoginFooter = () => {
  return (
    <div className="LoginFooter">
        <section className="FooterLogo">
            
            <img src={IntelliSoftLogo} alt="Intellisoft Logo" className="Logo1"/>

            <img src={DigitalSquare} alt="DigitalSquare Logo" className="Logo2"/>
        </section>
        <p className="FooterText">Re-designed by IntelliSOFT Consulting Ltd via Digital Square Funding</p>
    </div>
  )
}

export default LoginFooter




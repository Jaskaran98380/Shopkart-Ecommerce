import React from 'react'
import playstore from "../../../images/ps.png"
import "./footer.css"

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h1>Download our App</h1>
            <img src={playstore} alt="playstore" />
        </div>
        <div className="rightFooter">
            <h1>ShopKart</h1>
            <p className="slogan">Find what you love, love what you find!❤️</p>
            <p className="copyRight">Copyrights 2024 &copy; Jaskaran Singh</p>
        </div>
    </footer>
  )
}

export default Footer
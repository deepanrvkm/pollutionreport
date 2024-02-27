import React from 'react'
import './style.scss'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt=""/>
                <h1>Airquality</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
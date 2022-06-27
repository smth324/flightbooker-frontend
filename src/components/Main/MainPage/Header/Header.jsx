import React, { useState } from 'react'
import { ArrowDropDown, Link } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import logo from '../../../../images/logo.png'
import ExplorerPopup from './ExplorePopup'
import TravelerPopup from './TravelerPopup'
import './Header.css'

const Header = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = (action) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(action)
  }
  return (
    <header className="header-navbar">
      <div className="header-logo" style={{ backgroundImage: `url(${logo})` }} />
      <div className="header-group-options">
        <a className="header-option" href="https://www.philippineairlines.com/en/promotions" target="_blank" rel="noreferrer">Promo Fares</a>
        <div className="header-option header-drop explore" href="#">
          Explore
          <ArrowDropDown className="header-dropSvg" />
          <ExplorerPopup />
        </div>
        <div className="header-option header-drop travelInfo" href="#">
          Travel Information
          <ArrowDropDown className="header-dropSvg" />
          <TravelerPopup />
        </div>
        <a className="header-option header-drop mabuhay" href="https://www.mabuhaymiles.com/en/home" target="_blank" rel="noreferrer">
          Mabuhay Miles
          <Link href="https://www.mabuhaymiles.com/en/home" className="header-dropSvg mabuhay" />
        </a>
        <a className="header-option" href="https://www.philippineairlines.com/en/aboutus/contactus" target="_blank" rel="noreferrer">Contact Us</a>
        <button type="button" className="header-option-hamburger" aria-label="menu" onClick={toggleOpen(true)}><MenuIcon /></button>
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleOpen(false)}
        >
          <div className="header-drawer">
            <div className="header-drawer-option"><a href="https://www.philippineairlines.com/en/promotions">Promo Fares</a></div>
            <div className="header-drawer-option"><a href="https://www.philippineairlines.com/en/featureddestinations">Explore</a></div>
            <div className="header-drawer-option"><a href="https://mabuhay.philippineairlines.com/city/cebu/">Travel Information</a></div>
            <div className="header-drawer-option"><a href="https://www.mabuhaymiles.com/en/home">Mabuhay Miles</a></div>
            <div className="header-drawer-option"><a href="https://www.philippineairlines.com/en/aboutus/contactus">Contact us</a></div>
          </div>
        </Drawer>
      </div>
    </header>
  )
}

export default Header

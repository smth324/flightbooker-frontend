import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import img from '../../../../images/header-logo.png'
import './Header.css'

const SelectionHeader = () => (
  <header className="selection-header">
    <div className="selection-header-inner">
      <div className="selection-header-logo-container">
        <Link to="/">
          <img className="selection-header-logo" src={img} alt="pal logo" />
        </Link>
      </div>
      <div className="selection-header-search-container">
        <SearchIcon className="seleciton-header-search-icon" />
        Modify Search
      </div>
    </div>
  </header>
)

export default SelectionHeader

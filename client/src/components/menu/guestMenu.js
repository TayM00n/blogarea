import React from 'react'
import Menu from "./menu";
import {Link} from "react-router-dom";
import {Icons} from "../Icons"
import {connect} from "react-redux";

const TempGuestMenu = ({currentPage, menuState}) => {

  return menuState === "show" ? (
    <Menu>
      <div className='menu-link d-flex flex-column '>
        <div className='menu-item mx-auto'>
          <Link to="/" className={`nav-link ${currentPage === "" ? 'active-menu' : ""}`}><Icons.IconHome width={50}
                                                                                                         height={50}/>Home</Link>
        </div>
        <div className='menu-item mx-auto'>
          <Link to="/authors"
                className={`nav-link ${currentPage === "authors" ? 'active-menu' : ""}`}><Icons.IconAuthors
            width={50} height={50}/>Authors</Link>
        </div>
      </div>

      <div className='menu-additions d-flex flex-column'>
        <div className='menu-item mx-auto'>
          <Link to="/login"
                className={`nav-link ${currentPage === "login" ? 'active-menu' : ""}`}><Icons.IconLogIn/> Log
            in</Link>
        </div>
        <div className='menu-item mx-auto'>
          <Link to="/signup"
                className={`nav-link ${currentPage === "signup" ? 'active-menu' : ""}`}><Icons.IconSignUp/> Sign
            up</Link>
        </div>
      </div>
    </Menu>) : (
    <Menu>
      <div className='menu-items'>
        <div className='logo'>
          <img src="/short-logo.png" alt="short-logo"/>
        </div>
        <Link to="/">
          <div className={`home ${currentPage === "" ? 'short-active-menu' : "bg-secondary"}`}>
            <Icons.IconHome width={50} height={50}/>
          </div>
        </Link>
        <Link to="/authors">
          <div className={`authors ${currentPage === "authors" ? 'short-active-menu' : "bg-secondary"}`}>
            <Icons.IconAuthors width={50} height={50}/>
          </div>
        </Link>
        <Link to="/login">
          <div className={`login ${currentPage === "login" ? 'short-active-menu' : "bg-secondary"}`}>
            <Icons.IconLogIn/>
          </div>
        </Link>
        <Link to="/signup">
          <div className={`signup ${currentPage === "signup" ? 'short-active-menu' : "bg-secondary"}`}>
            <Icons.IconSignUp/>
          </div>
        </Link>
      </div>
    </Menu>)
}


const GuestMenu = connect((state) => ({
  currentPage: state.globalReducer.currentPage,
  menuState: state.globalReducer.menuState
}))(TempGuestMenu)


export default GuestMenu
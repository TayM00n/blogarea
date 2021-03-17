import React, {useEffect} from 'react'
import Menu from "./menu";
import {Link} from "react-router-dom";
import {getItemFromLocalStore, setItemToLocalStore, setValueToStore} from "../../index";
import {Icons} from  "../Icons"

const GuestMenu = ({currentPage, menuState}) => {
  useEffect(() => {
    menuState !== getItemFromLocalStore("stateMenu") && setValueToStore({
      type: "SET_MENU_STATE_REQUEST",
      menuState: getItemFromLocalStore("stateMenu")
    })
  }, [menuState])


  const handleStateMenu = (show) => {
    setItemToLocalStore("stateMenu", show)
    setValueToStore({type: "SET_MENU_STATE_REQUEST", menuState: show})
  }

  return menuState === "show" ? (
    <Menu
      menuState={menuState}
      handleStateMenu={handleStateMenu}>
      <div className='menu-link d-flex flex-column '>
        <div className='menu-item mx-auto'>
          <Link to="/" className={`nav-link ${currentPage === "" ? 'active-menu' : ""}`}><Icons.IconHome width={50}
                                                                                                   height={50}/>Home</Link>
        </div>
        <div className='menu-item mx-auto'>
          <Link to="/authors" className={`nav-link ${currentPage === "authors" ? 'active-menu' : ""}`}><Icons.IconAuthors
            width={50} height={50}/>Authors</Link>
        </div>
      </div>

      <div className='menu-additions d-flex flex-column'>
        <div className='menu-item mx-auto'>
          <Link to="/login" className={`nav-link ${currentPage === "login" ? 'active-menu' : ""}`}><Icons.IconLogIn/> Log
            in</Link>
        </div>
        <div className='menu-item mx-auto'>
          <Link to="/signup" className={`nav-link ${currentPage === "signup" ? 'active-menu' : ""}`}><Icons.IconSignUp/> Sign
            up</Link>
        </div>
      </div>
    </Menu>) : (
    <Menu
      menuState={menuState}
      handleStateMenu={handleStateMenu}>
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

export default GuestMenu
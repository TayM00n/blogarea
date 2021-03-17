import React, {useEffect} from "react";
import {getItemFromLocalStore, setItemToLocalStore, setValueToStore} from "../../index";
import Menu from "./menu";
import {Link} from "react-router-dom";
import {Icons} from "../Icons";

const AuthMenu = ({currentPage, menuState}) => {

  useEffect(() => {
    menuState !== getItemFromLocalStore("stateMenu") && setValueToStore({
      type: "SET_MENU_STATE_REQUEST",
      menuState: getItemFromLocalStore("stateMenu")
    })
  }, [menuState])


  const handleSignOut = () => {
    setItemToLocalStore("user_jwt", "")
    setValueToStore({type: "SET_JWT_REQUEST", userId: getItemFromLocalStore("user_jwt")})
    setValueToStore({type: "SET_IS_LOGIN_REQUEST", isLogin: false})
  }

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
          <Link to="/createpost"
                className={`nav-link ${currentPage === "createpost" ? 'active-menu' : ""}`}><Icons.IconCreatePost
            width={50}
            height={50}/>Create
            Post</Link>
        </div>
      </div>

      <div className='menu-additions d-flex flex-column'>
        <div className='menu-item mx-auto'>
          <Link to="/profile"
                className={`nav-link ${currentPage === "profile" ? 'active-menu' : ""}`}><Icons.IconProfile/>Profile</Link>
        </div>
        <div className='menu-item mx-auto'>
          <Link to="/settings"
                className={`nav-link mx-auto ${currentPage === "settings" ? 'active-menu' : ""}`}><Icons.IconSettings/>Settings</Link>
        </div>
        <div className='menu-item mx-auto'>
          <Link to="/" className='btn' onClick={handleSignOut}><Icons.IconLogOut/>Sign out</Link>
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
        <Link to="/createpost">
          <div className={`createpost ${currentPage === "createpost" ? 'short-active-menu' : "bg-secondary"}`}>
            <Icons.IconCreatePost width={50} height={50}/>
          </div>
        </Link>
        <Link to="/profile">
          <div className={`user ${currentPage === "profile" ? 'short-active-menu' : "bg-secondary"}`}>
            <Icons.IconProfile className='mx-2'/>
          </div>
        </Link>
        <Link to="/settings">
          <div className={`settings ${currentPage === "settings" ? 'short-active-menu' : "bg-secondary"}`}>
            <Icons.IconSettings className='mx-2'/>
          </div>
        </Link>
        <Link to="/">
          <div className={`logout bg-secondary`} onClick={handleSignOut}><Icons.IconLogOut className='mx-2'/></div>
        </Link>
      </div>
    </Menu>)

}

export default AuthMenu
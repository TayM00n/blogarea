import React, {useState} from "react";

const Menu = ({children, menuState, handleStateMenu})=>{
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  window.onresize=()=>{
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  const FullMenu = ({height, children})=>{
    return(
      <div className={`nav full-menu d-flex flex-column h-100 bg-menu fixed-top pb-2`}>
        <div className={`d-flex flex-column justify-content-between ${height > 520 ? "h-100" : "h-75"}`}>
          <div className='logo'>
            <img src='/logo-menu-min.png' alt="logo" className='w-100 h-100'/>
          </div>
          <div className='menu d-flex flex-column justify-content-between h-50 '>
            {children}
          </div>
        </div>
        <div className='full-menu-state hide-menu bg-light circle' onClick={()=>handleStateMenu("hidden")}>
          <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 19L1.5 11L12.5 1" stroke="black"/>
          </svg>
        </div>
      </div>
    )
  }

  const ShortMenu = ({width, children}) => {
    return (
      <div className={`nav short-menu ${width >= 600 ? "fixed-top": "fixed-bottom"}`}>
        {children}
        <div className='hidden-full-menu-state show-menu bg-light circle' onClick={()=>handleStateMenu("show")}>
          <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 19L12 11L1 1" stroke="black"/>
          </svg>
        </div>
      </div>
    )
  }

  return menuState==="show" ? <FullMenu height={height}>{children}</FullMenu> : <ShortMenu width={width}>{children}</ShortMenu>
}

export default Menu
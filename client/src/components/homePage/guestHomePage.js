import React, {useState} from "react";
import {Icons} from "../Icons";

const GuestHomePage = () => {

  const [active, setActive] = useState(1)

  const handleSlideChange = (id) => {
    setActive(id)
  }

  const images = ["/slide1.png", "/slide2.png", "/slide3.png"]

  return (
    <div className="hv-100 d-flex flex-column justify-content-center">
      <div className="customCarousel d-flex mx-auto">
        <div className='car-item'>
          <img className='rounded-20' src={images[active - 1]} alt={images[active - 1].split("/")[images.length - 1]}/>
        </div>
        <div className='car-manage d-flex flex-column justify-content-between ml-2'>
          {active - 1 !== 0 ?
            <div className='back rounded-circle'
                 onClick={() => handleSlideChange(active - 1 === 0 ? images.length : active - 1)}><Icons.IconBack/></div> :
            <div className='rounded-circle'><Icons.IconBack/></div>}
          <div className='car-pagination mx-auto d-flex flex-column justify-content-between '>
            <div className={`${active === 1 ? "active" : ""}`} onClick={() => handleSlideChange(1)}></div>
            <div className={`${active === 2 ? "active" : ""}`} onClick={() => handleSlideChange(2)}></div>
            <div className={`${active === 3 ? "active" : ""}`} onClick={() => handleSlideChange(3)}></div>
          </div>
          {active + 1 <= images.length ?
            <div className='next rounded-circle'
                 onClick={() => handleSlideChange(active + 1 > images.length ? 1 : active + 1)}><Icons.IconNext/></div> :
            <div className='rounded-circle'><Icons.IconNext/></div>}
        </div>
      </div>
    </div>
  )
}

export default GuestHomePage
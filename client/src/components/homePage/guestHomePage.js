import React, {useState} from "react";

const GuestHomePage = () => {

  const [active, setActive] = useState(1)

  const handleSlideChange = (id) => {
    setActive(id)
  }

  const IconBack = ({width = 25, height = 25}) => {
    return <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z"
        fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  }

  const IconNext = ({width = 25, height = 25}) => {
    return <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
        fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  }

  const images = ["https://placeimg.com/180/100/any", "https://placeimg.com/180/100/people", "https://placeimg.com/180/100/animal"]

  return (
    <div className="hv-100 d-flex flex-column justify-content-center">
      <div className="customCarousel d-flex mx-auto">
        <div className='car-item'>
          <img className='rounded-20' src={images[active - 1]} alt={images[active - 1].split("/")[images.length - 1]}/>
        </div>
        <div className='car-manage d-flex flex-column justify-content-between ml-2'>
          {active - 1 !== 0 ?
            <div className='back rounded-circle'
                 onClick={() => handleSlideChange(active - 1 === 0 ? images.length : active - 1)}><IconBack/></div> :
            <div className='rounded-circle'><IconBack/></div>}
          <div className='car-pagination mx-auto d-flex flex-column justify-content-between'>
            <div className={`${active === 1 ? "active" : ""}`} onClick={() => handleSlideChange(1)}></div>
            <div className={`${active === 2 ? "active" : ""}`} onClick={() => handleSlideChange(2)}></div>
            <div className={`${active === 3 ? "active" : ""}`} onClick={() => handleSlideChange(3)}></div>
          </div>
          {active + 1 <= images.length ?
            <div className='next rounded-circle'
                 onClick={() => handleSlideChange(active + 1 > images.length ? 1 : active + 1)}><IconNext/></div> :
            <div className='rounded-circle'><IconNext/></div>}
        </div>
      </div>
    </div>
  )
}

export default GuestHomePage
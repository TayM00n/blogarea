import React from "react"
import {Icons} from "../../Icons";

export const Post = ({post, isLogin}) => {
  const Title = ({title}) => {
    return (
      <div className='d-flex justify-content-center'>
        <h1>{title}</h1>
      </div>
    )
  }
  const PhotoPreview = ({src}) => {
    return (
      <div className='col-md-3'>
        <img src={"https://placem.at/things?w=250&h=250&random=" + src} alt="1" style={{width: "100%"}}/>
      </div>
    )
  }

  const Description = ({description}) => {
    return (
      <div className='col-md'>
        <p>{description}</p>
      </div>
    )
  }

  const Footer = ({date, rating, saved, views}) => {

    const DateCreate = ({date}) => {
      return (
        <pre className="text-muted my-auto">{date}</pre>
      )
    }

    const Rating = ({rating}) => {
      const IconChangeRating = () => {
        return <div className='postRatingIcons-container d-flex flex-row my-auto'>
          <Icons.IconPostRatingUp/><Icons.IconPostRatingDown/></div>
      }
      return (
        <div className="rating mx-2 d-flex flex-row my-auto">
          {isLogin ? (<IconChangeRating/>) : ""}
          <div className='my-auto'>
            <Icons.IconRating
              color={rating > 0 ? "green" : rating === 0 ? "currentColor" : "red"}/>{rating}
          </div>
        </div>
      )
    }

    const Saved = ({saved}) => {
      return (
        <div className="saved mx-2 my-auto">
          <Icons.IconSaved/>{" " + saved}
        </div>
      )
    }

    const Views = ({views}) => {
      return (
        <div className="views mx-2 my-auto">
          <Icons.IconEya/>{" " + views}
        </div>
      )
    }
    return (
      <div className='d-flex flex-row justify-content-between px-3'>
        <DateCreate date={date}/>
        <div className="d-flex flex-row justify-content-around">
          <Rating rating={rating}/>
          <Saved saved={saved}/>
          <Views views={views}/>
        </div>
      </div>
    )
  }

  return (
    <div className='details-post my-auto'>
      <div className='d-flex flex-column bg-light rounded-20 p-5'>
        <div className="">
          <Title title={post.title}/>
          <div className='row d-flex flex-row flex-wrap'>
            <PhotoPreview src={post.img}/>
            <Description description={post.description}/>
          </div>
        </div>
      </div>
      <Footer date={post.date} rating={post.rating} saved={post.saved} views={post.views}/>
    </div>
  )
}
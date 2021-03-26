import React from "react"
import {connect} from "react-redux";

const TempDetailsAboutPost = ({post}) => {
  return (
    <div className="fullPage">
      <h1>Post Details</h1>
      <img src={"https://placem.at/things?w=250&h=250&random="+post.img} alt="1"/>
      <p>id -- {post.id}</p>
      <p>Author -- {post.author}</p>
      <p>Title -- {post.title}</p>
      <p>Description -- {post.description}</p>
      <p>Rating -- {post.rating}</p>
      <p>Views -- {post.views}</p>
      <p>Saved -- {post.saved}</p>
      <p>Date -- {post.date}</p>
    </div>
  )
}

const DetailsAboutPost = connect()(TempDetailsAboutPost)

export default DetailsAboutPost;
import React from "react"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Post} from "./post";
import {Comments} from "./comments";

import comments from "../../../tempData/comments.json"

const TempDetailsAboutPost = ({post, user, users, isLogin, width}) => {
  const getFullName = (fName, lName)=>{
    return fName + " " + lName
  }

  const Breadcrumb=({authorId, fName, lName})=>{
    return(
      <div className="px-3">
        <Link to="../" className="text-muted">Home</Link>>
        <Link to={"../profile/" + authorId}
              className="text-muted">{getFullName(fName, lName)}</Link>
      </div>
    )
  }

  return (
    <div className={`fullPage container d-flex flex-column justify-content-center my-5`}>
      <Breadcrumb authorId={post.author} fName={user.firstName} lName={user.lastName}/>
      <Post post={post} isLogin={isLogin}/>
      <Comments
        isLogin={isLogin}
        postId={post.id}
        comments={comments}
        users={users}
        width={width}
      />
    </div>
  )
}

const DetailsAboutPost = connect((state) => ({
  isLogin: state.globalReducer.isLogin,
  width: state.globalReducer.windowSize.width
}))(TempDetailsAboutPost)

export default DetailsAboutPost;
import React from "react"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Icons} from "../../Icons";

import comments from "../../../tempData/comments.json"

const TempDetailsAboutPost = ({post, user, users, isLogin, width}) => {
  //console.log(user)

  const Post = ({post}) => {
    return (
      <div className='details-post my-auto'>
        <div className='d-flex flex-column bg-light rounded-20 p-5'>
          <div className="">
            <div className='d-flex justify-content-center'>
              <h1>{post.title}</h1>
            </div>
            <div className='row d-flex flex-row flex-wrap'>
              <div className='col-md-3'>
                <img src={"https://placem.at/things?w=250&h=250&random=" + post.img} alt="1" style={{width: "100%"}}/>
              </div>
              <div className='col-md'>
                <p>{post.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='d-flex flex-row justify-content-between px-3'>
          <pre className="text-muted">{post.date}</pre>
          {isLogin ? (<div>UP|DOWN</div>) : ""}
          <div className="d-flex flex-row justify-content-around">
            <div className="rating mx-2">
              <Icons.IconRating
                color={post.rating > 0 ? "green" : post.rating === 0 ? "currentColor" : "red"}/>{post.rating}
            </div>
            <div className="saved mx-2">
              <Icons.IconSaved/>{" " + post.saved}
            </div>
            <div className="views mx-2">
              <Icons.IconEya/>{" " + post.views}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const Comment = ({comment, users}) => {
    return users.map(user => {
      return (
        <div className="comment-body d-flex p-3 my-2" key={user.id}>
          <div className="d-flex flex-row justify-content-around w-100 flex-wrap">
            <img src={user.avatar} alt="avatar" className={`comment-author-avatar rounded-circle mr-2 my-auto`}/>
            <div className={`d-flex flex-column justify-content-between ${width <= 768 ? "w-100" : "w-75"}`}>
              <Link to={"../profile/"+user.id} className="text-dark text-decoration-none">
                <h3 className={`lead ${width <= 768 ? "mx-auto" : ""}`}>{user.firstName + " " + user.lastName}</h3>
              </Link>
              <p className='my-auto'>{comment.text}</p>
              <div className="d-flex flex-row justify-content-between">
                <div className='comment-date text-muted my-auto'>{comment.date}</div>
                <div className="comment-rating d-flex px-3 my-auto">
                  <div className="comment-dislike mx-4"><Icons.IconDislike/>{comment.dislike}</div>
                  <div className="comment-like mx-4"><Icons.IconLike/>{comment.like}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })

  }

  const Comments = ({comments, users}) => {
    return (
      <div className="comments-body d-flex flex-column bg-light rounded-20 p-5">
        <h2
          className="text-center">{comments.filter(comment => comment.postId === post.id).length > 0 ? "Comments(" + comments.filter(comment => comment.postId === post.id).length + ")" : "This article has no comments"}</h2>
        {comments.map((comment) => {
          return comment.postId === post.id ? (
            <Comment comment={comment} key={comment.id} users={users.filter(user => user.id === comment.author)}/>
          ) : ""
        })}
      </div>
    )
  }

  return (
    <div className={`fullPage container d-flex flex-column justify-content-center my-5`}>
      <div className="px-3">
        <Link to="../" className="text-muted text-decoration-none">Home</Link>>
        <Link to={"../profile/" + post.author}
              className="text-muted text-decoration-none">{user.firstName + " " + user.lastName}</Link>
      </div>
      <Post post={post}/>
      <Comments
        comments={comments}
        users={users}
      />
    </div>
  )
}

const DetailsAboutPost = connect((state) => ({
  isLogin: state.globalReducer.isLogin,
  width: state.globalReducer.windowSize.width
}))(TempDetailsAboutPost)

export default DetailsAboutPost;
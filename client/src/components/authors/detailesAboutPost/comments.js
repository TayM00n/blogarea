import React from 'react'
import {Link} from "react-router-dom";
import {Icons} from "../../Icons";
import {FormControl} from "react-bootstrap";

const Comment = ({comment, users, width ,isLogin}) => {
  const getFullName = (fName, lName)=>{
    return fName + " " + lName
  }

  const User = {
    FullName({id, firstName, lastName}) {
      return (
        <Link to={"../profile/" + id} className="text-dark text-decoration-none">
          <h3 className={`lead ${width <= 768 ? "mx-auto" : ""}`}>{getFullName(firstName, lastName)}</h3>
        </Link>
      )
    },
    Avatar({src}) {
      return (<img src={src} alt="avatar" className={`comment-author-avatar rounded-circle mr-2 my-auto`}/>)
    }
  }

  const Comment = {
    Text({text}) {
      return (<p className='my-auto'>{text}</p>)
    },
    Footer({date, like, dislike}) {
      const LikeDislike = ({like, dislike}) => {
        return isLogin ? (
            <>
              <div className="comment-dislike mx-4"><Icons.IconDislike/>{dislike}</div>
              <div className="comment-like mx-4"><Icons.IconLike/>{like}</div>
            </>) :
          (
            <>
              <div className="mx-4"><Icons.IconDislike/>{dislike}</div>
              <div className="mx-4"><Icons.IconLike/>{like}</div>
            </>
          )
      }

      return (
        <div className="d-flex flex-row justify-content-between">
          <div className='comment-date text-muted my-auto'>{date}</div>
          <div className="comment-rating d-flex px-3 my-auto">
            <LikeDislike like={like} dislike={dislike}/>
          </div>
        </div>
      )
    }
  }

  return users.map(user => {
    return (
      <div className="comment-body d-flex p-3 my-2" key={user.id}>
        <div className="d-flex flex-row justify-content-around w-100 flex-wrap">
          <User.Avatar src={user.avatar}/>
          <div className={`d-flex flex-column justify-content-between ${width <= 768 ? "w-100" : "w-75"}`}>
            <User.FullName id={user.id} firstName={user.firstName} lastName={user.lastName}/>
            <Comment.Text text={comment.text}/>
            <Comment.Footer date={comment.date} like={comment.like} dislike={comment.dislike}/>
          </div>
        </div>
      </div>
    )
  })

}

export const Comments = ({comments, users, width, isLogin, postId}) => {
  const AddComment = () => {
    return (
      <div className='add-comment d-flex flex-row bg-light rounded-20 p-3 mt-2'>
        <FormControl as='textarea' className="my-auto rounded" style={{minHeight: "100px", border: "0px"}}/>
        <div className='icon-send my-auto p-1'>
          <Icons.IconAddComment width={50} height={50}/>
        </div>
      </div>
    )
  }

  return (
    <div className='comments-container'>
      <div className="comments-body d-flex flex-column bg-light rounded-20 p-5">
        <h2 className="text-center">
          {comments.filter(comment => comment.postId === postId).length > 0 ? "Comments(" + comments.filter(comment => comment.postId === postId).length + ")" : "This article has no comments"}
        </h2>
        {comments.map((comment) => {
          return comment.postId === postId ? (
            <Comment comment={comment} key={comment.id} users={users.filter(user => user.id === comment.author)} width={width} isLogin={isLogin}/>
          ) : ""
        })}
      </div>
      {isLogin ? <AddComment/> : ""}
    </div>

  )
}
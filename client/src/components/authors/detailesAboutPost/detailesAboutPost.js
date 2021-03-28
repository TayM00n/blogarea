import React from "react"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Icons} from "../../Icons";

import comments from "../../../tempData/comments.json"
import {FormControl} from "react-bootstrap";

const TempDetailsAboutPost = ({post, user, users, isLogin, width}) => {
  //console.log(user)

  const Post = ({post}) => {
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

  const Comment = ({comment, users}) => {

    const User = {
      FullName({id, firstName, lastName}) {
        return (
          <Link to={"../profile/" + id} className="text-dark text-decoration-none">
            <h3 className={`lead ${width <= 768 ? "mx-auto" : ""}`}>{firstName + " " + lastName}</h3>
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

  const Comments = ({comments, users, children}) => {
    return (
      <div className='comments-container'>
        <div className="comments-body d-flex flex-column bg-light rounded-20 p-5">
          <h2 className="text-center">
            {comments.filter(comment => comment.postId === post.id).length > 0 ? "Comments(" + comments.filter(comment => comment.postId === post.id).length + ")" : "This article has no comments"}
          </h2>
          {comments.map((comment) => {
            return comment.postId === post.id ? (
              <Comment comment={comment} key={comment.id} users={users.filter(user => user.id === comment.author)}/>
            ) : ""
          })}
        </div>
        {children}
      </div>

    )
  }

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
      >
        {isLogin ? <AddComment/> : ""}
      </Comments>
    </div>
  )
}

const DetailsAboutPost = connect((state) => ({
  isLogin: state.globalReducer.isLogin,
  width: state.globalReducer.windowSize.width
}))(TempDetailsAboutPost)

export default DetailsAboutPost;
import React from "react"
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Icons} from "../../Icons";

const TempDetailsAboutPost = ({post, isLogin}) => {

  const Post = ({post}) => {
    return (
      <div className="">
        <div className='text-center'>
          <h1>{post.title}</h1>
        </div>
        <div className='row d-flex flex-row flex-wrap'>
          <div className='col-md-3'>
            <img src={"https://placem.at/things?w=250&h=250&random=" + post.img} alt="1" style={{width: "100%"}}/>
          </div>
          <div className='col-md'>
            {/*<p>id -- {post.id}</p>*/}

            <p>Description -- {post.description}</p>
            <p>Author -- {post.author}</p>

          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`fullPage container d-flex flex-column justify-content-center hv-100`}>
      <div className='d-flex flex-column bg-light rounded-20 p-5'>
        <Post post={post}/>
      </div>
      <div className='d-flex flex-row justify-content-between px-3'>
        <pre className="text-muted">{post.date}</pre>
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

const DetailsAboutPost = connect((state)=>({isLogin: state.globalReducer.isLogin}))(TempDetailsAboutPost)

export default DetailsAboutPost;
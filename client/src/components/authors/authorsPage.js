import React, {useState} from "react";
import {FormControl} from "react-bootstrap";
import {Icons} from "../Icons";

const AuthorsPage = ({isLogin, posts}) => {

  const [modePostsView, setModePostsView] = useState("All posts");
  const [numViews, setNumViews] = useState({posts:25, users:25})
  const [postsView, setPostsView] = useState([...posts])

  const sordPost = (arr, filter = "stars")=>{
    return arr.sort((a,b)=>{
      if(a[filter] > b[filter]) return -1
      if(a[filter] < b[filter]) return 1
      return 0
    })
  }

  const handleModePostsView = (e)=>{
    setModePostsView(e.target.value)

    if(e.target.value === "All posts"){
      setPostsView([...posts])
    }else{
      let tempAr = sordPost([...posts])
      setPostsView(tempAr)
    }
  }

  const Posts = ({posts}) => {
    return posts.map((post) => {
      return (
        <div className="post d-flex my-2" key={post.id}>
          <div className='post-body row w-100'>
            <div className='img mx-auto col-4'>
              <img src={post.img} alt={post.title}/>
            </div>
            <div className='col d-flex flex-column justify-content-between'>
              <div className="post-title"><h1>post.title</h1></div>
              <div className="post-description">
                <p >{post.description}</p>
              </div>
              <div className="post-footer d-flex justify-content-between">
                <div className="author">
                  {post.author}
                </div>
                <div className='d-flex flex-row flex-wrap'>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map(star => <Icons.IconEmptyStar key={star} isActive={post.stars >= star ? post.stars : false}/>)}
                  </div>
                  <div className="views">
                    <Icons.IconEya/>{" "+post.views}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='fullPage'>
      <div className="d-flex flex-row justify-content-center hv-100">
        <div className='row d-flex flex-row justify-content-between w-100'>
          <div className="col-lg-9 posts d-flex flex-column justify-content-center">
            <div className="page-view d-flex flex-row justify-content-around mx-auto">
              <p className={numViews.posts === 25 ? "active":""} onClick={()=>setNumViews({...numViews, posts: 25})}>25</p>
              <p className={numViews.posts === 50 ? "active":""} onClick={()=>setNumViews({...numViews, posts: 50})}>50</p>
              <p className={numViews.posts === 100 ? "active":""} onClick={()=>setNumViews({...numViews, posts: 100})}>100</p>
            </div>
            <div className="custom-select-authors mx-auto">
              <FormControl as="select" className="px-5" onChange={handleModePostsView}>
                <option>All posts</option>
                <option>Top 10</option>
              </FormControl>
            </div>
            <div className="container-posts rounded-20">
              <Posts posts={postsView}/>
            </div>
          </div>
          <div className=" col users d-flex flex-column justify-content-center">
            <div className="page-view d-flex flex-row justify-content-around mx-auto">
              <p className={numViews.users === 25 ? "active": ""} onClick={()=>setNumViews({...numViews, users: 25})}>25</p>
              <p className={numViews.users === 50 ? "active" : ""} onClick={()=>setNumViews({...numViews, users: 50})}>50</p>
              <p className={numViews.users === 100 ? "active" : ""} onClick={()=>setNumViews({...numViews, users: 100})}>100</p>
            </div>
            <div className="custom-select-users mx-auto">
              <FormControl as="select" className="px-5">
                <option>All users</option>
                <option>Top 10</option>
              </FormControl>
            </div>
            <div className="container-users rounded-20">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorsPage
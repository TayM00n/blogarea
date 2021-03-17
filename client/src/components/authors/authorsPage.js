import React, {useState} from "react";
import {FormControl} from "react-bootstrap";

const AuthorsPage = ({isLogin, posts}) => {

  const [modePostsView, setModePostsView] = useState("All posts");
  const [numViews, setNumViews] = useState({posts:25, users:25})
  const [postsView, setPostsView] = useState([...posts])

  const IconEmptyStar = ({width = 15, height = 15, isActive}) => {
    return (
      <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.97942 1.25171L6.9585 1.30199L5.58662 4.60039C5.54342 4.70426 5.44573 4.77523 5.3336 4.78422L1.7727 5.0697L1.71841 5.07405L1.38687 5.10063L1.08608 5.12475C0.820085 5.14607 0.712228 5.47802 0.914889 5.65162L1.14406 5.84793L1.39666 6.06431L1.43802 6.09974L4.15105 8.42374C4.23648 8.49692 4.2738 8.61176 4.24769 8.72118L3.41882 12.196L3.40618 12.249L3.32901 12.5725L3.25899 12.866C3.19708 13.1256 3.47945 13.3308 3.70718 13.1917L3.9647 13.0344L4.24854 12.861L4.29502 12.8326L7.34365 10.9705C7.43965 10.9119 7.5604 10.9119 7.6564 10.9705L10.705 12.8326L10.7515 12.861L11.0354 13.0344L11.2929 13.1917C11.5206 13.3308 11.803 13.1256 11.7411 12.866L11.671 12.5725L11.5939 12.249L11.5812 12.196L10.7524 8.72118C10.7263 8.61176 10.7636 8.49692 10.849 8.42374L13.562 6.09974L13.6034 6.06431L13.856 5.84793L14.0852 5.65162C14.2878 5.47802 14.18 5.14607 13.914 5.12475L13.6132 5.10063L13.2816 5.07405L13.2274 5.0697L9.66645 4.78422C9.55432 4.77523 9.45663 4.70426 9.41343 4.60039L8.04155 1.30199L8.02064 1.25171L7.89291 0.944609L7.77702 0.665992C7.67454 0.419604 7.32551 0.419604 7.22303 0.665992L7.10715 0.944609L6.97942 1.25171ZM7.50003 2.60397L6.50994 4.98442C6.32273 5.43453 5.89944 5.74207 5.41351 5.78103L2.84361 5.98705L4.8016 7.66428C5.17183 7.98142 5.33351 8.47903 5.2204 8.95321L4.62221 11.461L6.8224 10.1171C7.23842 9.86302 7.76164 9.86302 8.17766 10.1171L10.3778 11.461L9.77965 8.95321C9.66654 8.47903 9.82822 7.98142 10.1984 7.66428L12.1564 5.98705L9.58654 5.78103C9.10061 5.74207 8.67732 5.43453 8.49011 4.98442L7.50003 2.60397Z"
          fill={isActive ? "yellow" : "currentColor"} fillRule={isActive ? "" : "evenodd"} clipRule="evenodd"/>
      </svg>
    )
  }

  const IconEya = ({width = 15, height = 15}) => {
    return (
      <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z"
          fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      </svg>
    )
  }

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
                    {[1, 2, 3, 4, 5].map(star => <IconEmptyStar key={star} isActive={post.stars >= star ? post.stars : false}/>)}
                  </div>
                  <div className="views">
                    <IconEya/>{" "+post.views}
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
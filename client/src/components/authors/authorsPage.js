import React, {useState} from "react";
import {FormControl} from "react-bootstrap";
import {Icons} from "../Icons";

const AuthorsPage = ({isLogin, posts, users}) => {

  const [modePostsView, setModePostsView] = useState("All posts");
  const [numViews, setNumViews] = useState({posts: 25, users: 25})
  const [postsView, setPostsView] = useState([...posts])
  const [usersView, setUsersView] = useState([...users])

  const sordPost = (arr, filter = "rating") => {
    return arr.sort((a, b) => {
      if (a[filter] > b[filter]) return -1
      if (a[filter] < b[filter]) return 1
      return 0
    })
  }

  const handleModePostsView = (e) => {
    setModePostsView(e.target.value)

    if (e.target.value === "All posts") {
      setPostsView([...posts])
    } else {
      let tempAr = sordPost([...posts])
      setPostsView(tempAr)
    }
  }

  const Posts = ({posts}) => {
    return posts.map((post) => {
      return (
        <div className="post d-flex my-2" key={post.id}>
          <div className='row post-body w-100 mx-auto'>
            <div className='col-4 img mx-auto'>
              <img src={post.img} alt={post.title}/>
            </div>
            <div className='col-lg d-flex flex-column justify-content-between'>
              <div>
                <div className="post-title d-flex flex-row justify-content-between flex-wrap">
                  <h1>{post.title}</h1>
                </div>
                <div className="post-description">
                  <p>{post.description}</p>
                </div>
              </div>
              <div className="row post-footer w-100 mx-auto">
                <div className="date col-md p-0 my-auto mx-1 order-2 order-md-1">
                  <pre className='text-muted m-0'> {post.date}</pre>
                </div>
                <div className='col-md p-0 my-auto mx-1 order-3 order-md-2'>
                  <div className="d-flex flex-row justify-content-around">
                    <div className="rating mx-1">
                      <Icons.IconRating color={post.rating>0 ? "green" : "red"}/>{post.rating}
                    </div>
                    <div className="saved mx-1">
                      <Icons.IconSaved/>{" " + post.saved}
                    </div>
                    <div className="views mx-1">
                      <Icons.IconEya/>{" " + post.views}
                    </div>
                  </div>
                </div>
                <div className="more col-md my-auto p-0 mx-1 d-flex justify-content-end order-1 order-md-3">
                  <a className="btn more my-auto">More<Icons.IconNextV2/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  const Users = ({users}) => {
    return users.map((user) => {
      return (
        <div className="user my-2 d-flex flex-row" key={user.id}>
          <img src={user.avatar} alt="avatar" className="avatar-thumb my-auto"/>
          <div className='user-body ml-1 w-100 my-auto text-center'>
            <h6 className='lead'>{user.firstName + " " + user.lastName}</h6>
            <div className='filling d-flex flex-row justify-content-around'>
              <div className='reputation-like'><Icons.IconSmile/>{' ' + user.like}</div>
              <div className='reputation-dislike'><Icons.IconSad/>{' ' + user.dislike}</div>
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
              <p className={numViews.posts === 25 ? "active" : ""}
                 onClick={() => setNumViews({...numViews, posts: 25})}>25</p>
              <p className={numViews.posts === 50 ? "active" : ""}
                 onClick={() => setNumViews({...numViews, posts: 50})}>50</p>
              <p className={numViews.posts === 100 ? "active" : ""}
                 onClick={() => setNumViews({...numViews, posts: 100})}>100</p>
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
          <div className="col users d-flex flex-column justify-content-center">
            <div className="page-view d-flex flex-row justify-content-around mx-auto">
              <p className={numViews.users === 25 ? "active" : ""}
                 onClick={() => setNumViews({...numViews, users: 25})}>25</p>
              <p className={numViews.users === 50 ? "active" : ""}
                 onClick={() => setNumViews({...numViews, users: 50})}>50</p>
              <p className={numViews.users === 100 ? "active" : ""}
                 onClick={() => setNumViews({...numViews, users: 100})}>100</p>
            </div>
            <div className="custom-select-users mx-auto">
              <FormControl as="select" className="px-5">
                <option>All users</option>
                <option>Top 10</option>
              </FormControl>
            </div>
            <div className="container-users rounded-20">
              <Users users={usersView}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorsPage
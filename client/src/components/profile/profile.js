import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {Icons} from "../Icons";
import {setValueToStore} from "../../index";
import {ElemPagination, Posts} from "../authors/authorsPage";

let prevCountPostsView = 25;
let prevPage = 1;

const TempProfile = ({posts, user, profile, isLogin, userId}) => {
  const setDataView = () => {
    let loadData = profile.currentPostsPage * profile.countPostsView
    let temp = []
    for (let i = (loadData - profile.countPostsView); i < loadData; i++) {
      if (i < posts.length) temp.push(posts[i]);
    }
    return temp
  }

  useEffect(() => {
    //console.log("UseEffect",user)
    setDataView()
  }, [profile.countPostsView, profile.currentPostsPage])// eslint-disable-line react-hooks/exhaustive-deps



  const handleOnChangeCountView = (item) => {
    if (prevCountPostsView !== item) {
      prevCountPostsView = item
      setValueToStore({
        type: "SET_COUNT_POSTS_VIEW_REQUEST",
        countPostsView: item
      })
    }
  }

  const handleOnPageChange = (num) => {
    if(prevPage !== num) {
      prevPage = num
      setValueToStore({
        type: "SET_CURRENT_POSTS_PAGE_REQUEST",
        currentPagePostsUsers: num
      })
    }
  }

  const UserInfo = ({id = 1, fullName = "DASSWWSS", postsCount = "6", avatar = "", rating = {like: 2, dislike: 3}}) => {
    return (
      <div className="user-info row justify-content-center">
        <div className="user-info-avatar"><img src={avatar} alt={"avatar " + id} className="rounded-circle"/>
        </div>
        <div className='d-flex flex-column justify-content-center ml-5'>
          <div className="user-info-fullName">
            <h3>{fullName}</h3>
          </div>
          <div className='user-info-postsCount'>
            <pre>Total posts: {postsCount}</pre>
          </div>
          <div className='filling d-flex flex-row justify-content-between'>
            <div className='reputation-like'><Icons.IconSmile/>{' ' + rating.like}</div>
            <div className='reputation-dislike'><Icons.IconSad/>{' ' + rating.dislike}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`fullPage-profile container d-flex flex-column justify-content-center ${!posts.length ? "hv-100" : ""}`}>
      <div className='d-flex flex-column bg-light rounded-20 p-2'>
        <UserInfo id={user.id} avatar={user.avatar} fullName={user.firstName + " " + user.lastName} postsCount={posts.length} rating={{like: user.like, dislike: user.dislike}}/>
        {posts.length ? <div className="d-flex flex-column justify-content-between mt-3">
          <div className="page-view d-flex flex-row justify-content-around mx-auto">
            {[25, 50, 100].map(item =>
              <p key={item}
                 className={profile.countPostsView === item ? "active" : ""}
                 onClick={() => handleOnChangeCountView(item)}>
                {item}
              </p>)}
          </div>
          <div className="container-posts rounded-20">
            <Posts posts={posts}/>
          </div>
          <div className="pagination d-flex flex-row justify-content-center m-0 pb-2">
            <ElemPagination
              page={profile.currentPostsPage}
              count={Math.ceil(posts.length / profile.countPostsView)}
              onChange={(e, page) => handleOnPageChange(page)}/>
          </div>
        </div>:
          <div className="text-center my-5"><p>{isLogin && user.id === +userId ? "You don't have any posts" : "This user has no posts"}</p></div>}
      </div>
    </div>)
}

const Profile = connect((state) => ({profile: state.profileReducer, isLogin: state.globalReducer.isLogin, userId: state.globalReducer.userId}))(TempProfile)

export default Profile
import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {Icons} from "../Icons";
import {Pagination} from "@material-ui/lab";

const TempProfile = ({posts, users, num = 0}) => {

  const UserInfo = ({id, fullName, postsCount, avatar, rating}) => {
    return (
      <div className="user-info row mx-auto">
        <div className="user-info-avatar mx-1 "><img src={avatar} alt={"avatar " + id} className="rounded-circle"/>
        </div>
        <div className='d-flex flex-column justify-content-center mx-1'>
          <div className="user-info-fullName">
            <h3>{fullName}</h3>
          </div>
          <div className='user-info-postsCount'>
            <pre>All posts: {postsCount}</pre>
          </div>
          <div className='filling d-flex flex-row justify-content-around'>
            <div className='reputation-like'><Icons.IconSmile/>{' ' + rating.like}</div>
            <div className='reputation-dislike'><Icons.IconSad/>{' ' + rating.dislike}</div>
          </div>
        </div>
      </div>
    )
  }

  const Posts = ({posts}) => {
    return posts.map((post) => {
      return (
        <div className="post d-flex my-2" key={post.id}>
          <div className='row post-body w-100 mx-auto'>
            <div className='col-4 img mx-auto'>
              <img src={"https://placem.at/things?w=250&h=250&random=" + post.img} alt={post.title}/>
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
                      <Icons.IconRating
                        color={post.rating > 0 ? "green" : post.rating === 0 ? "currentColor" : "red"}/>{post.rating}
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
                  <a className="btn more my-auto" href={post.full}>More<Icons.IconNextV2/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="fullPage-profile container hv-100 d-flex flex-column justify-content-center">
      <div className='d-flex flex-column bg-light rounded-20 p-2'>
        <div className="page-view d-flex flex-row justify-content-around mx-auto">
          {[25, 50, 100].map(item =>
            <p key={item}
               className={profile.countView === item ? "active" : ""}
               onClick={()=>handleOnChangeCountView(item)}>
              {item}
            </p>)}
        </div>
        <UserInfo id={users[num].id}
                  avatar={users[num].avatar}
                  fullName={users[num].firstName + " " + users[num].lastName}
                  postsCount={posts.filter((item) => item.author === (users[num].firstName + " " + users[num].lastName)).length}
                  rating={{like: users[num].like, dislike: users[num].dislike}}/>
        <div className="container-posts rounded-20">
          <Posts posts={posts.filter((item) => item.author === (users[num].firstName + " " + users[num].lastName))}/>
        </div>
        <div className="pagination d-flex flex-row justify-content-center m-0 pb-2">
          <Pagination
            count={Math.ceil(posts.filter((item) => item.author === (users[num].firstName + " " + users[num].lastName)).length/25)}
            shape={"round"}
            size={"small"}/>
        </div>
      </div>
    </div>)
}

const Profile = connect((state) => ({}))(TempProfile)

export default Profile
import React, {useEffect} from "react";
import {FormControl} from "react-bootstrap";
import {Icons} from "../Icons";
import {connect} from "react-redux";
import {setValueToStore} from "../../index";
import {Pagination} from "@material-ui/lab";
import {Link} from "react-router-dom";

let prevPage = {posts: 1, users: 1};
let prevCountView = {posts: 25, users: 25}
const sortArray = (arr, filter = "rating") => {
  if (typeof filter === "string") {
    return arr.sort((a, b) => {
      if (a[filter] > b[filter]) return -1
      if (a[filter] < b[filter]) return 1
      return 0
    })
  }
  if (typeof filter === "object") {
    if (filter.indexOf("like") >= 0 && filter.indexOf("dislike") >= 0)
      return arr.sort((a, b) => {
        let avgA = (a[filter[0]] + a[filter[1]]) / 2
        let avgB = (b[filter[0]] + b[filter[1]]) / 2
        if (avgA > avgB) return -1
        if (avgA < avgB) return 1
        return 0
      })
  }
}

export const Post = ({post, isShorting})=>{
  return(
    <div className="post d-flex my-2">
      <div className='row post-body w-100 mx-auto'>
        <div className='col-4 img mx-auto'>
          <img src={"https://placem.at/things?w=250&h=250&random="+post.img} alt={post.title}/>
        </div>
        <div className='col-lg d-flex flex-column justify-content-between'>
          <div>
            <div className="post-title d-flex flex-row justify-content-between flex-wrap">
              <Link to={"/post/"+post.id} className="text-dark text-decoration-none"><h2>{post.title}</h2></Link>
            </div>
            <div className="post-description">
              <p>{isShorting ? post.description.substr(0,256) + "..." : post.description}</p>

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
              <Link className="btn more my-auto" to={"/post/"+post.id}>More<Icons.IconNextV2/></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Posts = ({posts}) => {
  return posts.map((post) => {
    return (
      <Post post={post} isShorting={post.description.length > 256 && true} key={post.id}/>
    )
  })
}

export const ElemPagination = ({page, count, onChange})=>{
  return <Pagination
    page={page}
    count={count}
    onChange={onChange}
    shape={"round"}
    size={"small"}/>
}

const TempAuthorsPage = ({posts, users, authors}) => {

  const setDataView = (name) => {
    let loadData = authors.currentPagePostsUsers[name] * authors.countView[name]
    let temp = []
    for (let i = (loadData - authors.countView[name]); i < loadData; i++) {
      if ((name === "posts" && i < posts.length) || (name === "users" && i < users.length)) name === "posts" ? temp.push(posts[i]) : temp.push(users[i]);
    }
    return temp
  }

  const setSortDataView = (name) => {

    let loadData = authors.currentPagePostsUsers[name] * authors.countView[name]
    let temp = []
    let sortData = name === "posts" ? sortArray([...posts]) : sortArray([...users], ["like", "dislike"])
    for (let i = (loadData - authors.countView[name]); i < loadData; i++) {
      if (i < sortData.length) temp.push(sortData[i]);
    }
    return temp
  }

  useEffect(() => {
    if ((authors.currentPagePostsUsers.posts * authors.countView.posts > posts.length) && (posts.length > authors.countView.posts)) {
      setValueToStore({
        type: "SET_CURRENT_PAGE_USERS_POSTS_REQUEST",
        currentPagePostsUsers: {...authors.currentPagePostsUsers, "posts": 1}
      })
    }
    if ((authors.currentPagePostsUsers.users * authors.countView.users > users.length) && (users.length > authors.countView.users)) {
      setValueToStore({
        type: "SET_CURRENT_PAGE_USERS_POSTS_REQUEST",
        currentPagePostsUsers: {
          ...authors.currentPagePostsUsers,
          "users": Math.ceil(users.length / authors.countView.users)
        }
      })
    }

    (authors.modeView.posts === "All posts") && setValueToStore({
      type: "SET_POSTS_VIEW_REQUEST",
      postsView: [...setDataView("posts")]
    });
    (authors.modeView.users === "All users") && setValueToStore({
      type: "SET_USERS_VIEW_REQUEST",
      usersView: [...setDataView("users")]
    });


    (authors.modeView.posts === "Top 10") && setValueToStore({
      type: "SET_POSTS_VIEW_REQUEST",
      postsView: [...setSortDataView("posts")]
    });
    (authors.modeView.users === "Top 10") && setValueToStore({
      type: "SET_USERS_VIEW_REQUEST",
      usersView: [...setSortDataView("users")]
    });

  }, [authors.countView, authors.currentPagePostsUsers, authors.modeView])// eslint-disable-line react-hooks/exhaustive-deps

  const handleModeView = (e, name) => {
    setValueToStore({
      type: "SET_MODE_VIEW_REQUEST",
      modeView: {...authors.modeView, [name]: e.target.value}
    })
  }

  const handleOnPageChange = (name, num) => {
    if(prevPage[name] !== num) {
      prevPage[name] = num
      setValueToStore({
        type: "SET_CURRENT_PAGE_USERS_POSTS_REQUEST",
        currentPagePostsUsers: {
          ...authors.currentPagePostsUsers,
          [name]: num
        }
      })

    }
  }

  const handleOnChangeCountView = (name, item) => {
    if(prevCountView[name] !== item){
      prevCountView[name] = item
      setValueToStore({
        type: "SET_COUNT_VIEW_REQUEST",
        countView: {...authors.countView, [name]: item}
      })
    }

  }

  const Users = ({users}) => {
    return users.map((user) => {
      return (
        <div className="user my-2 d-flex flex-row" key={user.id}>
          <img src={user.avatar} alt="avatar" className="avatar-thumb my-auto"/>
          <div className='user-body ml-1 w-100 my-auto text-center'>
            <Link to={"/profile/"+user.id}><h6 className='lead'>{user.firstName + " " + user.lastName}</h6></Link>
            <div className='filling d-flex flex-row justify-content-around'>
              <div className='reputation-like'><Icons.IconSmile/>{' ' + user.like}</div>
              <div className='reputation-dislike'><Icons.IconSad/>{' ' + user.dislike}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  const Tab = ({children, colSize}) => {
    const tabName = children.type.name.toLowerCase();
    return (
      <div className={`${colSize} ${tabName} tab d-flex flex-column justify-content-center py-2`}>
        <div className="page-view d-flex flex-row justify-content-around mx-auto">
          {[25, 50, 100].map(item =>
            <p key={item}
               className={authors.countView[tabName] === item ? "active" : ""}
               onClick={()=>handleOnChangeCountView(tabName,item)}>
              {item}
            </p>)}
        </div>
        <div className={`custom-select-${tabName} mx-auto`}>
          <FormControl as="select" className="px-5" value={authors.modeView[tabName]} onChange={(e)=>handleModeView(e, tabName)}>
            <option>All {tabName}</option>
            <option>Top 10</option>
          </FormControl>
        </div>
        <div className={`container-${tabName} rounded-20`}>
          {children}
        </div>
        <div className="pagination d-flex flex-row justify-content-center m-0 pb-4">
            <ElemPagination
              page={tabName === "posts" ? authors.currentPagePostsUsers.posts : authors.currentPagePostsUsers.users}
              count={tabName === "posts" ? Math.ceil(posts.length / authors.countView[tabName.substr(0, tabName.length)]) : Math.ceil(users.length / authors.countView[tabName.substr(0, tabName.length)])}
              onChange={(e, page)=> handleOnPageChange(tabName, page)}/>
        </div>
      </div>
    )
  }

  return (
    <div className='fullPage'>
      <div className="d-flex flex-row justify-content-center hv-100">
        <div className='row d-flex flex-row justify-content-between w-100'>
          <Tab colSize="col-lg-9">
            <Posts posts={authors.postsView}/>
          </Tab>
          <Tab colSize="col">
            <Users users={authors.usersView}/>
          </Tab>
        </div>
      </div>
    </div>
  )
}

const AuthorsPage = connect((state) => ({authors: state.authorReducer}))(TempAuthorsPage)

export default AuthorsPage
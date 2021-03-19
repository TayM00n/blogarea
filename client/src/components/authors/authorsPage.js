import React, {useState} from "react";
import {FormControl} from "react-bootstrap";
import {Icons} from "../Icons";
import {connect} from "react-redux";

const sortArray = (arr, filter = "rating") => {
  console.log(typeof filter);
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
        /*console.log(`AVG-A|(${a[filter[0]]} + ${a[filter[1]]})/ 2 = `,avgA)
        console.log(`AVG-B|(${b[filter[0]]} + ${b[filter[1]]})/ 2 = `,avgB)*/
        if (avgA > avgB) return -1
        if (avgA < avgB) return 1
        return 0
      })
  }
  /**/
}

const TempAuthorsPage = ({isLogin, posts, users, modeView, dispatch}) => {
  const [postsView, setPostsView] = useState([...posts])
  const [usersView, setUsersView] = useState([...users])

  const handleModeView = (e) => {
    let parentClassName = e.nativeEvent.path[1].classList[0].split("-")
    console.log(e.target.value)
    dispatch({
      type: "SET_MODE_VIEW_REQUEST",
      modeView: {...modeView, [parentClassName[parentClassName.length - 1]]: e.target.value}
    })
    switch (parentClassName[parentClassName.length - 1]) {
      case "posts": {
        if (e.target.value === "All posts") {
          setPostsView([...posts])
        } else {
          let tempAr = sortArray([...posts])
          setPostsView(tempAr)
        }
        break;
      }
      case "users": {
        if (e.target.value === "All users") {
          setUsersView([...users])
        } else {
          let tempAr = sortArray([...users], ["like", "dislike"])
          setUsersView(tempAr)
        }
        break;
      }
      default:
        return "Nothing sorted"
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
                      <Icons.IconRating color={post.rating > 0 ? "green" : "red"}/>{post.rating}
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

  const Tab = ({children, colSize}) => {
    const [numViews, setNumViews] = useState({posts: 25, users: 25})

    const tabName = children.type.name.toLowerCase();
    return (
      <div className={`${colSize} ${tabName} d-flex flex-column justify-content-center`}>
        <div className="page-view d-flex flex-row justify-content-around mx-auto">
          {[25, 50, 100].map(item =>
            <p key={item}
               className={numViews[tabName] === item ? "active" : ""}
               onClick={() => setNumViews({...numViews, [tabName]: item})}>
              {item}
            </p>)}
        </div>
        <div className={`custom-select-${tabName} mx-auto`}>
          <FormControl as="select" className="px-5" value={modeView[tabName]} onChange={handleModeView}>
            <option>All {tabName}</option>
            <option>Top 10</option>
          </FormControl>
        </div>
        <div className={`container-${tabName} rounded-20`}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className='fullPage'>
      <div className="d-flex flex-row justify-content-center hv-100">
        <div className='row d-flex flex-row justify-content-between w-100'>
          <Tab colSize="col-lg-9">
            <Posts posts={postsView}/>
          </Tab>
          <Tab colSize="col">
            <Users users={usersView}/>
          </Tab>
        </div>
      </div>
    </div>
  )
}

const AuthorsPage = connect((state) => ({modeView: state.authorReducer.modeView}))(TempAuthorsPage)

export default AuthorsPage
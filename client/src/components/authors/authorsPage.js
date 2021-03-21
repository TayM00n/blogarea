import React, {useEffect} from "react";
import {FormControl} from "react-bootstrap";
import {Icons} from "../Icons";
import {connect} from "react-redux";
import {setValueToStore} from "../../index";
import {Pagination} from "@material-ui/lab";

let prevPage = {posts: 1, users: 1};

const TempAuthorsPage = ({isLogin, posts, users, authors}) => {
  /*const [postsView, setPostsView] = useState([])
  const [usersView, setUsersView] = useState([])
  //const [sortData, setSortData] = useState({posts: [...postsView], users: [...usersView]})*/

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

  const setDataView = (name) => {
    let loadData = authors.currentPagePostsUsers[name] * authors.countView[name]
    let temp = []
    for (let i = (loadData - authors.countView[name]); i < loadData; i++) {
      if ((name === "posts" && i < posts.length) || (name === "users" && i < users.length)) name === "posts" ? temp.push(posts[i]) : temp.push(users[i]);
    }
    console.log(name, temp)
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

    console.log("useEffect | dataView(posts)");
    (authors.modeView.posts === "All posts") && setValueToStore({
      type: "SET_POSTS_VIEW_REQUEST",
      postsView: [...setDataView("posts")]
    });
    console.log("useEffect | dataView(users)");
    (authors.modeView.users === "All users") && setValueToStore({
      type: "SET_USERS_VIEW_REQUEST",
      usersView: [...setDataView("users")]
    });


    console.log("useEffect | sortDataView(posts)");
    (authors.modeView.posts === "Top 10") && setValueToStore({
      type: "SET_POSTS_VIEW_REQUEST",
      postsView: [...setSortDataView("posts")]
    });
    console.log("useEffect | sortDataView(users)");
    (authors.modeView.users === "Top 10") && setValueToStore({
      type: "SET_USERS_VIEW_REQUEST",
      usersView: [...setSortDataView("users")]
    });

  }, [authors.countView, authors.currentPagePostsUsers, authors.modeView])// eslint-disable-line react-hooks/exhaustive-deps

  const handleModeView = (e) => {
    let parentClassName = e.nativeEvent.path[1].classList[0].split("-")
    parentClassName = parentClassName[parentClassName.length - 1]
    setValueToStore({
      type: "SET_MODE_VIEW_REQUEST",
      modeView: {...authors.modeView, [parentClassName]: e.target.value}
    })
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

  const handleOnPageChange = (name, rez) => {
    if(prevPage[name] !== rez) {
      prevPage[name] = rez
      setValueToStore({
        type: "SET_CURRENT_PAGE_USERS_POSTS_REQUEST",
        currentPagePostsUsers: {
          ...authors.currentPagePostsUsers,
          [name]: rez
        }
      })

    }
  }

  /*const Pagination = ({length, name, stop}) => {
    let pages = []
    for (let i = 0; i <= length + 1; i++) {
      pages.push(i)
    }

    return pages.map(page => {
      if (page === 0) {
        return <div key={page}
                    style={{cursor: "pointer"}}
                    className={`${authors.currentPagePostsUsers[name] - 1 > 0 ? "bg-light" : ""} rounded-circle`}
                    onClick={() => authors.currentPagePostsUsers[name] - 1 > 0 ? handleOnPageChange(name, authors.currentPagePostsUsers[name] - 1) : ""}>
          <Icons.IconBackV2/></div>
      }
      if (page === length + 1) {
        return <div key={page}
                    style={{cursor: "pointer"}}
                    className={`${authors.currentPagePostsUsers[name] + 1 <= length ? "bg-light" : ""} rounded-circle`}
                    onClick={() => authors.currentPagePostsUsers[name] + 1 <= length ? handleOnPageChange(name, authors.currentPagePostsUsers[name] + 1) : ""}>
          <Icons.IconNextV2/></div>
      }
      if (length > stop) {
        if (page === stop) return <div key={page}>...</div>
      }

      console.log(name, stop)
      if (authors.currentPagePostsUsers[name] + 1 === stop && page + 1 === stop) {
        stop += 4
        console.log("YES", page)
      }

      if ((length > stop && (page < stop || page === length)) || length <= stop)
        return <div key={page} className={`${authors.currentPagePostsUsers[name] === page ? "active" : ""} page`}
                    onClick={(e) => length > 1 && handleOnPageChange(name, +e.target.textContent)}>{page}</div>
      return ""
    })
  }*/

  const Tab = ({children, colSize}) => {
    const tabName = children.type.name.toLowerCase();
    return (
      <div className={`${colSize} ${tabName} d-flex flex-column justify-content-center py-2`}>
        <div className="page-view d-flex flex-row justify-content-around mx-auto">
          {[25, 50, 100].map(item =>
            <p key={item}
               className={authors.countView[tabName] === item ? "active" : ""}
               onClick={() => {
                 setValueToStore({
                   type: "SET_COUNT_VIEW_REQUEST",
                   countView: {...authors.countView, [tabName]: item}
                 })
               }}>
              {item}
            </p>)}
        </div>
        <div className={`custom-select-${tabName} mx-auto`}>
          <FormControl as="select" className="px-5" value={authors.modeView[tabName]} onChange={handleModeView}>
            <option>All {tabName}</option>
            <option>Top 10</option>
          </FormControl>
        </div>
        <div className={`container-${tabName} rounded-20`}>
          {children}
        </div>
        <div className="pagination d-flex flex-row justify-content-center m-0">
          {/*{<Pagination
            length={tabName === "posts" ? Math.ceil(posts.length / authors.countView[tabName.substr(0, tabName.length)]) : Math.ceil(users.length / authors.countView[tabName.substr(0, tabName.length)])}
            name={tabName}
            stop={5}/>}*/}
            <Pagination page={tabName === "posts" ? authors.currentPagePostsUsers.posts : authors.currentPagePostsUsers.users} count={tabName === "posts" ? Math.ceil(posts.length / authors.countView[tabName.substr(0, tabName.length)]) : Math.ceil(users.length / authors.countView[tabName.substr(0, tabName.length)])} onChange={(e, page)=> handleOnPageChange(tabName, page)} shape={"rounded"} size={"small"}/>
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
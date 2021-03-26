import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, useLocation} from 'react-router-dom'
import React, {useEffect} from "react";
import AuthorsPage from "./components/authors/authorsPage";
import GuestHomePage from "./components/homePage/guestHomePage";
import {setValueToStore, setItemToLocalStore, getItemFromLocalStore} from "./index";
import LogIn from "./components/login_signup/loginPage";
import SignUp from "./components/login_signup/signupPage";
import AuthMenu from "./components/menu/authMenu";
import GuestMenu from "./components/menu/guestMenu";
import posts from "./tempData/posts.json"
import users from "./tempData/users.json"
import Profile from "./components/profile/profile";
import DetailsAboutPost from "./components/authors/detailesAboutPost/detailesAboutPost";

function App({global}) {
  const loc = useLocation()

  useEffect(() => {
    const rdItems = [
      {
        name: "user_jwt",
        value: global.userId
      },
      {
        name: "stateMenu",
        value: global.menuState
      }
    ]

    const handleFirstLoad = async (rdItems) => {
      const isStorageEmpty = (mObj) => {
        return mObj.forEach(item => {
          if (getItemFromLocalStore(item.name) === null) setItemToLocalStore(item.name, item.value)
        })
      }
      isStorageEmpty(rdItems)
      loc.pathname.replace("/", "") !== global.currentPage && setValueToStore({
        type: "SET_CURRENT_PAGE_REQUEST",
        currentPage: loc.pathname.replace("/", "")
      })
      if (global.userId !== getItemFromLocalStore("user_jwt")) {
        setValueToStore({type: "SET_JWT_REQUEST", userId: getItemFromLocalStore("user_jwt")})
      }
      if (global.userId.length > 0) {
        global.isLogin !== true && setValueToStore({type: "SET_IS_LOGIN_REQUEST", isLogin: true})
      } else {
        global.isLogin !== false && setValueToStore({type: "SET_IS_LOGIN_REQUEST", isLogin: false})
      }
    }
    handleFirstLoad(rdItems)
  }, [global.userId, global.currentPage, global.isLogin, loc])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App container-fluid">
      <div className='header'>
        {global.isLogin ?
          <AuthMenu/> :
          <GuestMenu/>}
      </div>
      {global.isLogin ? (
        <Switch>
          <Route path="/settings" exec component={() => <h1>Settings</h1>}/>
          <Route path="/profile/:id" exec render={(e) => {
            return <Profile
              posts={posts.filter((item) => item.author === (users[e.match.params.id-1].firstName + " " + users[e.match.params.id-1].lastName))}
              user={users[e.match.params.id - 1]}/>
          }}/>
          <Route path="/profile" exec render={() => <Profile
            posts={posts.filter((item) => item.author === (users[getItemFromLocalStore("user_jwt")-1].firstName + " " + users[getItemFromLocalStore("user_jwt")-1].lastName))}
            user={users[getItemFromLocalStore("user_jwt") - 1]}/>}/>
          <Route path="/createpost" exec component={() => <h1>Create post</h1>}/>
          <Route path="/post/:id" exec render={(e) => <DetailsAboutPost post={posts[e.match.params.id - 1]}/>}/>
          <Route path="/" exec component={() => <AuthorsPage posts={posts} users={users}/>}/>
        </Switch>
      ) : (
        <Switch>
          <Route path="/authors" exec component={() => <AuthorsPage posts={posts} users={users}/>}/>
          <Route path="/post/:id" exec render={(e) => <DetailsAboutPost post={posts[e.match.params.id - 1]}/>}/>
          <Route path="/profile/:id" exec render={(e) => {
            return <Profile
              posts={posts.filter((item) => item.author === (users[e.match.params.id-1].firstName + " " + users[e.match.params.id-1].lastName))}
              user={users[e.match.params.id - 1]}/>
          }}/>
          <Route path="/login" exec component={(e) => {return <LogIn/>}}/>
          <Route path="/signup" exec component={() => <SignUp/>}/>
          <Route path="/" exec component={GuestHomePage}/>
        </Switch>
      )}
    </div>
  );
}


export default App;

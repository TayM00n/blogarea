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

function App({global}) {

  const loc = useLocation()

  const posts = [
    {
      "id": 1,
      "author": "Loper Ior",
      "title": "Veribet",
      "description": "cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque",
      "img": "https://placem.at/things?w=250&random=people",
      "stars": 3,
      "views": 20,
    }, {
      "id": 2,
      "author": "Vera Vorta",
      "title": "Daltfresh",
      "description": "amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce",
      "img": "https://placem.at/things?w=250&random=2",
      "stars": 4,
      "views": 14,
    }, {
      "id": 3,
      "author": "Yort Mop",
      "title": "Lotlux",
      "description": "tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh",
      "img": "https://placem.at/things?w=250&random=sad",
      "stars": 2,
      "views": 44,
    }, {
      "id": 4,
      "author": "Boom Forta",
      "title": "Ronstring",
      "description": "sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis",
      "img": "https://placem.at/things?w=250&random=happy",
      "stars": 5,
      "views": 55,
    }, {
      "id": 5,
      "author": "Tetro Noper",
      "title": "Matsoft",
      "description": "proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in",
      "img": "https://placem.at/things?w=250&random=smille",
      "stars": 5,
      "views": 120,
    },
    {
      "id": 6,
      "author": "Loper Ior",
      "title": "Veribet",
      "description": "cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque",
      "img": "https://placem.at/things?w=250&random=apple",
      "stars": 3,
      "views": 20,
    }, {
      "id": 7,
      "author": "Vera Vorta",
      "title": "Daltfresh",
      "description": "amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce",
      "img": "https://placem.at/things?w=250&random=bike",
      "stars": 4,
      "views": 14,
    }, {
      "id": 8,
      "author": "Yort Mop",
      "title": "Lotlux",
      "description": "tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh",
      "img": "https://placem.at/things?w=250&random=cat",
      "stars": 2,
      "views": 44,
    }, {
      "id": 9,
      "author": "Boom Forta",
      "title": "Ronstring",
      "description": "sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis",
      "img": "https://placem.at/things?w=250&random=dog",
      "stars": 5,
      "views": 55,
    }, {
      "id": 10,
      "author": "Tetro Noper",
      "title": "Matsoft",
      "description": "proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in",
      "img": "https://placem.at/things?w=250&random=girl",
      "stars": 5,
      "views": 120,
    }]

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
  }, [global.menuState, global.userId, global.currentPage, global.isLogin, loc])

  return (
    <div className="App container">
      <div className='header'>
        {global.isLogin ?
          <AuthMenu currentPage={global.currentPage} menuState={global.menuState}/> :
          <GuestMenu currentPage={global.currentPage} menuState={global.menuState}/>}
      </div>
      {global.isLogin ? (
        <Switch>
          <Route path="/settings" exec component={() => <h1>Settings</h1>}/>
          <Route path="/profile" exec component={() => <h1>Profile</h1>}/>
          <Route path="/createpost" exec component={() => <h1>Create post</h1>}/>
          <Route path="/" exec component={() => <AuthorsPage isLogin={global.isLogin} posts={posts}/>}/>
        </Switch>
      ) : (
        <Switch>
          <Route path="/authors" exec component={() => <AuthorsPage isLogin={global.isLogin} posts={posts}/>}/>
          <Route path="/login" exec component={() => <LogIn currentPage={global.currentPage}/>}/>
          <Route path="/signup" exec component={() => <SignUp currentPage={global.currentPage}/>}/>
          <Route path="/" exec component={GuestHomePage}/>
        </Switch>
      )}
    </div>
  );
}


export default App;

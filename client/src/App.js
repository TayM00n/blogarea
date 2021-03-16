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

  useEffect( ()=>{
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
      const isStorageEmpty = (mObj)=>{
        return mObj.forEach(item => {
          if (getItemFromLocalStore(item.name) === null) setItemToLocalStore(item.name, item.value)
        })
      }
      isStorageEmpty(rdItems)
      console.log(loc.pathname.replace("/",""), global.currentPage)
      loc.pathname.replace("/","") !== global.currentPage && setValueToStore({type:"SET_CURRENT_PAGE_REQUEST", currentPage: loc.pathname.replace("/","")})
      if(global.userId !== getItemFromLocalStore("user_jwt")){
        setValueToStore({type:"SET_JWT_REQUEST", userId: getItemFromLocalStore("user_jwt")})
      }
      if(global.userId.length > 0) {
        global.isLogin !== true && setValueToStore({type: "SET_IS_LOGIN_REQUEST", isLogin: true})
      }
      else {
        global.isLogin !== false &&  setValueToStore({type: "SET_IS_LOGIN_REQUEST", isLogin: false})
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
            <Route path="/settings" exec component={()=><h1>Settings</h1>}/>
            <Route path="/profile" exec component={()=><h1>Profile</h1>}/>
            <Route path="/createpost" exec component={()=><h1>Create post</h1>}/>
            <Route path="/" exec component={AuthorsPage}/>
          </Switch>
        ):(
          <Switch>
            <Route path="/authors" exec component={AuthorsPage}/>
            <Route path="/login" exec component={()=> <LogIn currentPage={global.currentPage}/>}/>
            <Route path="/signup" exec component={()=> <SignUp currentPage={global.currentPage}/>}/>
            <Route path="/" exec component={GuestHomePage}/>
          </Switch>
        )}
    </div>
  );
}



export default App;

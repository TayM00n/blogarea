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
      "date": "2021/01/21 8:42",
    }, {
      "id": 2,
      "author": "Vera Vorta",
      "title": "Daltfresh",
      "description": "amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce",
      "img": "https://placem.at/things?w=250&random=2",
      "stars": 4,
      "views": 14,
      "date": "2021/01/21 8:42",
    }, {
      "id": 3,
      "author": "Yort Mop",
      "title": "Lotlux",
      "description": "tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh",
      "img": "https://placem.at/things?w=250&random=sad",
      "stars": 2,
      "views": 44,
      "date": "2021/01/21 8:42",
    }, {
      "id": 4,
      "author": "Boom Forta",
      "title": "Ronstring",
      "description": "sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis",
      "img": "https://placem.at/things?w=250&random=happy",
      "stars": 5,
      "views": 55,
      "date": "2021/01/21 8:42",
    }, {
      "id": 5,
      "author": "Tetro Noper",
      "title": "Matsoft",
      "description": "proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in",
      "img": "https://placem.at/things?w=250&random=smille",
      "stars": 5,
      "views": 120,
      "date": "2021/01/21 8:42",
    },
    {
      "id": 6,
      "author": "Loper Ior",
      "title": "Veribet",
      "description": "cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque",
      "img": "https://placem.at/things?w=250&random=apple",
      "stars": 3,
      "views": 20,
      "date": "2021/01/21 8:42",
    }, {
      "id": 7,
      "author": "Vera Vorta",
      "title": "Daltfresh",
      "description": "amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce",
      "img": "https://placem.at/things?w=250&random=bike",
      "stars": 4,
      "views": 14,
      "date": "2021/01/21 8:42",
    }, {
      "id": 8,
      "author": "Yort Mop",
      "title": "Lotlux",
      "description": "tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh",
      "img": "https://placem.at/things?w=250&random=cat",
      "stars": 2,
      "views": 44,
      "date": "2020/01/11 8:42",
    }, {
      "id": 9,
      "author": "Boom Forta",
      "title": "Ronstring",
      "description": "sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis",
      "img": "https://placem.at/things?w=250&random=dog",
      "stars": 5,
      "views": 55,
      "date": "2021/02/4 18:40",
    }, {
      "id": 10,
      "author": "Tetro Noper",
      "title": "Matsoft",
      "description": "proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in",
      "img": "https://placem.at/things?w=250&random=girl",
      "stars": 5,
      "views": 120,
      "date": "2021/01/11 8:42",
    }]

  const users = [
    {
      "id": "GfOANm",
      "firstName": "Alexie",
      "lastName": "Hoeger",
      "title": "Dynamic Integration Associate",
      "jobTitle": "Senior Integration Planner",
      "avatar": "https://placem.at/things?w=50&h=50&random=1",
      "age": 36,
      "country": "Djibouti",
      "email": "alexie.hoeger@cfeo.io",
      "phone": "634-774-7523",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "MYXpyK",
      "firstName": "Rosario",
      "lastName": "Tillman",
      "title": "Internal Tactics Designer",
      "jobTitle": "Chief Program Administrator",
      "avatar": "https://placem.at/things?w=50&h=50&random=2",
      "age": 65,
      "country": "Maldives",
      "email": "rosario.tillman@cfeo.io",
      "phone": "990-509-6928",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "waQ3ID",
      "firstName": "Vince",
      "lastName": "Romaguera",
      "title": "Dynamic Division Facilitator",
      "jobTitle": "Dynamic Branding Agent",
      "avatar": "https://placem.at/things?w=50&h=50&random=3",
      "age": 21,
      "country": "Myanmar",
      "email": "vince.romaguera@cfeo.io",
      "phone": "535-557-3554",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "aPzVVW",
      "firstName": "Delphine",
      "lastName": "McDermott",
      "title": "Product Accountability Agent",
      "jobTitle": "Global Identity Technician",
      "avatar": "https://placem.at/things?w=50&h=50&random=4",
      "age": 77,
      "country": "Thailand",
      "email": "delphine.mcdermott@cfeo.io",
      "phone": "897-387-5681",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "nK8rsQ",
      "firstName": "Christy",
      "lastName": "Beahan",
      "title": "Direct Paradigm Developer",
      "jobTitle": "Forward Mobility Producer",
      "avatar": "https://placem.at/things?w=50&h=50&random=5",
      "age": 36,
      "country": "Iraq",
      "email": "christy.beahan@cfeo.io",
      "phone": "300-793-3494",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "GIylBH",
      "firstName": "Torrey",
      "lastName": "Torphy",
      "title": "Direct Functionality Facilitator",
      "jobTitle": "Dynamic Identity Director",
      "avatar": "https://placem.at/things?w=50&h=50&random=6",
      "age": 73,
      "country": "France",
      "email": "torrey.torphy@cfeo.io",
      "phone": "944-784-5805",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "iPg0nZ",
      "firstName": "Austen",
      "lastName": "Kovacek",
      "title": "Central Solutions Analyst",
      "jobTitle": "Investor Communications Liaison",
      "avatar": "https://placem.at/things?w=50&h=50&random=7",
      "age": 34,
      "country": "Bosnia and Herzegovina",
      "email": "austen.kovacek@cfeo.io",
      "phone": "428-972-2615",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "NNvP08",
      "firstName": "Magali",
      "lastName": "Gibson",
      "title": "Lead Identity Orchestrator",
      "jobTitle": "Global Integration Producer",
      "avatar": "https://placem.at/things?w=50&h=50&random=8",
      "age": 23,
      "country": "Jordan",
      "email": "magali.gibson@cfeo.io",
      "phone": "322-834-9909",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "XusUFV",
      "firstName": "Ryley",
      "lastName": "Flatley",
      "title": "District Creative Consultant",
      "jobTitle": "Dynamic Markets Associate",
      "avatar": "https://placem.at/things?w=50&h=50&random=9",
      "age": 52,
      "country": "Albania",
      "email": "ryley.flatley@cfeo.io",
      "phone": "722-287-1248",
      "like": 52,
      "dislike": 52
    },
    {
      "id": "vS9ltR",
      "firstName": "Anais",
      "lastName": "Oberbrunner",
      "title": "Human Creative Developer",
      "jobTitle": "Chief Implementation Administrator",
      "avatar": "https://placem.at/things?w=50&h=50&random=10",
      "age": 73,
      "country": "American Samoa",
      "email": "anais.oberbrunner@cfeo.io",
      "phone": "570-740-9173",
      "like": 52,
      "dislike": 52
    }
  ]

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
          <Route path="/" exec component={() => <AuthorsPage isLogin={global.isLogin} posts={posts} users={users}/>}/>
        </Switch>
      ) : (
        <Switch>
          <Route path="/authors" exec component={() => <AuthorsPage isLogin={global.isLogin} posts={posts} users={users}/>}/>
          <Route path="/login" exec component={() => <LogIn currentPage={global.currentPage}/>}/>
          <Route path="/signup" exec component={() => <SignUp currentPage={global.currentPage}/>}/>
          <Route path="/" exec component={GuestHomePage}/>
        </Switch>
      )}
    </div>
  );
}


export default App;

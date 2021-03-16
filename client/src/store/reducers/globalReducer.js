import TYPES from "../TYPES";

const initState = {
  currentPage: "",
  menuState: "show",
  userId: "",
  isLogin: false,
  typeOfStorage: ""
}

const globalReducer = (state = initState, action) => {
  console.log("STATE: ",state, "ACTION: ", action)
  switch (action.type){
    case TYPES.SET_JWT:{
      return {
        ...state,
        userId: action.userId
      }
    }
    case TYPES.SET_JWT_SAGA:{
      return state
    }
    case TYPES.SET_CURRENT_PAGE:{
      return{
        ...state,
        currentPage: action.currentPage
      }
    }
    case TYPES.SET_CURRENT_PAGE_SAGA:{
      return state
    }
    case TYPES.SET_MENU_STATE:{
      return {
        ...state,
        menuState: action.menuState
      }
    }
    case TYPES.SET_MENU_STATE_SAGA:{
      return state
    }
    case TYPES.SET_IS_LOGIN:{
      return {
        ...state,
        isLogin: action.isLogin
      }
    }
    case TYPES.SET_IS_LOGIN_SAGA:{
      return state
    }
    case TYPES.SET_TYPE_OF_STORAGE:{
      return {
        ...state,
        typeOfStorage: action.typeOfStorage
      }
    }
    case TYPES.SET_TYPE_OF_STORAGE_SAGA:{
      return state
    }
    default: return state
  }
}

export default globalReducer
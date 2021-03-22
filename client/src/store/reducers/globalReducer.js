import TYPES from "../TYPES";

const initState = {
  currentPage: "",
  menuState: "show",
  userId: "",
  isLogin: false,
  typeOfStorage: "",
  windowSize: {width: window.innerWidth, height: window.innerHeight}
}

const globalReducer = (state = initState, action) => {
  //console.log("STATE: ",state, "ACTION: ", action)
  switch (action.type){
    case TYPES.SET_WINDOW_SIZE:{
      return {
        ...state,
        windowSize: action.windowSize
      }
    }
    case TYPES.SET_JWT:{
      return {
        ...state,
        userId: action.userId
      }
    }
    case TYPES.SET_CURRENT_PAGE:{
      return{
        ...state,
        currentPage: action.currentPage
      }
    }
    case TYPES.SET_MENU_STATE:{
      return {
        ...state,
        menuState: action.menuState
      }
    }
    case TYPES.SET_IS_LOGIN:{
      return {
        ...state,
        isLogin: action.isLogin
      }
    }
    case TYPES.SET_TYPE_OF_STORAGE:{
      return {
        ...state,
        typeOfStorage: action.typeOfStorage
      }
    }
    default: return state
  }
}

export default globalReducer
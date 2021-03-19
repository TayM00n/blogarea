import TYPES from "../TYPES";

const initState = {
  modeView: {posts: "All posts", users: "All users"}
}

const authorReducer = (state = initState, action)=>{
  console.log("STATE: ", state, "\nACTION: ", action)
  switch (action.type){
    case TYPES.AUTHORSTYPES.SET_MODE_VIEW:{
      return{...state, modeView: action.modeView}
    }
    case TYPES.AUTHORSTYPES.SET_MODE_VIEW_SAGA:{
      return state
    }
    default: return  state
  }
}

export default authorReducer
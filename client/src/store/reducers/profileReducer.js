import TYPES from "../TYPES";

const initState = {
  countPostsView: 25,
  currentPostsPage: 1
}

const profileReducer = (state = initState, action)=>{
  switch (action.type){
    case TYPES.PROFILE.SET_COUNT_POSTS_VIEW:{
      return {...state, countPostsView: action.countPostsView}
    }
    case TYPES.PROFILE.SET_CURRENT_POSTS_PAGE:{
      return {...state, currentPostsPage: action.currentPagePostsUsers}
    }
    default: return state
  }
}

export default profileReducer
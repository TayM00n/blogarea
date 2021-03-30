import TYPES from "../TYPES";

const initState = {
  modeView: {posts: "All posts", users: "All users"},
  countView: {posts: 25, users: 25},
  currentPagePostsUsers: {posts: 1, users: 1},
  postsView: [],
  usersView: []
}

const authorReducer = (state = initState, action) => {
  //console.log("STATE: ", state, "\nACTION: ", action)
  switch (action.type) {
    case TYPES.AUTHORSTYPES.SET_MODE_VIEW:
      return {...state, modeView: action.modeView}
    case TYPES.AUTHORSTYPES.SET_COUNT_VIEW:
      return {...state, countView: action.countView}
    case TYPES.AUTHORSTYPES.SET_CURRENT_PAGE_USERS_POSTS:
      return {...state, currentPagePostsUsers: action.currentPagePostsUsers}
    case TYPES.AUTHORSTYPES.SET_POSTS_VIEW: {
      return {
        ...state,
        postsView: action.postsView
      }
    }
    case TYPES.AUTHORSTYPES.SET_USERS_VIEW:
      return {...state, usersView: action.usersView}
    default:
      return state
  }
}

export default authorReducer
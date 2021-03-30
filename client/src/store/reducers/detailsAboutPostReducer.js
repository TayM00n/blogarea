import TYPES from "../TYPES";

const initState = {
  currentPageComments: 1,
  commentsView: []
}

const detailsAboutPostReducer = (state = initState, action)=>{
  switch (action.type){
    case TYPES.DETAILSABOUTPOST.SET_CURRENT_PAGE_COMMENTS:{
      return {
        ...state,
        currentPageComments: action.currentPageComments
      }
    }
    case TYPES.DETAILSABOUTPOST.SET_COMMENTS_VIEW:{
      return {
        ...state,
        commentsView: action.commentsView
      }
    }
    default: return state
  }
}

export default detailsAboutPostReducer
import TYPES from "../TYPES";

export const setJWT = (userId) => ({
  type: TYPES.SET_JWT,
  userId
})

export const setCurrentPage = (currentPage)=>({
  type: TYPES.SET_CURRENT_PAGE,
  currentPage
})

export const setMenuState = (menuState)=>({
  type: TYPES.SET_MENU_STATE,
  menuState
})

export const setIsLogin = (isLogin) => ({
  type: TYPES.SET_IS_LOGIN,
  isLogin
})

export const setTypeOfStorage = typeOfStorage => ({
  type: TYPES.SET_TYPE_OF_STORAGE,
  typeOfStorage
})

export const setModeView = modeView => ({
  type: TYPES.AUTHORSTYPES.SET_MODE_VIEW,
  modeView
})

export const setCountView = countView => ({
  type: TYPES.AUTHORSTYPES.SET_COUNT_VIEW,
  countView
})

export const setCurrentPagePostsUsers = currentPagePostsUsers => ({
  type: TYPES.AUTHORSTYPES.SET_CURRENT_PAGE_USERS_POSTS,
  currentPagePostsUsers
})
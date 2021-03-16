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
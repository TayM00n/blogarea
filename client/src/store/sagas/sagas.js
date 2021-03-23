import {put, takeEvery} from "redux-saga/effects"
import {
  setCountPostsView,
  setCountView,
  setCurrentPage, setCurrentPagePostsUsers, setCurrentPostsPage,
  setIsLogin,
  setJWT,
  setMenuState,
  setModeView, setPostsView,
  setTypeOfStorage, setUsersView, setWindowSize
} from "../actions";

function* grSetWindowSize(action){
  yield put(setWindowSize(action.windowSize))
}

function* grSetJWT(action) {
  yield put(setJWT(action.userId))
}

function* grSetCurrentPage(action) {
  yield put(setCurrentPage(action.currentPage))
}

function* grSetMenuState(action) {
  yield put(setMenuState(action.menuState))
}

function* grSetIsLogin(action) {
  yield put(setIsLogin(action.isLogin))
}

function* grSetTypeOfStorage(action) {
  yield put(setTypeOfStorage(action.typeOfStorage))
}

function* grSetModeView(action) {
  yield put(setModeView(action.modeView))
}

function* grSetCountView(action) {
  yield put(setCountView(action.countView))
}

function* grSetCurrentPagePostsUsers(action) {
  yield put(setCurrentPagePostsUsers(action.currentPagePostsUsers))
}

function* grSetPostsView(action) {
  yield put(setPostsView(action.postsView))
}

function* grSetUsersView(action) {
  yield put(setUsersView(action.usersView))
}

function* grSetCurrentPostsPage(action) {
  yield put(setCurrentPostsPage(action.currentPostsPage))
}

function* grSetCountPostsView(action) {
  yield put(setCountPostsView(action.countPostsView))
}

function* mySaga() {
  yield takeEvery("SET_JWT_REQUEST", grSetJWT)
  yield takeEvery("SET_CURRENT_PAGE_REQUEST", grSetCurrentPage)
  yield takeEvery("SET_MENU_STATE_REQUEST", grSetMenuState)
  yield takeEvery("SET_IS_LOGIN_REQUEST", grSetIsLogin)
  yield takeEvery("SET_TYPE_OF_STORAGE_REQUEST", grSetTypeOfStorage)
  yield takeEvery("SET_MODE_VIEW_REQUEST", grSetModeView)
  yield takeEvery("SET_COUNT_VIEW_REQUEST", grSetCountView)
  yield takeEvery("SET_CURRENT_PAGE_USERS_POSTS_REQUEST", grSetCurrentPagePostsUsers)
  yield takeEvery("SET_POSTS_VIEW_REQUEST", grSetPostsView)
  yield takeEvery("SET_USERS_VIEW_REQUEST", grSetUsersView)
  yield takeEvery("SET_WINDOW_SIZE_REQUEST", grSetWindowSize)
  yield takeEvery("SET_CURRENT_POSTS_PAGE_REQUEST", grSetCurrentPostsPage)
  yield takeEvery("SET_COUNT_POSTS_VIEW_REQUEST", grSetCountPostsView)
}

export default mySaga
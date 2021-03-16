import {put, takeEvery} from "redux-saga/effects"
import {setCurrentPage, setIsLogin, setJWT, setMenuState, setTypeOfStorage} from "../actions";

function* grSetJWT(action) {
  yield put(setJWT(action.userId))
}

function* grSetCurrentPage(action){
  yield put(setCurrentPage(action.currentPage))
}

function* grSetMenuState(action){
  yield put(setMenuState(action.menuState))
}
function* grSetIsLogin(action){
  yield put(setIsLogin(action.isLogin))
}

function* grSetTypeOfStorage(action){
  yield put(setTypeOfStorage(action.typeOfStorage))
}

function* mySaga() {
  yield takeEvery("SET_JWT_REQUEST", grSetJWT)
  yield takeEvery("SET_CURRENT_PAGE_REQUEST", grSetCurrentPage)
  yield takeEvery("SET_MENU_STATE_REQUEST", grSetMenuState)
  yield takeEvery("SET_IS_LOGIN_REQUEST", grSetIsLogin)
  yield takeEvery("SET_TYPE_OF_STORAGE_REQUEST", grSetTypeOfStorage)
}

/*
function* mySaga() {
  yield takeLatest("SET_JWT", setJWTSaga);
}*/

export default mySaga
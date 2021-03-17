import globalReducer from "./globalReducer"
import {combineReducers} from "redux";

const rootReducer = combineReducers({globalReducer})

export default rootReducer
import globalReducer from "./globalReducer"
import authorReducer from "./authorsReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({globalReducer, authorReducer})

export default rootReducer
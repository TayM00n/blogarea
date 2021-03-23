import globalReducer from "./globalReducer"
import authorReducer from "./authorsReducer";
import profileReducer from "./profileReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({globalReducer, authorReducer, profileReducer})

export default rootReducer
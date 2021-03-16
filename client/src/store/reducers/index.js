import homePageReducer from "./homePageReducer";
import globalReducer from "./globalReducer"
import {combineReducers} from "redux";

const rootReducer = combineReducers({homePageReducer, globalReducer})

export default rootReducer
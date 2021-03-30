import globalReducer from "./globalReducer"
import authorReducer from "./authorsReducer";
import profileReducer from "./profileReducer";
import detailsAboutPostReducer from "./detailsAboutPostReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({globalReducer, authorReducer, profileReducer, detailsAboutPostReducer})

export default rootReducer
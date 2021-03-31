import { combineReducers } from "redux";
import filterReducer from "./filterReducer";
import recordReducer from "./recordReducer";

const rootReducer = combineReducers({
    recordState: recordReducer,
    filterState: filterReducer,
});

export default rootReducer;
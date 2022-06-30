import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import layoutReducer from "./layout/layoutReducer";
import messageReducer from "./message/messageReducer";

export default combineReducers({
    userReducer,
    layoutReducer,
    messageReducer,
});

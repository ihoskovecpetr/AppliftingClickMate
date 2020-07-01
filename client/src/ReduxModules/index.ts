import { combineReducers } from "redux";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
  app_reducer: appReducer,
});

export default rootReducer;

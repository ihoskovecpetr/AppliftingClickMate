import { createStore, applyMiddleware, combineReducers } from "redux";
import rootReducer from "./ReduxModules";
import * as thunk from "redux-thunk";

const logger = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

export const reducerCombined = combineReducers({
  rootReducer: rootReducer,
});

export type AppState = ReturnType<typeof reducerCombined>;

export const createAppStore = () =>
  createStore(reducerCombined, applyMiddleware(thunk.default, logger));

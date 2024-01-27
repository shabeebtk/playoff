import { combineReducers, legacy_createStore as createStore } from "redux";
import userAuthReducer from "../reducer/userAuthReducer";
import ownerAuthReducer from "../reducer/ownerAuthReducer";
import onwerTurfReducer from "../reducer/ownerTurfReducer";

export const rootReducer = combineReducers({
    userAuth : userAuthReducer,
    ownerAuth : ownerAuthReducer,
    ownerTurf : onwerTurfReducer,
})

const store = createStore(rootReducer)

export default store;

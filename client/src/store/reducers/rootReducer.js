import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import tarjetaReducer from "./tarjetaReducer";
import filterReducer from "./filterReducer";

export default combineReducers({
  users: usersReducer,
  error: errorReducer,
  auth: authReducer,
  tarjetas: tarjetaReducer,
  filters: filterReducer,
});

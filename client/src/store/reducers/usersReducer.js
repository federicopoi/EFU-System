import {
  GET_USERS,
  USERS_LOADING,
  UPDATE_SUCCESS,
  BORRAR_USER,
} from "../actions/types";
const initState = {
  users: [],
  loading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case BORRAR_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SUCCESS:
      return Object.assign({}, state, {
        users: state.users
          .filter((user) => {
            return user.name !== action.payload.name; //delete matched data
          })
          .concat(action.payload), //concats new data
      });

    default:
      return state;
  }
}

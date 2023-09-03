import { AUTHORIZATION } from "./actions";

const initialState = {
  login: null,
};

const authReducer = (state = initialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case AUTHORIZATION:
      return {
        ...state,
        authentication: action.authentication,
        login: action.login,
      };

    default:
      return state;
  }
};

export default authReducer;

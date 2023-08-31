import { AUTHORIZATION } from "./actions";

const initialState = {
  authentication: null,
  login: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION:
      return {
        ...state,
        authentication: action.authentication,
        login: action.login,
        token: action.token
      };

    default:
      return state;
  }
};

export default authReducer;

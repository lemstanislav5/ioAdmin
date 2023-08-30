import { AUTHORIZATION } from "./actions";

const initialState = {
  authentication: null,
  login: null,
  token: null,
};

const counterReducer = (state = initialState, action) => {
  console.log(action)
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

export default counterReducer;

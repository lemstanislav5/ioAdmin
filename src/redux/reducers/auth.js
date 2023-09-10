import { AUTHORIZATION } from "../actions";

const initialState = {
  login: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION:
      return {
        ...state,
        login: action.login,
      };

    default:
      return state;
  }
};

export default auth;

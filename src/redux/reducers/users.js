import { GET_USERS } from "../actions";

const initialState = {
  users: [],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users};
    default:
      return state;
  }
};

export default users;

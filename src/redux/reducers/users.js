import { GET_USERS, SET_CURRENT_UESR } from "../actions";

const initialState = {
  users: [],
  currentUser: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, users: action.users};
    case SET_CURRENT_UESR:
      return {...state, currentUser: action.currentUser};
    default:
      return state;
  }
};

export default users;

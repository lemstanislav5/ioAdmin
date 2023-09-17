import { GET_USERS } from "../actions";

const initialState = {
  users: [],
};

const users = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case ADD_MESSAGES:
      return {...state, users: action.users};
    default:
      return state;
  }
};

export default users;

import { ADD_MESSAGES } from "../actions";

const initialState = {
  messages: [],
};

const messages = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case ADD_MESSAGES:
      return {...state, message: action.message};
    default:
      return state;
  }
};

export default messages;

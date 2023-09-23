import { GET_MESSAGES } from "../actions";

const initialState = {
  messages: [],
};

const messages = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case GET_MESSAGES:
      return {...state, messages: action.messages};
    default:
      return state;
  }
};

export default messages;

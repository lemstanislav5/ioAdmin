import { GET_MESSAGES, ADD_MESSAGE } from "../actions";

const initialState = {
  messages: [],
};

const messages = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case GET_MESSAGES:
      return {...state, messages: action.messages};
    case ADD_MESSAGE:
      return {...state, messages: [...state.messages, action.message]};
    default:
      return state;
  }
};

export default messages;

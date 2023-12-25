import { GET_MESSAGES, ADD_MESSAGE, READ_MESSAGES } from "../actions";

const initialState = [];

const messages = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    case ADD_MESSAGE:
      return [...state, action.message];
    case READ_MESSAGES:
      return [...state.map(item => {
        if (action.chatId === item.chatId) return {...item, read: 1};
        return item;
      })]
    default:
      return state;
  }
};

export default messages;

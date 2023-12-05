import { GET_USERS, SET_CURRENT_UESR, USER_ONLINE, USER_OFFLINE } from "../actions";

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
    case USER_ONLINE:
      return {...state, users: state.users.map(item => {
        if(item.chatId === action.chatId) {
          return {...item, online: 1};
        } else {
          return item;
        }
      })};
    case USER_OFFLINE:
      return {...state, users: state.users.map(item => {
        if(item.chatId === action.chatId) {
          return {...item, online: 0};
        } else {
          return item;
        }
      })};
    default:
      return state;
  }
};

export default users;

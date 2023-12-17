import { GET_USERS, SET_CURRENT_UESR, USER_ONLINE, USER_OFFLINE } from "../actions";

const initialState = {
  usersList: [],
  currentUser: null,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {...state, usersList: action.users};
    case SET_CURRENT_UESR:
      return {...state, currentUser: action.currentUser};
    case USER_ONLINE:
      return {...state, usersList: state.usersList.map(item => {
        if(item.chatId === action.chatId) {
          return {...item, online: 1};
        } else {
          return item;
        }
      })};
    case USER_OFFLINE:
      return {...state, usersList: state.usersList.map(item => {
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

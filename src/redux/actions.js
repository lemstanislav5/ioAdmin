export const AUTHORIZATION = 'AUTHORIZATION';
export const GET_MESSAGES = 'GET_MESSAGES';
export const GET_USERS = 'GET_USERS';
export const SET_CURRENT_UESR = 'SET_CURRENT_UESR';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const USER_ONLINE = 'USER_ONLINE';
export const USER_OFFLINE = 'USER_OFFLINE';
export const READ_MESSAGES = 'READ_MESSAGES';

export const readMessages = chatId => {
  return {
    type: READ_MESSAGES,
    chatId,
  }
}

export const addUserOffline = chatId => {
  return {
    type: USER_OFFLINE,
    chatId,
  }
}

export const addUserOnline = chatId => {
  return {
    type: USER_ONLINE,
    chatId,
  }
}

export const addMessageCreator = message => {
  return {
    type: ADD_MESSAGE,
    message,
  }
}

export const currentUserCreator = chatId => {
  return {
    type: SET_CURRENT_UESR,
    currentUser: chatId,
  }
}

export const authenticationActionCreator = (login) => {
  return {
    type: AUTHORIZATION,
    login,
  };
};

export const massagesActionCreator = (messages) => {
  return {
    type: GET_MESSAGES,
    messages,
  };
};

export const usersActionCreator = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

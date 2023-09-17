export const AUTHORIZATION = 'AUTHORIZATION';
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const GET_USERS = 'GET_USERS';

export const authenticationActionCreator = (login) => {
  return {
    type: AUTHORIZATION,
    login,
  };
};

export const massagesActionCreator = (massage) => {
  return {
    type: ADD_MESSAGES,
    massage,
  };
};

export const usersActionCreator = (users) => {
  return {
    type: ADD_MESSAGES,
    users,
  };
};
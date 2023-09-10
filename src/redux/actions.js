export const AUTHORIZATION = 'AUTHORIZATION';
export const ADD_MESSAGES = 'ADD_MESSAGES';


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
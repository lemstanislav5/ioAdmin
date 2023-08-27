export const AUTHORIZATION = 'AUTHORIZATION';

export const authenticationActionCreator = (value) => {
  return {
    type: AUTHORIZATION,
    token: null,
    login: null,
  };
};
export const AUTHORIZATION = 'AUTHORIZATION';

export const authenticationActionCreator = (token, login) => {
  return {
    type: AUTHORIZATION,
    token,
    login,
  };
};
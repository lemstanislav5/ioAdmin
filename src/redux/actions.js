export const AUTHORIZATION = 'AUTHORIZATION';

export const authenticationActionCreator = (login) => {
  return {
    type: AUTHORIZATION,
    login,
  };
};
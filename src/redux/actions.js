export const AUTHORIZATION = 'AUTHORIZATION';

export const initiationActionCreator = (value) => {
  return {
    type: AUTHORIZATION,
    initiation: value
  };
};
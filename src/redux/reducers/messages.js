import { ADD_MESSAGES } from "../actions";

const initialState = {
  massages: [],
};

const massages = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case ADD_MESSAGES:
      return {...state, massage: action.massage};
    default:
      return state;
  }
};

export default massages;

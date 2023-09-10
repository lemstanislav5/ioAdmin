import { ADD_MESSAGES } from "./actions";

const initialState = {
  massages: [],
};

const massagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGES:
      return [...state, action.massage];
    default:
      return state;
  }
};

export default massagesReducer;

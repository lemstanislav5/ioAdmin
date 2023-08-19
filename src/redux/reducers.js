import {AUTHORIZATION} from './actions';


const initialState = {
  initiation: false,
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION:
      return {
        ...state,
        authorization: action.value
      };

    default:
      return state;
  }
};

export default counterReducer;
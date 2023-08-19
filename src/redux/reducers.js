import {AUTHORIZATION} from './actions';


const initialState = {
  initiation: null,
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZATION:
      return {
        ...state,
        initiation: action.value
      };

    default:
      return state;
  }
};

export default counterReducer;
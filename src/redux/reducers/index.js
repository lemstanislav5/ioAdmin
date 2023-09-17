import { combineReducers } from 'redux';
import auth from './auth'
import messages from './messages'
import users from './users'

export const rootReducer = combineReducers({
  auth,
  messages,
  users,
});
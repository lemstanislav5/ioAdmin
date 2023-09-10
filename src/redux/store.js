import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import massagesReducer from './messagesReducer'

export default configureStore({
  reducer: {
    auth: authReducer,
    massages: massagesReducer,
  },
})
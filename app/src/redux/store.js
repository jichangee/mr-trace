import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import index from './reducers'

const allReducer = combineReducers({
  index
})

export default createStore(allReducer, applyMiddleware(thunk))
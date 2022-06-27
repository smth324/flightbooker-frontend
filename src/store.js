import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import adminReducer from './reducers/adminReducer'

const staticReducers = {
  notification: notificationReducer,
  admin: adminReducer,
}

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  })
}

function configureStore() {
  const newStore = createStore(createReducer(), composeWithDevTools(applyMiddleware(thunk)))
  newStore.asyncReducers = {}
  newStore.injectReducer = (key, asyncReducer) => {
    newStore.asyncReducers[key] = asyncReducer
    newStore.replaceReducer(createReducer(newStore.asyncReducers))
  }

  return newStore
}

const store = configureStore()
export default store

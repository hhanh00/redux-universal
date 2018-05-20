// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createSelector } from 'reselect'

import { reducer as counterReducer } from './reducers/counter'
import Counter from './components/counter'

const reducers = combineReducers({
    counter: counterReducer,
})
const store = createStore(reducers, window.__INITIAL_STATE__, composeWithDevTools(applyMiddleware(thunk)))
  
ReactDOM.render(
    <Provider store={store}>
        <Counter />
    </Provider>
  , document.getElementById('app'))
  
 
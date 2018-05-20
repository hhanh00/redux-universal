// @flow

import React from 'react'
import { connect } from 'react-redux'
import { inc } from '../reducers/counter'

const CounterView = props => <div>
    {props.counter}
    <button onClick={props.onClick}>Inc</button>
    </div>

const Counter = connect(
    state => ({
        counter: state.counter
    }),
    dispatch => ({
        onClick: () => dispatch(inc)
    })
)(CounterView)

export default Counter

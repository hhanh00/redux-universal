// @flow

import React from 'react'

export const reducer = (state: * = null, action: *) => {
    switch (action.type) {
        case 'SET': 
            return action.counter
    }
    return state
}

export const inc = async (dispatch: *, getState: *) => {
    const state = getState()
    const c = state.counter
    await fetch(`/counter?v=${c}`, {
        method: 'POST'
    })
    dispatch({type: 'SET', counter: c+1})
}

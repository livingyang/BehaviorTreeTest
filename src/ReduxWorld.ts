import * as redux from 'redux';

function counter(state = 0, action: any) {
    console.log(action);
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

redux.createStore(counter);
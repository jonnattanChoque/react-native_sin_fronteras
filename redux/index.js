const { createStore, combineReducers } = require('redux')

//EXAMPLE 1
// const INCREMENTAR = 'incrementar'
// const DECREMENTAR = 'decrementar'
// const initialState = 0
// const incrementar = () => ({type: INCREMENTAR})
// const decrementar = () => ({type: DECREMENTAR})

// const contador = (state = initialState, action) => {
//     switch (action.type) {
//         case INCREMENTAR:
//             return state + 1
//         case DECREMENTAR:
//             return state - 1
//         default:
//             return state
//     }
// }

// const store = createStore(contador)
// store.subscribe(() => console.log(store.getState()))
// store.dispatch(incrementar())
// store.dispatch(decrementar())
// store.dispatch(incrementar())
// store.dispatch(incrementar())
// store.dispatch(incrementar())


//EXAMPLE 2
const filter = {
    all: 'ALL',
    completed: 'COMPLETED',
    incompleted: 'INCOMPLETED'
}
const SET_FILTER = 'SET_FILTER'
const ADD_TODO = 'ADD_TODO'
const COMPLETE_TODO = 'COMPLETE_TODO'

const setfilter = payload => ({type: SET_FILTER, payload})
const addTodo = payload => ({type: ADD_TODO, payload})
const completeTodo = payload => ({type: COMPLETE_TODO, payload})

const initialState = {
    todos: [],
    filter: filter.all,
}
const filterReducer = (state = filter.all, action) => {
    switch (action.type) {
        case SET_FILTER:
            return action.payload
        default:
            return state
    }
}
const todosReducer = (state = filter.all, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [action.payload].concat(state)
        case COMPLETE_TODO:
            return state.map((x, i) => i === action.payload ? {...x, complete: true} : x)
        default:
            return state
    }
}
const reducer = combineReducers({
    filter: filterReducer,
    todos: todosReducer
})

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))

store.dispatch(addTodo({text: 'Primer todo'}))
store.dispatch(setfilter(filter.completed))

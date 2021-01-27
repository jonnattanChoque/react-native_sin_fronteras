const makeType = mod => type => `${mod}/${type}`

const t = makeType('LISTA')

// makeActionCreator
const mac = (type, ...argNames) => (...args) => {
    const action = {type}
    argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index]
    })
    return action
}

// opción 1
// const ADD_TODO = t('ADD_TODO')
// const REMOVE_TODO = t('REMOVE_TODO')
// const UPDATE_TODO = t('UPDATE_TODO')

// const addTodo = mac(ADD_TODO, 'payload')
// const removeTodo = mac(REMOVE_TODO, 'payload')
// const updateTodo = mac(UPDATE_TODO, 'payload')

// console.log(addTodo(1))
//console.log(addTodo({title: 'Soy un titulo'}))


// opción 2
const createReducer = (IS, handlers) =>
    (state = IS, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        }else{
            return state
        }
    }

const fetchReducerCreator = resource => {
    const t = makeType(resource)
    const FETCH_START = t('fetch-start')
    const FETCH_SUCCESS = t('fetch-success')
    const FETCH_ERROR = t('fetch-error')

    const initialState = {
        data: [],
        fetched: false,
        fetching: false,
    }

    const fetchStartReduce = (state) => ({ ...state, fetching: true })
    const fetchSuccessReduce = (state, action) => ({ ...state, fetching: false, fetched: true, data: action.payload })
    const fetchErrorReduce = (state, action) => ({ ...state, fetching: false, error: action.error })

    const reducer = createReducer(initialState, {
        [FETCH_START]: fetchStartReduce,
        [FETCH_SUCCESS]: fetchSuccessReduce ,
        [FETCH_ERROR]: fetchErrorReduce
    })

    const startFetch = mac(FETCH_START)
    const successFetch = mac(FETCH_SUCCESS, 'payload')
    const errorFetch = mac(FETCH_ERROR, 'error')

    return {
        reducer,
        fetch = () => 
            async (dispatch) => {
                dispatch(startFetch())

                try {
                    const response = await fetch(`/${resource}`)
                    const data = await response.json()
                    dispatch(successFetch(data))
                } catch(e) {
                    dispatch(errorFetch(e))
                }
            }
    }

}

const createReducer = fetchReducerCreator('todos')
export default createReducer.reducer
export const fetch = createReducer.fetch

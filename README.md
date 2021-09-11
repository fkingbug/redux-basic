# redux

Создание store (создаем папочку store и в ней index.js)

index.js :

- подключаем Provider из react-redux
- создаем store (store/index.js)
- оборачиваем App в Provider и задаем store

```javascript
import { Provider } from 'react-redux'

import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

---

store :

- combineReducers - если есть несколько редьюсеров то их нужно объеденить
- rootReducer - создаем рут редьюсер
- store - createStore(rootReducer, composeWithDevTools()) создание стора
- composeWithDevTools - подключает devtools хрома

```javascript
import { createStore, combineReducers } from 'redux'
import { cashReducer } from './cashReducer'
import { customerReducer } from './customerReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  cash: cashReducer,
  customers: customerReducer,
})
// const rootReducer = combineReducers({
//   cashReducer,  тогда название редьюсера и обращение к нему будут одинаковы
//   customerReducer,
// })

export const store = createStore(rootReducer, composeWithDevTools())
```

customerReducer :

```javascript
const defaultState = {
  customers: [],
}

const ADD_CASTOMER = 'ADD_CASTOMER'
const REMOVE_CASTOMER = 'REMOVE_CASTOMER'

export const customerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CASTOMER:
      return { ...state, customers: [...state.customers, action.payload] }
    case REMOVE_CASTOMER:
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload),
      }
    default:
      return state
  }
}
```

cashReducer :

```javascript
const defaultState = {
  cash: 0,
}
export const cashReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_CASH':
      return { ...state, cash: state.cash + action.payload }
    case 'GET_CASH':
      return { ...state, cash: state.cash - action.payload }
    default:
      return state
  }
}
```

работа с редьюсеров

```javascript
const dispatch = useDispatch()
const cash = useSelector(state => state.cash.cash)
const customers = useSelector(state => state.customers.customers)

const addCash = cash => {
  dispatch({ type: 'ADD_CASH', payload: cash })
}
const getCash = cash => {
  dispatch({ type: 'GET_CASH', payload: cash })
}
const addCustomer = name => {
  const customer = {
    name,
    id: Date.now(),
  }
  //dispatch({ type: 'ADD_CASTOMER', payload: customer })
  dispatch(addCustomerAction(customer))
}
const removeCustomer = customer => {
  // dispatch({ type: 'REMOVE_CASTOMER', payload: customer.id })
  dispatch(removeCustomerAction(customer.id))
}
```

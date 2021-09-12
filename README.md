# redux

npm i redux react-redux
npm i redux-devtools-extension - девтулзы
npm i redux-thunk - мидВееер для асинхронных запросов
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

action creator - функция которая принимает в себя значения и возвращает объект action(a)
action - обычный js объект с типом

```javascript
export const addCustomerAction = payload => ({ type: ADD_CASTOMER, payload })
export const removeCustomerAction = payload => ({ type: REMOVE_CASTOMER, payload })

//В app - диспатч выглядит так , вызываем функцию с нужным type и передаем payload
const removeCustomer = customer => {
  // dispatch({ type: 'REMOVE_CASTOMER', payload: customer.id })
  dispatch(removeCustomerAction(customer.id))
}
```

в сторе добавляем applyMiddleware(thunk) для асинхронного редакса (applyMiddleware - мидл вейер)

```javascript
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
```

asyncActions - папка для асинхронного action
Возвращаем функцию (для того чтобы мы могли использовать ее как диспатч ) , которая принимает dispatch
Вызываем диспатч( с нужным редьюсером и передаем туда json)

```javascript
import { addManyCustomersAction } from '../store/customerReducer'

export const fetchCustomers = () => {
  return function (dispatch) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => dispatch(addManyCustomersAction(json)))
  }
}
```

customerReducer.js

```javascript
    case ADD_MANY_CUSTOMER:
      return { ...state, customers: [...state.customers, ...action.payload] }
//Берем стейт , изменяем customers [Старое значение массива , дополнительный payload]

export const addManyCustomersAction = payload => ({ type: ADD_MANY_CUSTOMER, payload })
```

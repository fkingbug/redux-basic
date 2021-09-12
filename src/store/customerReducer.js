const defaultState = {
  customers: [],
}

const ADD_CASTOMER = 'ADD_CASTOMER'
const REMOVE_CASTOMER = 'REMOVE_CASTOMER'
const ADD_MANY_CUSTOMER = 'ADD_MANY_CUSTOMER'

export const customerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MANY_CUSTOMER:
      return { ...state, customers: [...state.customers, ...action.payload] }
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

//actionCreater

export const addCustomerAction = payload => ({ type: ADD_CASTOMER, payload })
export const addManyCustomersAction = payload => ({ type: ADD_MANY_CUSTOMER, payload })
export const removeCustomerAction = payload => ({ type: REMOVE_CASTOMER, payload })

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

//actionCreater

export const addCustomerAction = payload => ({ type: ADD_CASTOMER, payload })
export const removeCustomerAction = payload => ({ type: REMOVE_CASTOMER, payload })

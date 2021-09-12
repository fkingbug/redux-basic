import { addManyCustomersAction } from '../store/customerReducer'

export const fetchCustomers = () => {
  return function (dispatch) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => dispatch(addManyCustomersAction(json)))
  }
}
//Возвращаем функцию (для того чтобы мы могли использовать ее как диспатч ) , которая принимает dispatch

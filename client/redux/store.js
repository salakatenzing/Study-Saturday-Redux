import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// ACTION TYPES go here:
const GOT_STUDENTS = 'GOT_STUDENTS';

// ACTION CREATORS go here:
const gotStudents = (students) => ({
type: GOT_STUDENTS,
students
})


// THUNK CREATORS go here:
const fetchStudents = () => async (dispatch) => {
  const {data} = await axios.get('/api/students');
  dispatch(gotStudents(data))
}


const initialState = {
  students: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_STUDENTS:
      return {
        students: action.students
      }
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

// dispatch your own actions here to test your store functionality:
store.dispatch({type: 'HELLO_WORLD'})

// ^ you can see the logs above in your console, thanks to redux-logger!

export default store;

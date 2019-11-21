import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
// import { createStore, combineReducers } from 'redux';
// import { Provider, useSelector, useDispatch } from 'react-redux';


// function reducer(state, action) {
//    switch (action.type) {
//        case "INCREMENT_COUNT":
//        return {
//            ...state,
//            count: state.count + 1
//        }
//        case "DECREMENT_COUNT":
//        return {
//            ...state,
//            count: state.count - 1
//        }
//        default:
//         return state;
//    }
// }

// const INITIAL_STATE = {
//     count: 0
// }

// const store = createStore(reducer, 
//     INITIAL_STATE)

// function App() {
//     return (
//         <Provider store={store}>
//             <Counter />
//         </Provider>
//     );
// }

// function incrementCount() {
//   dispatch({
//      type: "INCREMENT_COUNT" 
//   })
// }
   
// function decrementCount() {
//     dispatch({
//         type: "DECREMENT_COUNT" 
//      })
// }

// function Counter() {
//     useSelector(state => state.count)
//     const dispatch = useDispatch()


//     return (
//         <>
//             <h2>Counter</h2>
//             <button>+</button>
//             <button>-</button>
//         </>
//     )
// }

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
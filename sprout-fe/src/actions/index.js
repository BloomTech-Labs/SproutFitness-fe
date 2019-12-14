import axios from 'axios';

export const FETCHING_USERS = 'FETCHING_USERS';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const LOGIN_TRY = 'LOGIN_TRY';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const REGISTERING = 'REGISTERING';
export const LOGOUT = 'LOGOUT_SUCCESS';
export const TODO_TOGGLE = "TODO_TOGGLE"

export function signup(username, password, firstname, lastname) {
	return (dispatch) => {
		dispatch({ type: REGISTERING})
		axios.post(' https://sprout-fitness-be-staging.herokuapp.com/api/register/coaches', {username, password, firstname, lastname})
		.then(resolve => {
			localStorage.setItem('token', resolve.data.token)
			dispatch({ type: LOGIN_SUCCESS, payload: resolve})
		})
	.catch(err => {
			dispatch({ type: LOGIN_FAIL, payload: err})
		})
	}
}

export function Login(username, password) {
	return (dispatch) => {
		dispatch({ type: LOGIN_TRY})
		// axios.post(''), {username, password}
		.then(resolve => {
			localStorage.setItem('token', resolve.data.token)
			dispatch({ type: LOGIN_SUCCESS})
		})
		.catch(err => { 
			dispatch({ type: LOGIN_FAIL, payload: err})
		})
	}
}
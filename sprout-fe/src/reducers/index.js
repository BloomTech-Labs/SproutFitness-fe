import {
	LOGIN_TRY, LOGIN_SUCCESS, LOGIN_FAIL,
	REGISTERING, LOGOUT
} from "../actions";

const initialState = {
	users: [],
	tasks: [
		{taskName: "Fill out your bio", id: 0, completed: false}, 
		{taskName: "Upload a picture", id: 1, completed: false},
		{taskName: "explore our website", id: 2, completed: false},
		{taskName: "give us some feedback", id: 3, completed: false}
	],
	registering: false,
	loggingIn: false,
	loggedIn: localStorage.token === undefined ?
		false : true,
	retrievingUsers: false,
	updating: false,
	deleting: false,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case REGISTERING: {
			return {
				...state,
				registering: true,
				error: null
			}
		}
		case LOGIN_TRY: {
			return {
				...state,
				loggingIn: true,
				error: null
			}
		}
		case LOGIN_SUCCESS: {
			return {
				...state,
				loggingIn: false,
				loggedIn: true,
				registering: false,
				error: null
			}
		}
		case LOGIN_FAIL: {
			return {
				...state,
				loggingIn: false,
				registering: false,
				error: action.payload
			}
		}
		case LOGOUT: {
			return {
				...state,
				loggedIn: false,
				error: null
			}
		}
		default: {
			return state
		}
	}
}
import {
	LOGIN_TRY, LOGIN_SUCCESS, LOGIN_FAIL,
	REGISTERING, LOGOUT
} from "../actions";

const initialState = {
	users: [],
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
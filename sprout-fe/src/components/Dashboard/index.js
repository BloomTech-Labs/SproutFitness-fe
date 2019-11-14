import React from 'react';
import { useSelector } from 'react-redux';
import Visualization from './visualization.js'
import List from './list.js'

const Dashboard = (props) => {
		
	const loggedIn = useSelector(state => state.loggedIn)
	const loggingIn = useSelector(state => state.loggingIn)
	const error = useSelector(state => state.error)

	if (loggingIn === true) {
		return <h3>going through security...</h3>
	} else if (error === true) {
		return <h2>{error}</h2>
	} else if (loggedIn === true) {
		return (
			<div className="dashboard-wrapper">
				<Visualization />
				<List />
			</div>
		)
	} else {
		return <h2>You need to log in before you can see your dashboard</h2>
	}
}

/*
		const loggedIn = useSelector(state => state);

	const [users, setUsers] = useState([{ name: "Hubert"}, { name: "Joe"}])
	{users.map((user) => {
			return (
				<p>{user.name}</p>
			)
		})}


class Dashboard extends React.Component {
	render(){
		if (logging in === true) {
			return <h3>going through security...</h3>
		} else if (error === true) {
			return <h2>display {error}</h2>
		} else if (logged in === true) {
			return (
				<div className="dashboard-wrapper">

				</div>
			)
		} else {
			return <h2>You need to log in before you can see your dashboard</h2>
		}
	}
}

*/

export default Dashboard;
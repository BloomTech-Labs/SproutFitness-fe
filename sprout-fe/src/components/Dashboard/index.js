import React from 'react';
import { useSelector } from 'react-redux';
import Visualization from './visualization.js'
import List from './list.js'
import { Container, Row, Col } from 'reactstrap';

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
			<Container className="dashboard-wrapper">
				<Row>
					<Col lg="8">
						<Visualization />
					</Col>
					<Col lg="4">
						<List />
					</Col>
				</Row>
			</Container>
		)
	} else {
		return <h2>You need to log in before you can see your dashboard</h2>
	}
}

/*

			<UncontrolledAlert>
					Welcome to the dashbaord! Take a look around. We have some onboarding steps you can follow on the right as well as an example of what your dashboard could look like in the future, once you have your business up and running.
				</UncontrolledAlert>

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
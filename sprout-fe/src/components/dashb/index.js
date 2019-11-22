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

export default Dashboard;
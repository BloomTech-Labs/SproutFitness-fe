import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TODO_TOGGLE, DEMO_TOGGLE } from '../../actions';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const List = () => {
	const tasks = useSelector(state => state.tasks)	
	const clients = useSelector(state => state.clients)
	const dispatch = useDispatch();
	
	const todoClickHandler = (event) => {		

		const taskChecker = tasks.map(task => {
			if(task.id.toString() === event.target.id) {				
				task.completed = !task.completed
				return task
			} else {
				return task
			}
		})		

		dispatch ({
			type: TODO_TOGGLE,
			payload: taskChecker
		})
	}

	const buttonClickHandler = (e) => {
		e.preventDefault()

		const compTasks = tasks.filter(task => task.completed === false)
		
		dispatch ({
			type: TODO_TOGGLE,
			payload: compTasks
		})
	}

	const demoButtonClickHandler = (e) => {
		e.preventDefault()

		const demoData = [
			{
				userID: 0,
				firstname: "Jane",
				lastname: "Doe",
				fitnessLog: [
					{
						date: 43466,
						caloriesOut: 2100,
						CaloriesIn: 1800,	
					},
					{
						date: 43467,
						caloriesOut: 2100,
						CaloriesIn: 1800,	
					}
				]
			},
			{
				userID: 1,
				firstname: "John",
				lastname: "Doe",
				fitnessLog: [
					{
						date: 43466,
						caloriesOut: 2600,
						CaloriesIn: 3000,	
					}
				]
			},
			{
				userID: 2,
				firstname: "Johnie",
				lastname: "Doe",
				fitnessLog: [
					{
						date: 43466,
						caloriesOut: 1800,
						CaloriesIn: 1800,	
					}
				]
			}
		]

		dispatch ({
			type: DEMO_TOGGLE,
			payload: demoData
		})

	}
	
	if(clients[0] === undefined) {
		return (
			<div className={"todoList"}>
				<ListGroup>
					<h3>Todo</h3>
					{tasks.map(task => {
						return (
							<ListGroupItem key={task.id} 
								id={task.id} 
								onClick={todoClickHandler} 
								className={task.completed ? "completedTask" : null} 
								tag="button">
								{task.taskName}
							</ListGroupItem>
						)
					})}
				</ListGroup>
				{tasks[0] ? 
					<Button onClick={buttonClickHandler} color="primary">Clear Tasks</Button> :
					<Button onClick={demoButtonClickHandler} color="primary">Get Demo Data</Button>}
			</div>
		)	
	} else {
		return (
			<div className={"todoList"}>
				<ListGroup>
					<h3>Clients</h3>
					{clients.map(client => {
						return (
							<ListGroupItem key={client.userID} id={client.userID}>
								{client.firstname}
							</ListGroupItem>
						)
					})}
				</ListGroup>
			</div>

		)
	}
}

export default List;
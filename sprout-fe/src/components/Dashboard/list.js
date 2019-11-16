import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TODO_TOGGLE } from '../../actions';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

const List = () => {
	const tasks = useSelector(state => state.tasks)	
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

		const comTasks = tasks.map(task => {
			if(task.completed === false) {
				return task
			} else {
				return null
			}
		})

		console.log(comTasks);
		
		// dispatch ({
			
		// })
	}

	return (
		<div className={"todoList"}>
			<ListGroup>
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
			<Button onClick={buttonClickHandler} color="primary">Clear Tasks</Button>
		</div>
	)
}

export default List;
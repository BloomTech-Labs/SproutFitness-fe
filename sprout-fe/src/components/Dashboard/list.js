import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TODO_TOGGLE } from '../../actions'

const List = () => {
	const tasks = useSelector(state => state.tasks)	
	const dispatch = useDispatch();
	
	const clickHandler = (event) => {		

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

	return (
		<div className={"todoList"}>
			{tasks.map(task => {
				return (
					<p key={task.id} 
						id={task.id} 
						onClick={clickHandler} 
						className={task.completed ? "completedTask" : null}>
						{task.taskName}
					</p>
				)
			})}
		</div>
	)
}

export default List;
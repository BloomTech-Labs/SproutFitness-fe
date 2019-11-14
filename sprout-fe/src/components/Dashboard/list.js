import React from 'react';
import { useSelector } from 'react-redux';

const List = () => {
	const tasks = useSelector(state => state.tasks)

	console.log(tasks);
	

	return (
		tasks.map(task => {
			return (
				<p key={task.id}>{task.taskName}</p>
			)
		})
	)
}

export default List;
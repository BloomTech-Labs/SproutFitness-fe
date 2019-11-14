import React, { useState } from 'react';

const Visualization = () => {
		
	const [users, setUsers] = useState([{ name: "Hubert"}, { name: "Joe"}])
	
	return (
		users.map((user) => {
			return (
				<p>{user.name}</p>
			)
		})
	)
}

export default Visualization;
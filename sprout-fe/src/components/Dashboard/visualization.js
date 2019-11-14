import React, { useState } from 'react';

const Visualization = () => {
		
	const [users, setUsers] = useState([{ name: "Hubert"}, { name: "Joe"}])
	
	return (
		<h3>Visualizations</h3>
	)
}

export default Visualization;
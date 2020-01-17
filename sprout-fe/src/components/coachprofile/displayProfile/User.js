import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// function User ({ id }) {
//   const {user, setUser} = useState("");
//   useEffect(() => {
//     const fetchUser = id =>
//     axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${id}`)
//     .then(response => response.json())
//     .then(user => {
//       console.log(user);
//       setUser(user.firstname)
//     });
//     fetchUser(id);
//   }, [id, setUser]);
//   return (
//     <div>
//       <div>{user}</div>
//     </div>
//   );
// }
const [loading, setLoading] = useState(false)
const userID = useSelector(state => state.userID)

	const getData = async event => {
		setLoading(true)
		try {
			const coach = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${userID}`)
			const appSpecialtiesList = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/specialties`) // **** THERE IS A BUG WITH THIS END POINT - coach_specialty_detial id is not included in returned specialties object
			return {
				coach: coach.data.coach,
				specialties: coach.data.specialties,
				certifications: coach.data.certifications,
				appSpecialtiesList: appSpecialtiesList.data
			}
			
		}catch(error) {
			console.log("Error getting user data", error)
		}
  }
  
  const refreshData = async () => {
		getData()
			.then(data => {
				setData(data)
			})
			.catch("Error refreshing data to state after saving new data.")
	}
	

	//grabbing the users profile pic, bio, language, specialties, and certifications
	useEffect(() => {
		const data = getData()
			.then(result=> {
				console.log("getData result", result)
				setData(result)
			})
			.catch(error => {
				console.log("Error setting data to state", error)
			})

	}, [certName, userID])



export default User;
/*	EDIT COACH PROFILE	* 
*												
*	Travis Litle
*	tlittle@tradavo.com
*
*	Jamison Blackwell
*			
*************************
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachDetails.css';
import { Container, Media, Spinner, Card, CardBody, CardTitle, Button, Col, Row, FormGroup, Input } from 'reactstrap';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

import SpecialtyListSelect from './SpecialtyListSelect'

import countries from './countries'
import timezones from './timezones'


const CoachDetails = () => {

	const [image, setImage] = useState('') // Cloudinary and image display	

	// App States
	const [loading, setLoading] = useState(false)
	const [saving, setSaving] = useState(false)
	const [isImageLoading, setIsImageLoading] = useState(false)
	const [hasCoachChanged, setHasCoachChanged] = useState(false)
	const [hasCertsChanged, setHasCertsChanged] = useState(false)
	const [hasSpecsChanged, setHasSpecsChanged] = useState(false)
	const [hasPicChanged, setHasPicChanged] = useState(false)

	// Coach fields for editing
	const [coachData, setCoachData] = useState({})

	// Specialty Select Modal State
	const [coachSpecialties, setCoachSpecialties] = useState([]) // array of objects of the coach special detail records
	const [appSpecialtiesList, setAppSpecialtiesList] = useState([]) // array of objects of all the available specialties for the app
	const [selectedSpecialties, setSelectedSpecialties] = useState([]) // array of specialty_ids, either selected in the model or currently saved

	// Add / Edit / Remove Certification Modal
	const [newCert, setnewCert] = useState(''); // Text box for adding new cert	
	const [coachCertifications, setCoachCertifications] = useState([])	// coaches saved certifications
	const [newCoachCertifications, setNewCoachCertifications] = useState([])	// new certifications to be saved

	// ## INITIALIZATION - getting and setting data for state  ********************** /

	const userID = useSelector(state => state.userID)

	const getData = async () => {

		try {
			setLoading(true)
			const coachReq = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${userID}`)
			const appSpecialtiesList = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/specialties`)

			setImage(coachReq.data.coach.picture_url) // profile image
			setCoachData(coachReq.data.coach) // name, email, city, country, etc
			setCoachSpecialties(coachReq.data.specialties) // these are the currently saved coach specialties
			setCoachCertifications(coachReq.data.certifications) // currently saved certifcations
			setAppSpecialtiesList(appSpecialtiesList.data)	// these are the available specialties the coach can pick from - the available specialties are to be defined by app developers and NOT USERS. This is for a future tagging system, as well as improved filtering/searching

			// store an array of specialty_IDs of the Coach's saved specialties into state - for easier/faster searching in the app		
			if (coachReq.data.specialties.length > 0) {
				const selected_spec_id_list = coachReq.data.specialties.map(specialty => {
					return specialty.specialty_id
				})
				setSelectedSpecialties(selected_spec_id_list)
			}

			// Reset App States
			setHasCertsChanged(false)
			setHasCoachChanged(false)
			setHasSpecsChanged(false)
			setHasPicChanged(false)

		} catch (error) {
			console.log("Error getting user data", error)
		} finally {
			setLoading(false)
			setSaving(false)
		}
	}

	const refreshData = async () => {
		try {
			setTimeout(() => {
				// This is not best practice - This allows for the new changes to save to db before refetching. Hello next person working on this!
				getData()
			}, 2000)
		} catch (error) {
			console.log('error refreshing data')
		}
	}

	useEffect(() => {
		getData()

	}, [])

	// ## HANDLER FUNCTIONS *************************************************

	const handleChange = event => {
		event.preventDefault()
		const { name, value } = event.target
		setCoachData((prevState) => {
			return { ...prevState, [name]: value }
		})
		setHasCoachChanged(true)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		setSaving(true)

		//updating user's image string to serve but only if user uploads a new file
		const saveImageToAppServer = () => {
			if (image !== "") {
				axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, { "picture_url": image })
					.then(res => {
						if (res.status === 200) {
							setImage(image)
						}
					})
					.catch(err =>
						console.log("Error saving image URL to app server", err))

			} else {
				return null
			}
		}
		if (!compareSelectedAndSaved(selectedSpecialties, coachSpecialties)) {
			if (coachSpecialties.length > 0) {
				coachSpecialties.forEach(specialty => {
					axios.delete(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_specialty_details/${specialty.id}`)
						.catch((error) => console.log('error deleting csd', error))
				})

			}
			if (selectedSpecialties.length > 0) {
				const new_csd_data = selectedSpecialties.map(spec => {
					return { coach_id: userID, specialty_id: spec }
				})
				axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_specialty_details`, new_csd_data)
					.catch(error => {
						console.log("Error posting CSDs", error)
					})
			}

		}
		if (hasCertsChanged && newCoachCertifications.length > 0) {
			axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_certifications`, newCoachCertifications)
				.then((result) => {
					setNewCoachCertifications([])
				})
				.catch((error => {
					console.log('Error posting new Certifications', error)
				}))
		}

		if (hasCoachChanged) {
			axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, coachData)
				.then((result) => {
					setCoachData(result.data)
				})
				.catch(() => console.log('error updating coach'))
		}

		if (image !== "") {
			saveImageToAppServer()
		}
		refreshData()
	}

	const handleSpecialtyClick = event => {
		event.preventDefault()
		setHasSpecsChanged(true)
		const selected = selectedSpecialties.indexOf(event.target.id)
		if (selected !== -1) {
			const newList = selectedSpecialties
			newList.splice(selected)
			setSelectedSpecialties(newList)
		} else {
			const newList = selectedSpecialties
			newList.push(event.target.id)
			setSelectedSpecialties(newList)
		}

	}

	// ## CLOUDINARY FUNCTIONS ***********************

	const uploadImage = async e => {
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('upload_preset', 'square1')
		setIsImageLoading(true)
		const res = await fetch(
			'https://api.cloudinary.com/v1_1/drgfyozzd/image/upload',
			{
				method: 'POST',
				body: data
			}
		)
		const file = await res.json()
		setImage(file.secure_url)
		setHasPicChanged(true)
		setIsImageLoading(false)
	}

	// ## HELPERS ***********************************

	// Compare selected specialties vs the ones saved, returns true if equal, false if not
	const compareSelectedAndSaved = (selected, saved) => {
		// saved is an array of objects with an id property, selected is an array with ids
		// strip the ids from the objects in saved into an array
		// sort saved and selected
		// compare - return true if equal return false if not
		const saved_id_list = []
		saved.forEach(item => {
			saved_id_list.push(item.specialty_id)
		})
		saved_id_list.sort()
		selected.sort()

		function isEqual(selected_list, saved_list) {
			if (selected_list === saved_list) return true
			if (selected_list === null || saved_list === null) return false
			if (selected_list.length !== saved_list.length) return false

			for (var i = 0; i < selected_list.length; ++i) {
				if (selected_list[i] !== saved_list[i]) return false;
			}
			return true;

		}
		const result = isEqual(selected, saved_id_list)
		return result
	}


	const certHandler = e => {
		setnewCert(e.target.value)
	}

	const newCertification = (e) => {
		e.preventDefault();
		const newCertState = newCoachCertifications
		const newCertObj = { name: newCert, coach_id: userID }
		newCertState.push(newCertObj)
		setNewCoachCertifications(newCertState)
		setHasCertsChanged(true)
		setnewCert('')

	}

	const handleDeleteCertFromServer = event => {
		event.preventDefault()
		const deleleteTarget = event.currentTarget.id

		// Delete the Certification from the server
		axios.delete(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_certifications/${deleleteTarget}`)
				.then(() => {
					const currentCertState = coachCertifications
					const newCoachCertificationsState = currentCertState.filter(cert => cert.id !== deleleteTarget)
					setCoachCertifications(newCoachCertificationsState)
					setHasCertsChanged(true)
				})
				.catch((error => {
					console.log('Error deleting Certification', error)
				}))

		// Remove the Certification from state
		

	}

	const handleDeleteCertFromState = event =>  {
		event.preventDefault()
		const deleteTarget = event.currentTarget.id
		const currentCertState = newCoachCertifications
		const newCertState = currentCertState.filter(cert => cert.name !== deleteTarget)
		setNewCoachCertifications(newCertState)		
	}

	return (
		loading || saving ?

			// Loading Spinner Overloay
			<Container className="loading">
				<Spinner className="loading-spinner" color="info" style={{ width: '6rem', height: '6rem' }} />
				<h1>Loading...</h1>
			</Container> :

			// App
			<Container className="prof-edit-container">
				<Row>

					{
						hasSpecsChanged ? <Button type='submit' onClick={handleSubmit} className='changes-button' color="info" size="lg" block>SAVE CHANGES</Button> :
							hasCoachChanged ? <Button type='submit' onClick={handleSubmit} className='changes-button' color="info" size="lg" block>SAVE CHANGES</Button> :
								hasCertsChanged ? <Button type='submit' onClick={handleSubmit} className='changes-button' color="info" size="lg" block>SAVE CHANGES</Button> :
									hasPicChanged ? <Button type='submit' onClick={handleSubmit} className='changes-button' color="info" size="lg" block>SAVE CHANGES</Button> :
										<Button disabled type='submit' className='changes-button' color="secondary" size="lg" block>No Changes</Button>
					}

					<Col sm="4" lg="4" className="prof-edit-section-left">
						<Row className="prof-image-area">
							<div className='image--circle'>
								{
									isImageLoading ? <p>Loading image...</p> :
										coachData.picture_url ? <Media src={coachData.picture_url} alt='Profile Image' /> :
											image ? <Media src={image} alt='Profile Image' /> :
												<FontAwesomeIcon className="temp-avatar" icon={faUserCircle} />
								}

							</div>
							<input type="file" name="file" id="file" color='white' className="inputfile" onChange={uploadImage} />
							<label for="file">Change Picture</label>
						</Row>
						<Row className="field-row">
							<FormGroup className="field" >
								<Input type="text" name="firstname" id="firstname" onChange={handleChange} value={coachData.firstname} />
							</FormGroup>
						</Row>
						<Row className="field-row">
							<FormGroup className="field" >
								<Input type="text" name="lastname" id="lastname" onChange={handleChange} value={coachData.lastname} />
							</FormGroup>
						</Row>
						<Row className="field-row">
							<FormGroup className="field" >
								<Input type="text" name="city" id="city" placeholder="City" onChange={handleChange} value={coachData.city} />
							</FormGroup>
						</Row>
						<Row className="field-row">
							<FormGroup className="field" >
								<Input type="select" name="country" id="country" onChange={handleChange} value={coachData.country} >
									<option>Country</option>
									{countries.map(country => {
										return <option>{country}</option>
									})}
								</Input>
							</FormGroup>
						</Row>
						<Row className="field-row">
							<FormGroup className="field">
								<Input type="select" name="timezone" id="timezone" onChange={handleChange} value={coachData.timezone} >
									<option>Timezone</option>
									{timezones.map(timezone => {
										return <option>{timezone.name}</option>
									})}
								</Input>
							</FormGroup>
						</Row>
						<Row className="field-row">
							<FormGroup className="field">
								<Input type="textarea" name="bio" id="bio" placeholder="Enter a short bio" onChange={handleChange} value={coachData.bio} />
							</FormGroup>
						</Row>

					</Col>
					<Col sm="8" lg="8" className="prof-edit-section-right">
						<div className="edit-section">
							<div className="edit-sub-section">
								<Row className="prof-edit-header">
									<h3 className="section-header">Specialties</h3>
								</Row>
								<Row className="specialty-select-row">
									{
										!appSpecialtiesList.length > 0 ? <p>Loading</p> :
											<SpecialtyListSelect appSpecialtiesList={appSpecialtiesList} selectedSpecialties={selectedSpecialties} handleSpecialtyClick={handleSpecialtyClick} />

									}
								</Row>
							</div>
							<div className="edit-sub-section">
								<Row className="prof-edit-header">
									<h3 className="section-header">Certifications</h3>
								</Row>

								{
									<Card className='saved-cert-card'>
										<CardTitle className="flex-row-nowrap">
											<h4>Add New Certification</h4>

										</CardTitle>
										<CardBody className="saved-cert-card-body">
											<Input className='modal-input' type="text" onChange={certHandler} value={newCert} placeholder="Name of Certification" />
											{
												newCert ? <Button type='submit' color="info" onClick={newCertification} >Add</Button> :
												 <Button disabled type='submit' color="info" onClick={newCertification} >Add</Button>
											}
											
										</CardBody>
									</Card>

								}
								{!newCoachCertifications.length > 0 ? "" :
									newCoachCertifications.map(cert => {
										return (
											<Card className='saved-cert-card'>
												<CardTitle className="flex-row-nowrap">
													<div className="cert-header">
														<h4>{cert.name}</h4>
														<FontAwesomeIcon className="del-cert-icon" icon={faTrash} name={cert.name} id={cert.name} onClick={handleDeleteCertFromState}/>
													</div>
												</CardTitle>
												<CardBody className="saved-cert-card-body">
													<span>Not Saved</span>
												</CardBody>
											</Card>


										)

									})
								}
								{!coachCertifications.length > 0 ? '' :
									coachCertifications.map(cert => {
										const date = new Date(cert.created_at).toLocaleString()
										return (
											<Card className='saved-cert-card'>
												<CardTitle className="flex-row-nowrap">
													<div className="cert-header">
														<h4>{cert.name}</h4>
														<FontAwesomeIcon className="del-cert-icon" icon={faTrash} name={cert.name} id={cert.id} onClick={handleDeleteCertFromServer}/>
													</div>
												</CardTitle>
												<CardBody className="saved-cert-card-body">
													<span><bold>Added:</bold> <span>{date}</span></span>
												</CardBody>
											</Card>
										)

									})
								}
							</div>
						</div>

					</Col>
				</Row>

				{
						hasSpecsChanged ? <Button type='submit' onClick={handleSubmit} className='changes-button' color="info" size="lg" block>SAVE CHANGES</Button> :
							hasCoachChanged ? <Button type='submit' onClick={handleSubmit} className='changes-button' color="info" size="lg" block>SAVE CHANGES</Button> :
								hasCertsChanged ? <Button type='submit' onClick={handleSubmit} className='changes-button' color="info" size="lg" block>SAVE CHANGES</Button> :
									hasPicChanged ? <Button type='submit' onClick={handleSubmit} className='changes-button' color="info" size="lg" block>SAVE CHANGES</Button> :
										<Button disabled type='submit' className='changes-button' color="secondary" size="lg" block>No Changes</Button>
					}


			</Container>
	)
}

export default CoachDetails;
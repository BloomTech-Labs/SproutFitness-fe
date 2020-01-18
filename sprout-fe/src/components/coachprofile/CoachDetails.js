import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachDetails.css';
import { Container, Modal, Media, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpa, faCertificate } from '@fortawesome/free-solid-svg-icons'

import SpecialityCard from './SpecialtyCard'
import SpecialtySelectModal from './SpecialtySelectModal'

import countries from './countries'
import timezones from './timezones'


const CoachDetails = () => {

	const [image, setImage] = useState('')
	const [coachImage, setCoachImage] = useState('')
	
	const [specialty, setSpecialty] = useState([])
	const [coachSpecialty, setCoachSpecialty] = useState([])
	const [certifications, setCertifications] = useState([])
	const [coachBio, setCoachBio] = useState("")
	
	const [language, setLanguage] = useState("")
	const [coachLanguage, setCoachLanguage] = useState("")
	const [specName] = useState('');
	const [certName, setCertName] = useState('');
	const [newCert, setnewCert] = useState([]);
	const [id, setId] = useState('');
	const [modals, setModals] = useState(false);
	const [modal, setModal] = useState(false);
	const [specId, setSpecId] = useState([]);
	const [specialtyId, setSpecialtyId] = useState([]);
	const [specialties] = useState('');
	const [name, setName] = useState('');


	// App States
	const [loading, setLoading] = useState(false)
	const [isImageLoading, setIsImageLoading] = useState(false)
	const [hasCoachChanged, setHasCoachChanged] = useState(false)
	const [hasSpecsChanged, setHasSpecsChanged] = useState(false)
	const [hasCertsChanged, setHasCertsChanged] = useState(false)

	
	const [coachData, setCoachData] = useState({}) // For fields
	const [coachSpecialties, setCoachSpecialties] = useState([])
	const [coachSpecialtiesIdList, setCoachSpecialtiesIdList] = useState([])
	const [appSpecialtiesList, setAppSpecialtiesList] = useState([])
	const [coachCertifications, setCoachCertifications] = useState([])
	const [selectedSpecialties, setSelectedSpecialties] = useState([])

	//reactstrap toggle for modal

	const toggles = () => setModals(!modals);
	const toggle = () => setModal(!modal);


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

	const setData = async (data) => {
		setCoachImage(data.coach.picture_url)
		setCoachData(data.coach)
		setCoachSpecialties(data.specialties) // these are the currently saved coach specialties
		// setSelectedSpecialties(data.specialties) // this are the currently selected specialties while editing within app
		setCoachCertifications(data.certifications)
		setAppSpecialtiesList(data.appSpecialtiesList)

		// Create an array of IDs of the Coach's saved specialties - for easier/faster searching in the app
		let selectedList = []
		let specIdList = []
		if(data.specialties.length > 0) {
			data.specialties.forEach(specialty => {
				specIdList.push(specialty.id)
				selectedList.push(specialty.specialty_id)
			})
			setCoachSpecialtiesIdList(specIdList)
			setSelectedSpecialties(selectedList)
		}
		
		setLoading(false)
	}

	const refreshData = async () => {
		getData()
			.then(data => {
				setData(data)
			})
			.catch("Error refreshing data to state after saving new data.")
	}

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
		console.log(`selectedList:   ${selected}    ||||| saved:    ${saved_id_list}`)

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
		console.log('is equal result', result)
		return result
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

	//cloudinary upload
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
		setIsImageLoading(false)
	}


	const handleChange = event => {
		event.preventDefault()
		const {name, value} = event.target
		setCoachData((prevState) => {
			return {...prevState, [name]: value}
		})
		setHasCoachChanged(true)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		try {
			if(hasCoachChanged) {
				const updatedCoach = await axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, coachData)
				// setCoachData(updatedCoach.data)
			}
			if(!compareSelectedAndSaved(selectedSpecialties, coachSpecialties)) {
				if(coachSpecialties.length > 0) {
					coachSpecialties.forEach(async specialty => {
						console.log('deleting csd', specialty.id)
						
						const result = await axios.delete(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_specialty_details/${specialty.id}`)
						console.log('delete result', result)

						
					})
					selectedSpecialties.forEach(async selected_spec => {
						console.log('posting spec', selected_spec)
						const post_result = await axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_specialty_details`, { "coach_id": userID, "specialty_id": selected_spec })
						console.log('post result', post_result)
					})
				}
					
			}
			if(hasCertsChanged) {
				const updatedCerts = await axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_certifications`, { "name": newCert, "coach_id": userID})
				// setCoachCertifications(updatedCerts.data)
			}
		}catch (error) {
			console.log("Error updating user", error)
		}

		//this function is submiting the image url to the cloudinary server
		const uploadImageToCloudinary = e => {
			if (image !== "") {
				axios.post('https://api.cloudinary.com/v1_1/drgfyozzd/image/upload', image)
					.then(res => {
					})
					.catch(err => {
						console.log("Error uploading image to Cloudinary", err)
					})
			}
		}
		//updating user's image string to serve but only if user uploads a new file
		const saveImageToAppServer = () => {
			if (image !== "") {
				axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, { "picture_url": image })
					.then(res => {
						if (res.status === 200) {
							setCoachImage(image)
						}
					})
					.catch(err =>
						console.log("Error saving image URL to app server",err))

			} else {
				return null
			}
		}

		const saveNewSpecialties = () => {

		}

		if(image !== "") {
			// uploadImageToCloudinary()
			saveImageToAppServer()
		}

		refreshData()
		
	}


	// changes the state of coachLanguage when a user clicks on option in select form  
	const langChange = e => {
		setCoachLanguage(e.target.value)
	}

	const certHandler = e => {
		setnewCert(e.target.value)
	}

	const newCertification = (e) => {
		e.preventDefault();
		axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_certifications`, { "name": newCert, "coach_id": `${userID}` })
			.then(res => {
				if (res.status === 201) {
					setCertName(newCert)
				}
			})
			.catch(err =>
				console.log(err))
	}

	const newSpecialty = (e) => {
		e.preventDefault();
		axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_specialty_details`, { "coach_id": `${userID}`, "specialty_id": id })
			.then(res => {
				if (res.status === 201) {
					setSpecialty(specName)
				}
			})
			.catch(err =>
				console.log(err))
	}

	const handleSpecialtyClick = event => {
		event.preventDefault()
		console.log('hi', event.target)
		const selected = selectedSpecialties.indexOf(event.target.id)
		if(selected !== -1) {
			const newList = selectedSpecialties
			newList.splice(selected)
			setSelectedSpecialties(newList)
		} else {
			const newList = selectedSpecialties
			newList.push(event.target.id)
			setSelectedSpecialties(newList)
		}
		
		
	}

	const handleSpecFinish = event => {
		event.preventDefault()	
		toggles()
		console.log(`selectedSpecialties check`, selectedSpecialties)
		console.log('coachSpecialties', coachSpecialties)
	}

	return (
		loading ? <p>Loading...</p> :
		<Container className="prof-edit-container">
			<Row className="prof-edit-header">
				<Col >Header</Col>
			</Row>
			<Row>
				<Col sm="4" lg="4" className="prof-edit-section-left">
					<Row className="prof-image-area">
						<div className='image--circle'>
							{
								!isImageLoading ? <Media src={image || coachData.picture_url} alt='Profile Image' /> :
								<p>Loading image...</p>
							}
							
						</div>
						<input type="file" name="file" id="file" color='white' className="inputfile" onChange={uploadImage} />
						<label for="file">Change Picture</label>
					</Row>
					<Row className="field-row">
						<FormGroup className="field" >
							<Input type="text" name="firstname" id="firstname"  onChange={handleChange} value={coachData.firstname} />
						</FormGroup>
					</Row>
					<Row className="field-row">
						<FormGroup className="field" >
							<Input type="text" name="lastname" id="lastname"  onChange={handleChange} value={coachData.lastname}/>
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

				</Col>
				<Col sm="8" lg="8" className="prof-edit-section-right">
					<Row >
						<Col sm="6" lg="6" className="flex-center">
							
							<div className="modal-icon-container hover" onClick={toggles}>
								<Label for="specialty-icon">Select Specialties</Label>
								<FontAwesomeIcon id="specialty-icon" className="modal-icon" icon={faSpa} />							
								<Modal isOpen={modals} toggle={toggles} >
								<ModalHeader toggle={toggles}>Select Your Specializations</ModalHeader>
								<ModalBody className="flex-center">
									{!appSpecialtiesList.length > 0 ? <p>No Specialties</p> : 
										appSpecialtiesList.map(specialty => {

											const selected = selectedSpecialties.includes(specialty.id)

											return <SpecialityCard 
													handleSpecialtyClick={handleSpecialtyClick} 
													specialty={specialty} 
													onClick={handleSpecialtyClick}
													selected={selected}
												/>
										})
									}
									
								</ModalBody>
								<ModalFooter>
									<Button type='submit' color="primary" onClick={handleSpecFinish}>Done</Button>
									<Button color="secondary" onClick={toggles}>Cancel</Button>
								</ModalFooter>
								</Modal>
							</div>
								
						</Col>
						<Col sm="6" lg="6" className="flex-center">
							<p>Certs:</p>
								{!coachCertifications.length > 0 ? <p>No Certs</p> :
									coachCertifications.map(cert => {
										return <p>{cert.name}</p>
									})
								}
							<div className="modal-icon-container hover" onClick={toggle}>
								<Label for="cert-icon">Add Certifications</Label>
								<FontAwesomeIcon id="cert-icon" className="modal-icon"  icon={faCertificate} />
								<Modal isOpen={modal} toggle={toggle} >
								<ModalHeader toggle={toggle}>Post certification</ModalHeader>
								<ModalBody>
									<label>Name of Certification</label>
									<Form onSubmit={newCertification}>
									<input className='modal-input' onChange={certHandler} />
									<Button type='submit' color="primary" >POST</Button>
									</Form>
								</ModalBody>
								<ModalFooter>
									<Button color="secondary" onClick={toggle}>Cancel</Button>
								</ModalFooter>
								</Modal>
							</div>
						</Col>
					</Row>
					<Row className="flex-center">
						<FormGroup className="bio-field">
							<Input type="textarea" name="bio" id="bio"  placeholder="Enter a short bio" onChange={handleChange} value={coachData.bio}/>
						</FormGroup>
					</Row>	
				</Col>

			</Row>


			<form onSubmit={handleSubmit}>
				<Button style={{ marginTop: '20px', marginBottom: '20px' }} type='submit' className='changes-button' color="primary" size="lg" block>SAVE CHANGES</Button>
			</form>


		</Container>
	)

}

export default CoachDetails;
/*	TODO

	Bugs/Issues
	--------
	- When deselecting multiple specialties, not all of the CSDs are deleted from the server


	App
	----
	Certification Model - CRUD interface for Certifications
	Display currently saved specialties
	Display currrently saved Certifications

	Styling

*/







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachDetails.css';
import { Container, Modal, Media, ModalHeader, ModalBody, ModalFooter, Spinner, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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

	const [coachLanguage, setCoachLanguage] = useState("")
	const [specName] = useState('');
	const [certName, setCertName] = useState('');
	const [newCert, setnewCert] = useState([]);
	const [id, setId] = useState('');
	const [modals, setModals] = useState(false);
	const [modal, setModal] = useState(false);


	// App States
	const [loading, setLoading] = useState(false)
	const [saving, setSaving] = useState(false)
	const [isImageLoading, setIsImageLoading] = useState(false)
	const [hasCoachChanged, setHasCoachChanged] = useState(false)
	const [hasSpecsChanged, setHasSpecsChanged] = useState(false)
	const [hasCertsChanged, setHasCertsChanged] = useState(false)

	// Coach fields for editing
	const [coachData, setCoachData] = useState({})

	// Specialty Select Modal State
	const [coachSpecialties, setCoachSpecialties] = useState([]) // array of objects of the coach special detail records
	const [appSpecialtiesList, setAppSpecialtiesList] = useState([]) // array of objects of all the available specialties for the app
	const [selectedSpecialties, setSelectedSpecialties] = useState([]) // array of specialty_ids, either selected in the model or currently saved

	const toggleSpecialtyModal = () => setModals(!modals);

	// Add / Edit / Remove Certification Modal	
	const [coachCertifications, setCoachCertifications] = useState([])

	const toggleCertificationModal = () => setModal(!modal);


	// ## INITIALIZATION - getting and setting data for state  ********************** /

	const userID = useSelector(state => state.userID)

	const getData = async () => {

		try {
			setLoading(true)
			const coachReq = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${userID}`)
			const appSpecialtiesList = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/specialties`)

			setCoachImage(coachReq.data.coach.picture_url) // profile image
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
				selectedSpecialties.forEach(selected_spec => {
					axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_specialty_details`, { "coach_id": userID, "specialty_id": selected_spec })
						.catch((error) => console.log('error posting csd', error))
				})
			}

		}
		if (hasCertsChanged) {
			const updatedCerts = await axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_certifications`, { "name": newCert, "coach_id": userID })
			// setCoachCertifications(updatedCerts.data)
		}

		if (hasCoachChanged) {
			axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, coachData)
				.then((result) => {
					setCoachData(result.data)
				})
				.catch(() => console.log('error updating coach'))

		}

		if (image !== "") {
			// uploadImageToCloudinary()
			saveImageToAppServer()
		}

		refreshData()

	}

	const handleSpecialtyClick = event => {
		event.preventDefault()
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

	const handleSpecFinish = event => {
		event.preventDefault()
		toggleSpecialtyModal()
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
		axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_certifications`, { "name": newCert, "coach_id": `${userID}` })
			.then(res => {
				if (res.status === 201) {
					setCertName(newCert)
				}
			})
			.catch(err =>
				console.log(err))
	}

	return (
		loading || saving ?
			<Container className="loading">
				<Spinner className="loading-spinner" color="info" style={{ width: '6rem', height: '6rem' }} />
				<h1>Loading...</h1>
			</Container> :
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
						<Row >
							<Container className="saved-data-container">
								<Container className="saved-specs-container" >
									<Row className="prof-edit-header">
										<h3>Saved Specialties</h3>
									</Row>
									{
										!coachSpecialties.length > 0 ? <p>None</p> :
											coachSpecialties.map(coach_spec => {
												return (
													<Card className='saved-specs-card'>
														<CardTitle className="flex-row-nowrap">
															<h5>{coach_spec.name}</h5>
														</CardTitle>
														<CardBody>
															<FontAwesomeIcon id="specialty-icon" className="modal-icon-sm" icon={faSpa} />
														</CardBody>
													</Card>
												)
											})
									}
								</Container>
								<Container className="saved-certs-container">
									<Row className="prof-edit-header">
										<h3>Saved Certifications</h3>
									</Row>
									<Row>
										{!coachCertifications.length > 0 ? <p>No Certs</p> :
											coachCertifications.map(cert => {
												return (
													<Card className='saved-cert-card'>
														<CardTitle className="flex-row-nowrap">
															<h4>{cert.name}</h4>
														</CardTitle>
														<CardBody className="saved-cert-card-body">
															<p><bold>Issued by:</bold></p>  <p>National Stuff Organization of Alot of Words to Fill of Space</p>
															<bold><p>Expires:</p></bold>  <p>05/26/2022</p>
														</CardBody>
													</Card>
												)

											})
										}
									</Row>
								</Container>
							</Container>
						</Row>
						<Row >
							<Col sm="6" lg="6" className="flex-center">

								<div className="modal-icon-container hover" onClick={toggleSpecialtyModal}>
									<Label for="specialty-icon">Edit Specialties</Label>
									<FontAwesomeIcon id="specialty-icon" className="modal-icon-lg" icon={faSpa} />
									<Modal isOpen={modals} toggleCertificationModal={toggleSpecialtyModal} >
										<ModalHeader toggleCertificationModal={toggleSpecialtyModal}>Select Your Specializations</ModalHeader>
										<ModalBody className="flex-center">
											{!appSpecialtiesList.length > 0 ? <p>Loading..</p> :
												appSpecialtiesList.map(specialty => {
													const selected = selectedSpecialties.includes(specialty.id)
													return <SpecialityCard
														handleSpecialtyClick={handleSpecialtyClick}
														specialty={specialty}
														selected={selected}
													/>
												})
											}

										</ModalBody>
										<ModalFooter>
											<Button type='submit' color="primary" onClick={handleSpecFinish}>Done</Button>
											<Button color="secondary" onClick={toggleSpecialtyModal}>Cancel</Button>
										</ModalFooter>
									</Modal>
								</div>
							</Col>
							<Col sm="6" lg="6" className="flex-center">

								<div className="modal-icon-container hover" onClick={toggleCertificationModal}>
									<Label for="cert-icon">Add Certifications</Label>
									<FontAwesomeIcon id="cert-icon" className="modal-icon-lg" icon={faCertificate} />
									<Modal isOpen={modal} toggleCertificationModal={toggleCertificationModal} >
										<ModalHeader toggleCertificationModal={toggleCertificationModal}>Post certification</ModalHeader>
										<ModalBody>
											<label>Name of Certification</label>
											<Form onSubmit={newCertification}>
												<input className='modal-input' onChange={certHandler} />
												<Button type='submit' color="primary" >POST</Button>
											</Form>
										</ModalBody>
										<ModalFooter>
											<Button color="secondary" onClick={toggleCertificationModal}>Cancel</Button>
										</ModalFooter>
									</Modal>
								</div>
							</Col>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachDetails.css';
import { Container, Modal, Media, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpa, faCertificate } from '@fortawesome/free-solid-svg-icons'

import countries from './countries'
import timezones from './timezones'


const CoachDetails = () => {

	const [image, setImage] = useState('')
	const [coachImage, setCoachImage] = useState('')
	const [loading, setLoading] = useState(false)
	const [specialty, setSpecialty] = useState([])
	const [coachSpecialty, setCoachSpecialty] = useState([])
	const [certifications, setCertifications] = useState([])
	const [coachBio, setCoachBio] = useState("")
	const [bio, setBio] = useState("")
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

	const [coachData, setCoachData] = useState({})
	const [coachSpecialties, setCoachSpecialties] = useState([])
	const [coachCertifications, setCoachCertifications] = useState([])

	//reactstrap toggle for modal

	const toggles = () => setModals(!modals);
	const toggle = () => setModal(!modal);


	const userID = useSelector(state => state.userID)

	//grabbing the users profile pic, bio, language, specialties, and certifications
	useEffect(() => {
		getData()
		axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${userID}`)
			.then(res => {
				setLoading(true)
				setCoachImage(res.data.coach.picture_url)
				setBio(res.data.coach.bio)
				setLanguage(res.data.coach.language)
				setSpecialty(res.data.specialties)
				setCertifications(res.data.certifications)

				setCoachData(res.data.coach)
				setLoading(false)
				console.log('res data', res.data)
				console.log('user id', userID)
			})
			.catch(err => {
				console.log(err)
			})
	}, [certName, userID])

	useEffect(() => {
		axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/specialties`)
			.then(res => {
				res.data.map((item, key) => {
					return setSpecId(item.id)


				})

			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	useEffect(() => {
		axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/specialties/${specId}`)
			.then(res => {
				setSpecialtyId({ ...specialtyId, sp: [...res.data] })

			})
			.catch(err => {
			})
	}, [specId, specialtyId])



	//mapping around all user specialties in order to render them 
	useEffect(() => {
		if (specialty) {
			specialty.map(spcty =>
				setCoachSpecialty([spcty.name])
			)
		}
	}, [specialty, specialties])

	//mapping around all user certifications in order to render them 
	useEffect(() => {
		certifications.map(cert => {
			return cert
		})
	}, [certifications])


	//cloudinary upload
	const uploadImage = async e => {
		const files = e.target.files
		const data = new FormData()
		data.append('file', files[0])
		data.append('upload_preset', 'square1')
		setLoading(true)
		const res = await fetch(
			'https://api.cloudinary.com/v1_1/drgfyozzd/image/upload',
			{
				method: 'POST',
				body: data
			}
		)
		const file = await res.json()

		setImage(file.secure_url)
		setLoading(false)
	}

	const getData = async event => {
		try {
			const result = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${userID}`)
			console.log("Get user data result test", result.data.coach)
			setCoachData(result.data.coach)
			setCoachSpecialties(result.data.specialties)
			setCoachCertifications(result.data.certifications)
			
		}catch(error) {
			console.log("Error getting user data", error)
		}
	}


	const handleChange = event => {
		event.preventDefault()
		setCoachData({ [event.target.name]: event.target.value })
	}

	const handleSpecialtySelect = event => {
		event.preventDefault()
		const values = event.target.value.split(',')
		const spec = { id: values[0], name: values[1] }
		// TODO - THIS IS NOT WORKING
		setCoachSpecialties(spec)



		console.log("spec test", spec)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		try {
			const updatedCoach = await axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, coachData)
			console.log("Coach Updated test", updatedCoach)
			const updatedCerts = await axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_certifications`, { "name": newCert, "coach_id": userID})
			console.log("Updated certs", updatedCerts)
			const updatedSpecs = await axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_specialty_details`, { "coach_id": userID, "specialty_id": id })
			console.log('updated specs', updatedSpecs)
			getData()
		}catch (error) {
			console.log("Error updating user", error)
		}
		
	}

	//This function is updating profile pic, language, and bio. It also sends an image to cloudinary if file is uploaded.
	const saveChanges = (e) => {
		e.preventDefault();
		e.target.reset();

		//this function is submiting the image url to the cloudinary server
		const submit = e => {
			if (image !== "") {
				axios.post('https://api.cloudinary.com/v1_1/drgfyozzd/image/upload', image)
					.then(res => {
					})
					.catch(err => {
						console.log(err)
					})
			}
		}
		//updating user's image string to serve but only if user uploads a new file
		const submitImage = () => {
			if (image !== "") {
				axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, { "picture_url": image })
					.then(res => {
						if (res.status === 200) {
							setCoachImage(image)
						}
					})
					.catch(err =>
						console.log(err))

			} else {
				return null
			}
		}

		//updates user's bio but only if user writes inside form
		const sendBio = (e) => {
			if (coachBio.length > 0) {
				axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, { "bio": coachBio })
					.then(res => {
						if (res.status === 200) {
							setBio(coachBio)
						}
					})
					.catch(err =>
						console.log(err))
			} else {
				return null
			}

		}

		//updates users language but only if user changes it inside select form
		const sendLang = () => {
			if (coachLanguage.length > 0) {
				axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, { "language": coachLanguage })
					.then(res => {
						if (res.status === 200) {
							setLanguage(coachLanguage)
						}
					})
					.catch(err =>
						console.log(err))
			}
			else {
				return null
			}
		}
		//this function is needed to execute the multiple server requests inside this saveChanges function
		axios.all([sendLang(), sendBio(), submit(), submitImage()])
			.then(axios.spread(function () {
			}))
	}

	//changes state of coachBio when user types inside form
	const chooseBio = (e) => {
		setCoachBio(e.target.value)
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



	const cert = !certifications ? <div>...Loading</div> : certifications.map((cert, key) => {
		return <li key={cert.id}>{cert.name}</li>
	})

	const special = specialty.length === 0 ? name : coachSpecialty

	const spcl = e => {
		const event = e.target.value
		const events = event.split(",")
		setId(events[0])
		setName(events[1])
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
							<Media src={coachImage} alt='Profile Image' />
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
							<Input type="text" name="email" id="email" placeholder="Email Address" onChange={handleChange} value={coachData.email} />
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
								<ModalHeader toggle={toggles}>Post a specialization</ModalHeader>
								<ModalBody>
									<label>Specialty Name</label>
									<Form onSubmit={handleSpecialtySelect}>
									{specialtyId.sp ? specialtyId.sp.map(item => {
										return <button type='button' key={item.id} value={[item.id, item.name]} onClick={handleSpecialtySelect}>{item.name}</button>
									}) : null}
									<Button type='submit' color="primary" >POST</Button>
									</Form>
								</ModalBody>
								<ModalFooter>
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









			{/* <Row >
        <Col style={{ padding: '0', margin: '0' }} id='cd' xs="6">
          <Card className='cardImg'>
            <CardImg className='card-img' top width="100%" src="https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?cs=srgb&dl=man-about-to-lift-barbell-2261477.jpg&fm=jpg" alt="Card image cap" />
            <CardBody className='card-body'>
              <CardTitle>Certifications</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>{cert}</CardText>


              <div>
                <Button color="primary" onClick={toggle}>Add Certification</Button>
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
            </CardBody>
          </Card>
        </Col>
        <Col style={{ padding: '0', margin: '0' }} xs="6">
          <Card>
            <CardImg className='card-img' top width="100%" src="https://images.pexels.com/photos/9267/earth-summer-garden-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Card image cap" />
            <CardBody className='card-body'>
              <CardTitle>Specialty</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>{specName ? name : special}</CardText>


              <div>
                <Button color="primary" onClick={toggles}>Add Specialty</Button>
                <Modal isOpen={modals} toggle={toggles} >
                  <ModalHeader toggle={toggles}>Post a specialization</ModalHeader>
                  <ModalBody>
                    <label>Specialty Name</label>
                    <Form onSubmit={newSpecialty}>
                      {specialtyId.sp ? specialtyId.sp.map(item => {
                        return <button type='button' key={item.id} value={[item.id, item.name]} onClick={spcl}>{item.name}</button>
                      }) : null}
                      <Button type='submit' color="primary" >POST</Button>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggles}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </div>


            </CardBody>
          </Card>
        </Col>
      </Row>

      <form onSubmit={saveChanges}>
        <Row className='img-row'>
          <Col style={{ paddingTop: '30px' }} xs="6">
            <h4>Your profile picture</h4>
            <img src={coachImage} style={{ width: '95px' }} alt='' />
          </Col>
          <Col style={{ paddingTop: '30px' }} xs="6">

            <h1 className='upload-image-text'>Upload New Image</h1>
            {loading ? (
              <h3>Loading...</h3>
            ) : (
                <img src={image} style={{ width: '50px' }} alt='' />
              )}
            <FormGroup row>
              <Input type="file" name="file" id="exampleFile" color='white' onChange={uploadImage} />
              <FormText color="white">
                This is some placeholder block-level help text for the above input.
                It's a bit lighter and easily wraps to a new line.
          </FormText>

            </FormGroup>
          </Col>
        </Row>
        <Row className='bio-lang'>
          <Col xs="6">
            <div className='bio'>
              <label>Current Bio</label>
              <p className='bio-text-current'>{bio}</p>
              <FormGroup>
                <Label for="exampleText">Change Bio</Label>
                <Input type="textarea" onChange={chooseBio} name="text" id="exampleText" className='bio-text-new' />
              </FormGroup>
            </div>
          </Col>
          <Col xs="6"><h6>Current Language</h6>
            <p className='lang-current'>{language}</p>
            <select className="language" onChange={langChange}>
              <option>Change language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
            </select>
          </Col>
        </Row>
        <div>
        </div>
        <Button style={{ marginTop: '20px', marginBottom: '20px' }} type='submit' className='changes-button' color="primary" size="lg" block>SAVE CHANGES</Button>
      </form> */}
			<form onSubmit={handleSubmit}>
				<Button style={{ marginTop: '20px', marginBottom: '20px' }} type='submit' className='changes-button' color="primary" size="lg" block>SAVE CHANGES</Button>
			</form>


		</Container>
	)

}

export default CoachDetails;
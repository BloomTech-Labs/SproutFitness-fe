import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachDetails.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { IncomingMessage } from 'http';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../../actions/index.js';




const CoachDetails = (props) => {
  
    const [image, setImage] = useState('')
    const [coachImage, setCoachImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [specialty, setSpecialty] = useState([])
    const [coachSpecialty, setCoachSpecialty] = useState([])
    const [certifications, setCertifications] = useState([])
    const [coachCertifications, setCoachCertifications] = useState([])
    const [coachBio, setCoachBio] = useState("")
    const [bio, setBio] = useState("")
    const [className, setClassName] = useState(false)
    const [language, setLanguage] = useState("") 
    const [coachLanguage, setCoachLanguage] = useState("") 
    const [specName, setSpecName] = useState('');
    const [certName, setCertName] = useState('');
    const [newCert, setnewCert] = useState([]);
    const [id] = useState(2);
    const [modals, setModals] = useState(false);
    const [modal, setModal] = useState(false);
//reactstrap toggle for modal
    
    const toggles = () => setModals(!modals);
    const toggle = () => setModal(!modal);


    const userID = useSelector(state => state.userID)
    const dispatch = useDispatch();
    console.log('id', userID)
  
console.log(props)
//grabbing the users profile pic, bio, language, specialties, and certifications
useEffect(() => {
    axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${userID}`)
    .then(res => {
      console.log('res', res)

        setCoachImage(res.data.coach.picture_url)
        setBio(res.data.coach.bio)
        setLanguage(res.data.coach.language)
        setSpecialty(res.data.specialties)
        setCertifications(res.data.certifications)
        
    })
    .catch(err => {
        console.log(err)
    })
}, [])


//mapping around all user specialties in order to render them 
useEffect(() => {
const spec = specialty.map(spcty => {
   setCoachSpecialty([spcty.name])
 })
},[specialty])

//mapping around all user certifications in order to render them 
useEffect(() => {
    const cert = certifications.map(cert => {
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


  

//This function is updating profile pic, language, and bio. It also sends an image to cloudinary if file is uploaded.
  const saveChanges = (e) => { 
    e.preventDefault();
    e.target.reset();

    //this function is submiting the image url to the cloudinary server
    const submit = e => {
      if(image !== ""){
        axios.post('https://api.cloudinary.com/v1_1/drgfyozzd/image/upload', image)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    } 
    //updating user's image string to serve but only if user uploads a new file
const submitImage = () => {
        if (image !== "") {
        axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, { "picture_url": image } )
        .then(res => {
            console.log(res)
            if(res.status === 200) {
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
        axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, { "bio": coachBio } )
        .then(res => {
            console.log(res.status)
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
        axios.put(`https://sprout-fitness-be-staging.herokuapp.com/api/coaches/${userID}`, { "language": coachLanguage } )
        .then(res => {
            console.log(res)
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
          .then(axios.spread(function (){
          })) 
      }
 
  //changes state of coachBio when user types inside form
      const chooseBio = (e) => {   
          setCoachBio(e.target.value)
      }

      console.log(coachImage)


// changes the state of coachLanguage when a user clicks on option in select form  
    const langChange = e => {
      setCoachLanguage(e.target.value)
    }
    console.log('cb', coachBio)

    const certHandler = e => {
      setnewCert(e.target.value)
    }

    const newCertification = (e) => {
            e.preventDefault();
          axios.post(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_certifications`, {"name": newCert, "coach_id": `${userID}`})
            .then(res => {
              console.log(res)
          })
          .catch(err =>
              console.log(err))
      }
    
      const specHandler = e => {
        setSpecName(e.target.value)
      }
     
    const cert = certifications.length === 0 ?  <p>...Loading</p>  : certifications.map(cert => {
      return  <p className='card-text'>{cert.name}</p>
      })
      console.log('cert', cert)

console.log('newcert', newCert)
    console.log('c', certifications)
    return (
        <div className='container'>
 
            <Row >     
        <Col body inverse style={{padding: '0', margin: '0'}} id='cd' xs="6">
            <Card className='cardImg'>
            <CardImg  className='card-img' top width="100%" src="https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?cs=srgb&dl=man-about-to-lift-barbell-2261477.jpg&fm=jpg" alt="Card image cap" />
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
         <Col body inverse style={{padding: '0', margin: '0'}} xs="6">
            <Card classname='card-img'>
            <CardImg className='card-img' top width="100%" src="https://images.pexels.com/photos/9267/earth-summer-garden-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Card image cap" />
            <CardBody className='card-body'>
            <CardTitle>Specialty</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText><p className='card-text'>{specialty.length === 0 ?  <p>...Loading</p>  : <p className='card-text'>coachSpecialty</p>}</p></CardText>


            <div>
      <Button color="primary" onClick={toggles}>Add Specialty</Button>
      <Modal isOpen={modals} toggle={toggles} className={className}>
        <ModalHeader toggle={toggle}>Post a specialization</ModalHeader>
        <ModalBody>
        <label>Specialty Name</label>
        <Form>
            <input className='modal-input' onChange={specHandler} type="text" name="name" id="exampleEmail" placeholder="" />
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
      </Row>

    <form onSubmit={saveChanges}>
      <Row className='img-row'>
        <Col body inverse style={{paddingTop: '30px'}} xs="6">
        <h4>Your profile picture</h4>
            <img src={coachImage} style={{width: '185px'}} />
        </Col>
        <Col body inverse style={{paddingTop: '30px'}} xs="6">
        
        <h1 className='upload-image-text'>Upload New Image</h1>
                {loading ? (
                    <h3>Loading...</h3>
                ): (
                <img src={image} style={{width: '50px'}} />
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
            <Button body inverse style={{marginTop: '20px', marginBottom: '20px'}} type='submit' className='changes-button' color="primary" size="lg" block>SAVE CHANGES</Button>
            </form>
           
        </div>
    )

}

export default CoachDetails;
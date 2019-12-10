import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachDetails.css';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const CoachDetails = () => {
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
    

   
    


useEffect(() => {
    axios.get('http://localhost:5000/api/coach_helpers/coach/data/2')
    .then(res => {
        setSpecialty(res.data.specialties)
    })
    .catch(err => {
        console.log(err)
    })
}, [])

useEffect(() => {
    axios.get('http://localhost:5000/api/coach_helpers/coach/data/2')
    .then(res => {
        setCertifications(res.data.certifications)
    })
    .catch(err => {
        console.log(err)
    })
}, [])

useEffect(() => {
    axios.get('http://localhost:5000/api/coach_helpers/coach/data/2')
    .then(res => {
        console.log(res.data.coach.picture_url)
        setBio(res.data.coach.bio)
        setLanguage(res.data.coach.language)
        
    })
    .catch(err => {
        console.log(err)
    })
}, [])
useEffect(() => {
    axios.get('http://localhost:5000/api/coach_helpers/coach/data/2')
    .then(res => {
        console.log(res.data)
        setCoachImage(res.data.coach.picture_url)
        
    })
    .catch(err => {
        console.log(err)
    })
}, [])
console.log('bio',coachBio)
console.log(language)

useEffect(() => {
const spec = specialty.map(spcty => {
   setCoachSpecialty([spcty.name])
 })
},[specialty])

useEffect(() => {
    const cert = certifications.map(cert => {
        return cert
    })
}, [certifications])




console.log('coachImg', coachImage)
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


  



  const langChange = e => {
    setCoachLanguage(e.target.value)
  }

  const saveChanges = () => { 

    const submit = e => {
        axios.post('https://api.cloudinary.com/v1_1/drgfyozzd/image/upload', image)
          
    } 

    const submitImage = e => {
        axios.put("http://localhost:5000/api/coaches/2", { "picture_url": image } )
        .then(res => {
            console.log(res)
        })
        .catch(err =>
            console.log(err))
    }

    const sendBio = () => {
        if (coachBio.length > 0) {
        axios.put("http://localhost:5000/api/coaches/2", { "bio": coachBio } )
        .then(res => {
            console.log(res)
        })
        .catch(err =>
            console.log(err))
   } else {
       return null
   }

}

    const sendLang = () => {
        if (coachLanguage.length > 0) {
        axios.put("http://localhost:5000/api/coaches/2", { "language": coachLanguage } )
        .then(res => {
            console.log(res)
        })
        .catch(err =>
            console.log(err))
    }
    else {
        return null
    }
}
        
        axios.all([sendLang(), sendBio(), submit(), submitImage()])
          .then(axios.spread(function (language, bio){

          })) 
              
          
      }
 
      const chooseBio = (e) => {   
          setCoachBio(e.target.value)
      }
    
      console.log('image', image)

    return (
        <div className='container'>
            <Row >     
        <Col body inverse style={{padding: '0', margin: '0'}} id='cd' xs="6">
            <Card className='cardImg'>
            <CardImg  className='card-img' top width="100%" src="https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?cs=srgb&dl=man-about-to-lift-barbell-2261477.jpg&fm=jpg" alt="Card image cap" />
            <CardBody className='card-text'>
            <CardTitle>Certifications</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>{certifications.length === 0 ?  <p>...Loading</p>  : certifications.map(cert => {
                        return <h3>
                            <h3>{cert.name}</h3>
                        </h3>
                        })}</CardText>
                        <Button>Add Certification</Button>
            </CardBody>
        </Card>
        </Col>
         <Col body inverse style={{padding: '0', margin: '0'}} xs="6">
            <Card classname='card-img'>
            <CardImg className='card-img' top width="100%" src="https://images.pexels.com/photos/9267/earth-summer-garden-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Card image cap" />
            <CardBody className='card-text'>
            <CardTitle>Specialty</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText><h3>{coachSpecialty}</h3></CardText>
            <Button>Add Specialty</Button>
            </CardBody>
        </Card>
        </Col>
      </Row>

    <form onSubmit={saveChanges}>
      <Row className='img-row'>
        <Col body inverse style={{paddingTop: '30px'}} xs="6">
        <h4>Your profile picture</h4>
            <img src={coachImage} style={{width: '250px'}} />
        </Col>
        <Col body inverse style={{paddingTop: '30px'}} xs="6">
        <h1 className='upload-image-text'>Upload Image</h1>
                {loading ? (
                    <h3>Loading...</h3>
                ): (
                <img src={image} style={{width: '10px'}} />
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachDetails.css';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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
        <div>
            <div className='specialty-certifications'>
                <div className="specialties-container">
                    <h4>Specialties</h4>
                    {!coachSpecialty ? <p>...Loading</p> : <p>{coachSpecialty}</p>}

                </div>
                <div>
                    <h4>Certifications</h4>
                {certifications.length === 0 ?  <p>...Loading</p>  : certifications.map(cert => {
                    return <h1 className='specialty-button'>
                        <p>{cert.name}</p>
                    </h1>
                    })}
                </div>
            </div>
            <img src={coachImage} style={{width: '70px'}} />

            <h1>Upload Image</h1>
                <form onSubmit={saveChanges}>
                {loading ? (
                    <h3>Loading...</h3>
                ): (
                <img src={image} style={{width: '70px'}} />
                )}
                <FormGroup onSubmit={saveChanges} row>
        <Label for="exampleFile" sm={2}>File</Label>
        <Col sm={10}>
          <Input type="file" name="file" id="exampleFile" onChange={uploadImage} />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </Col>
      </FormGroup>
            <div>
                <h6>Language</h6>
               <p>{language}</p> 
                <select className="language" onChange={langChange}>
                    <option>Pick a language</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                </select>
            </div> 
            <div>
                <h6>Bio</h6>
                <p>{bio}</p>
                <textarea onChange={chooseBio} className="bio" type="text">
                </textarea>
            </div>
            <Button type="submit">SAVE CHANGES</Button>
            </form>
        </div>
    )

}

export default CoachDetails;
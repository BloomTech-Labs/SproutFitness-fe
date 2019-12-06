import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CoachDetails.css';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const CoachDetails = () => {
    const [image, setImage] = useState('')
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


    


  const pickNutrition = e => {
      e.preventDefault();
      setSpecialty('Nutrition')
  }

  const pickFamily = e => {
    e.preventDefault();
    setSpecialty('Family Health')

}

const pickFitness = e => {
    e.preventDefault();
    setSpecialty('Fitness')

}


useEffect(() => {
    axios.get('http://localhost:5000/api/coach_helpers/coach/data/1')
    .then(res => {
        setSpecialty(res.data.specialties)
    })
    .catch(err => {
        console.log(err)
    })
}, [])

useEffect(() => {
    axios.get('http://localhost:5000/api/coach_helpers/coach/data/1')
    .then(res => {
        setCertifications(res.data.certifications)
    })
    .catch(err => {
        console.log(err)
    })
}, [])

useEffect(() => {
    axios.get('http://localhost:5000/api/coach_helpers/coach/data/1')
    .then(res => {
        console.log(res.data)
        setCoachBio(res.data.coach.bio)
        setLanguage(res.data.coach.language)
        
    })
    .catch(err => {
        console.log(err)
    })
}, [])
console.log('bio',bio)

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


  const submit = e => {
      e.preventDefault();
      axios.post('https://api.cloudinary.com/v1_1/drgfyozzd/image/upload', image)
        
  } 



  const langChange = e => {
    setCoachLanguage(e.target.value)
  }

  const changeLanguage = () => {

        function sendLang() {
            axios.post("", language)
        } 
        
        
        // axios.all([sendLang(), sendBio()])
        //   .then(axios.spread(function (language, bio){

        //   })) 
              
          
      }
      const sendBio = () => {
        axios.put("http://localhost:5000/api/coaches/1", { "bio": bio } )
        .then(res => {
            console.log(res)
        })
        .catch(err =>
            console.log(err))
    }

    const sendLang = () => {
        if (coachLanguage.length > 0) {
        axios.put("http://localhost:5000/api/coaches/1", { "language": coachLanguage } )
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


      const chooseBio = (e) => {
          setBio(e.target.value)
      }

console.log('lang',language)
console.log('coachLang',coachLanguage)


    return (
        <div>
            <h1>Upload Image</h1>
            
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


                <form onSubmit={sendBio}>
                {/* {loading ? (
                    <h3>Loading...</h3>
                ): (
                <img src={image} style={{width: '300px'}} />
                )}
                <FormGroup onSubmit={submit} row>
        <Label for="exampleFile" sm={2}>File</Label>
        <Col sm={10}>
          <Input type="file" name="file" id="exampleFile" onChange={uploadImage} />
          <FormText color="muted">
            This is some placeholder block-level help text for the above input.
            It's a bit lighter and easily wraps to a new line.
          </FormText>
        </Col>
      </FormGroup>*/}
            <div>
                <h6>Language</h6>
                {coachLanguage.length === 0 ? <p>{language}</p> : <p>{coachLanguage}</p>}
                <select className="language" onChange={langChange}>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                </select>
            </div> 
            <div>
                <h6>Bio</h6>
                {!coachBio ? null : <p>{coachBio}</p>}
                <textarea onChange={chooseBio} className="bio" type="text">
                </textarea>
            </div>
            <Button onClick={sendBio}>SAVE CHANGES</Button>
            </form>
        </div>
    )

}

export default CoachDetails;
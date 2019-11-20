import React, { useState} from 'react';
import axios from 'axios';
import './CoachDetails.css';

const CoachDetails = () => {
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [specialty, setSpecialty] = useState(["Nutrition", "Family Health", "Fitness"])
    const [certifications, setCertifications] = useState(["Hero", "The Best", "Fitness"])
    
    const [className, setClassName] = useState(false)


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

const addCert = e => {
    e.preventDefault();
    axios.post('',)
        
}

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

    const getSpecialty = () => {
        axios.get('')

    }

  const submit = e => {
      e.preventDefault();
      axios.post('https://api.cloudinary.com/v1_1/drgfyozzd/image/upload', image)
        
  } 

console.log(specialty)

    return (
        <div>
            <h1>Upload Image</h1>
            <form onSubmit={submit}>
                <input
                    placeholder='choose picture'
                    onChange={uploadImage}
                    type='file'
                    name='file'
                />
            </form>
                {loading ? (
                    <h3>Loading...</h3>
                ): (
                <img src={image} style={{width: '300px'}} />
                )}
            <div className='specialty-certifications'>
                <div>
                {  specialty.map(specialty => {
                    return <h1 className='specialty-button'>
                        <p>{specialty}</p>
                    </h1>
                    })}
                </div>
                <div>
                {certifications.map(certifications => {
                    return <h1 className='specialty-button'>
                        <p>{certifications}</p>
                    </h1>
                    })}
                </div>
            </div>

                {/* <div>
                    <div className='specialty-container'>
                        <button onClick={pickNutrition} className='specialty-button'>
                            <p>Nutrition</p>
                        </button>
                    <div>
                        <button onClick={pickFamily} className='specialty-button'>
                            <p>Family Health</p>
                        </button>
                     </div>
                        <button onClick={pickFitness} className='specialty-button'>
                            <p>Fitness</p>
                        </button>
                    </div>
                </div> */}

        </div>
    )

}

export default CoachDetails;
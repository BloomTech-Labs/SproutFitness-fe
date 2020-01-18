import React, { useState, useEffect } from 'react';
import { Container, Modal, Media, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'

import SpecialityCard from './SpecialtyCard'
import './CoachDetails.css';

const SpecialtySelectModal = (props) => {

    const [isLoading, setIsLoading ] = useState(false)
    const [appSpecialtiesList, setSpecialtiesList] = useState([])
    const [selectedSpecialties, setSelectedSpecialties] = useState([])

    useEffect(() => {
        const setUpState = async () => {
            setIsLoading(true)
            
            try {
                const user_id = props.userID
                const coach = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${user_id}`)
                const app_spec_list = await axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/specialties`) // list of specialties available from server

                setSpecialtiesList(app_spec_list)
                if(coach.specialties > 0) {
                    setSelectedSpecialties(coach.specialties)   // the the user's already saved specialties into state if they have some
                }
                setIsLoading(false)
                
            }catch(error) {
                setIsLoading(false)
                console.log("Error getting user data", error)
            }
        }

        setUpState()
        

    }, [props.userID])

    function toggleSelect (event) {
        
        console.log('what is the id', event.target.id)
    }
    

    return (
        <div>
            <Modal >
            <ModalHeader >Post a specialization</ModalHeader>
            <ModalBody>
                {!appSpecialtiesList.length > 0 ? <p>No Specialties</p> : 
                    appSpecialtiesList.map(appSpecialty => {
                        return (
                            <div>
                                <SpecialityCard wtf="hi" appSpecialty={appSpecialty} selectedSpecialties={selectedSpecialties} toggleSelect={toggleSelect} id={appSpecialty.id}/>
                                {/* <label>{appSpecialty.name}</label>
                                <Form>
                                    <button type='button' key={appSpecialty.id} value={[appSpecialty.id, appSpecialty.name]} >{appSpecialty.name}</button>
                                    <Button type='submit' color="primary" >POST</Button>
                                </Form> */}
                            </div>
                            
                        )
                    })
                }
                
                <Button type='submit' color="primary" >POST</Button>
                
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" >Cancel</Button>
            </ModalFooter>
            </Modal> 
            
        </div>
    )
}

export default SpecialtySelectModal;
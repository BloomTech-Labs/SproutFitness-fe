import React, { Fragment, useState } from 'react';
import { Container, Modal, CardFooter, Media, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpa, faCertificate } from '@fortawesome/free-solid-svg-icons'

const SpecialtyCard = (props) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleClick = event => {
        event.preventDefault()
        setIsSelected(!isSelected)
        props.handleSpecialtyClick(event)
    }
    console.log("is selected?", isSelected)
    return (
        <Card className={isSelected ? 'specialty-card selected' : 'specialty-card'}  name={props.specialty.name} id={props.specialty.id}  >
            <CardTitle>
                {props.specialty.name}
            </CardTitle>
            
            <CardBody>
                <FontAwesomeIcon icon={faSpa} />
            </CardBody>
            <CardFooter>
                <Button onClick={handleClick} name={props.specialty.name} id={props.specialty.id}>Select</Button>
            </CardFooter>
          
        </Card>
    )
}

export default SpecialtyCard;
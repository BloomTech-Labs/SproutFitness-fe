import React, { useState, useEffect } from 'react';
import {  ListGroupItem } from 'reactstrap';


const SpecialtyCard = (props) => {
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if(props.selected === true) {
            setIsSelected(true)
        }
    },[props.selected])
    

    const handleClick = event => {
        event.preventDefault()
        setIsSelected(!isSelected)
        props.handleSpecialtyClick(event)
    }
    return (

        <ListGroupItem className={isSelected ? 'specialty-card selected' : 'specialty-card'}  name={props.specialty.name} id={props.specialty.id} selected={isSelected} onClick={handleClick}>
            {props.specialty.name}
        </ListGroupItem>
    )
}

export default SpecialtyCard;
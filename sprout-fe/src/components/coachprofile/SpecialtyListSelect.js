import React from 'react';
import { ListGroup } from 'reactstrap';

import SpecialityCard from './SpecialtyCard'

const SpecialtyListSelect = (props) => {

    return (
        <ListGroup className="specialty-select-group">
            {
                !props.appSpecialtiesList.length > 0 ? <p>Loading..</p> :
                    props.appSpecialtiesList.map(specialty => {
                        const selected = props.selectedSpecialties.includes(specialty.id)
                        return <SpecialityCard
                            handleSpecialtyClick={props.handleSpecialtyClick}
                            specialty={specialty}
                            selected={selected}
                        />
                    })
            }
        </ListGroup>
    )
}

export default SpecialtyListSelect;
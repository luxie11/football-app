import React from 'react';
import './ClubDetailsBox.css'

const ClubDetailsBox = (props) =>{
    return(
        <div className="club-details">
            <div className="information-title">
                <label>{props.title}</label>
            </div>
            <div className="information-box">
                {props.information}
            </div>
        </div>
    )
}

export default ClubDetailsBox;
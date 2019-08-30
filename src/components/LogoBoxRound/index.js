import React from 'react';
import './LogoBoxRound.css';

const LogoBoxRound = (props) =>{
    return(
        <div className={`logo-box ${props.centered ? 'centered' : ''}`}>
            <div className="logo-div">
                <img 
                    className="logo" 
                    src={props.imgSrc}  
                    alt={props.altText}
                />
            </div>
        </div>
    )
}

export default LogoBoxRound;
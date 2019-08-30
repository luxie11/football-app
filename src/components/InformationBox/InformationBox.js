import React from 'react';
import './InformationBox.css';

const InformationBox = (props) =>{
    return(
        <div className="info-box">
            <div className="box-title">
                {props.title}
            </div>
            <div className="box">
                {props.children}
            </div>
        </div>
    )
}

export default InformationBox;
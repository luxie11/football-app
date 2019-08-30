import React from 'react';
import './Row.css'

const Row = (props) =>{
    return(
        <div className={`row ${props.alignCenter ? 'align-center' : ''}`}>
            {props.children}
        </div>
    )
}

export default Row;
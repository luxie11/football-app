import React from 'react';
import './simple-grid.css';

const Column = (props) =>{
    return(
        <div className={`col-${props.col}`}>
            {props.children}
        </div>
    )
}

export default Column;
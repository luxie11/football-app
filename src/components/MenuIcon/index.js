import React, { useState } from 'react';
import './MenuIcon.css';
import { connect } from 'react-redux';
import { 
    setMobileMenuState
 } from '../../actions';

const MenuIcon = (props) =>{
    return(
        <div 
            className={`mobile-menu ${props.isActive ? 'change' : ''}`}
            onClick={()=>{
                props.setMobileMenuState()
            }}
        >
            <div className="bar-up"/>
            <div className="bar-center"/>
            <div className="bar-down"/>
        </div>
    );
}

const mapStateToProps = (state) =>{
    return{
        isActive: state.viewPort.isMobileMenuOpened
    }
}

export default connect(mapStateToProps, {
    setMobileMenuState
})(MenuIcon);
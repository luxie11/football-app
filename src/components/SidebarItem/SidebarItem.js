import React from 'react';
import './SidebarItem.css';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { 
    setMobileMenuStateToFalse
 } from '../../actions';

const SidebarItem = (props) =>{
    const handleClickEvent = () => {return props.onClickEvent ? props.onClickEvent : null} ;
    return(
        <div onClick={handleClickEvent()} className="sidebar-item">
            <NavLink exact className="link" to={
                { pathname:props.link }
            }>
                { props.name }
            </NavLink>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        mobileMenuState: state.viewPort.isMobileMenuOpened,
        windowWidth: state.viewPort.windowWidth
    }
}

export default connect(mapStateToProps,{
    setMobileMenuStateToFalse
})(SidebarItem);
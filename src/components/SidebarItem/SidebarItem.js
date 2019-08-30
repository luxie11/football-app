import React from 'react';
import './SidebarItem.css';
import { NavLink } from 'react-router-dom';

const SidebarItem = (props) =>{
    return(
        <div onClick={ props.onClickEvent ? props.onClickEvent : null } className="sidebar-item">
            <NavLink exact className="link" to={
                { pathname:props.link }
            }>
                { props.name }
            </NavLink>
        </div>
    )
}

export default SidebarItem;
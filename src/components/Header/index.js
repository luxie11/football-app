import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'

import history from '../history';

class Header extends React.Component{

    renderBreadcrum(){
        const path = history.location.pathname;
        if(path === "/"){
            return <Link className="breadcrum-item" to="/">Home</Link>;
        }
        const pathArray = path.split('/');
        const fullPath = [];
        return pathArray.map((path, index) =>{
            const pathArray = path.split('-');
            const pathCapitalized = pathArray.map(el =>{
                return el.charAt(0).toUpperCase() + el.slice(1);
            });
            if(path === ""){
                return null;
            }
            fullPath.push(path);
            return( 
                <React.Fragment key={path}>
                    <i className="fa fa-chevron-right arrow"></i>
                    <Link key={path} className="breadcrum-item" to={`/${fullPath.join('/')}`}>{pathCapitalized.join(' ')}</Link>
                </React.Fragment>
            )
        })
    }

    render(){
        return(
            <div className="header">
                <div className="breadcrum">
                    {this.renderBreadcrum()}
                </div>
               
            </div>
        )
    }
}

export default Header;
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import MenuIcon from '../MenuIcon';
import { connect } from 'react-redux';
import { 
    setViewPort
} from '../../actions';

import history from '../history';

class Header extends React.Component{

    componentDidMount(){
        window.addEventListener('resize', this.onWindowChange);
    }

    onWindowChange = () =>{
       this.props.setViewPort(window.innerWidth)
    }

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
            if(path === "leagues"){
                fullPath.push("leagues");
                return ( 
                    <React.Fragment key={path}>
                        <span key={path} className="breadcrum-item">{pathCapitalized.join(' ')}</span>
                    </React.Fragment>
                )
            }
            fullPath.push(path);
            return( 
                <React.Fragment key={path}>
                    <i className="fa fa-chevron-right arrow"></i>
                    <Link 
                        key={path} 
                        className={`breadcrum-item`} 
                        to={`/${fullPath.join('/')}`}
                    >{pathCapitalized.join(' ')}</Link>
                </React.Fragment>
            )
        })
    }

    renderMenuIcon(){
        if(this.props.windowWidth > 1000){
            return;
        }
        return( <MenuIcon /> );
    }

    render(){
        return(
            <header className="header">
                {this.renderMenuIcon()}
                <div className="breadcrum">
                    {this.renderBreadcrum()}
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        windowWidth: state.viewPort.windowWidth
    }
}

export default connect(mapStateToProps,{
    setViewPort
})(Header);
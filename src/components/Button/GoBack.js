import React, { Fragment, Component } from 'react';
import history from '../history';
import './GoBack.css'

class GoBack extends Component{

    onClickEvent(){
        history.goBack();
    }

    render(){
        return(
            <button onClick={()=>this.onClickEvent()} className="go-back btn">
            <i class="fa fa-arrow-left" style={{marginRight: '10px'}}></i>
                Go back
            </button>
        )
    }
}

export default GoBack;
import React from 'react';
import './SidebarDropdown.css'

class SidebarDropdown extends React.Component{

    state = { isOpened: this.props.openedState }

    onDropdownClick(){
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    renderDropdownItems(){
        if(!this.state.isOpened)
            return;
        return (
            <React.Fragment>
                { this.props.children }
            </React.Fragment>
        )
    }

    render(){
        return(
            <React.Fragment>
                <div>
                    <div className="sidebar-dropdown" onClick={()=> this.onDropdownClick()}>
                        <div className="dropdown-name">
                            {this.props.dropdownName}
                        </div>
                        <i className={`fa fa-chevron-${this.state.isOpened ? 'up' : 'down'}`}></i>
                    </div>
                    <div className="dropdown-items">
                        {this.renderDropdownItems()}
                    </div>
                </div>
            </React.Fragment>
            
        )
    }
}

export default SidebarDropdown;
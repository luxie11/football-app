import React from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import { 
    setLeagueDetails,
    setMobileMenuStateToFalse
 } from '../../actions';
 
import SidebarItem from '../SidebarItem/SidebarItem';
import SidebarDropdown from '../SidebarDropdown/SidebarDropdown';

class Sidebar extends React.Component{

    onSidebarItemClick(id,leagueName){
        this.props.setLeagueDetails(id,leagueName);
        if(this.props.windowWidth <= 1000)
            this.props.setMobileMenuStateToFalse()
    }

    render(){
        return(
            <div className={`sidebar ${this.props.mobileMenuState ? 'mobile-menu-active' : ''}`}>
                <div className="sidebar-navigation">
                    <SidebarItem  link="/" name="Home"/>
                </div>
                <SidebarDropdown dropdownName="Leagues">
                    <SidebarItem 
                        link="/leagues/premier-league" 
                        name="Premier League"
                        onClickEvent={()=>{
                            this.onSidebarItemClick(2021,'premier-league');
                    }}
                    />
                    <SidebarItem 
                        link="/leagues/bundesliga" 
                        name="Bundesliga" 
                        onClickEvent={()=>this.onSidebarItemClick(2002,'bundesliga')}
                    />
                    <SidebarItem 
                        link="/leagues/primera-division" 
                        name="Primera Division"
                        onClickEvent={()=>this.onSidebarItemClick(2014,'primera-division')}
                    />
                    <SidebarItem 
                        link="/leagues/seria-a" 
                        name="Serie A"
                        onClickEvent={()=>this.onSidebarItemClick(2019,'seria-a')}
                    />
                </SidebarDropdown>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        leagueDetails: state.league.leagueDetails,
        mobileMenuState: state.viewPort.isMobileMenuOpened,
        windowWidth: state.viewPort.windowWidth
    }
}

export default connect(mapStateToProps,{
    setLeagueDetails,
    setMobileMenuStateToFalse
})(Sidebar);
import React from 'react';
import './Sidebar.css';
import { connect } from 'react-redux';
import { setLeagueDetails } from '../../actions';

import SidebarItem from '../SidebarItem/SidebarItem';
import SidebarDropdown from '../SidebarDropdown/SidebarDropdown';

class Sidebar extends React.Component{

    render(){
        return(
            <div className="sidebar">
                <div className="sidebar-navigation">
                    <SidebarItem  link="/" name="Home"/>
                </div>
                <SidebarDropdown dropdownName="Leagues">
                    <SidebarItem 
                        link="/leagues/premier-league" 
                        name="Premier League"
                        onClickEvent={()=>this.props.setLeagueDetails(2021,'premier-league')}
                    />
                    <SidebarItem 
                        link="/leagues/bundesliga" 
                        name="Bundesliga" 
                        onClickEvent={()=>this.props.setLeagueDetails(2002,'bundesliga')}
                    />
                    <SidebarItem 
                        link="/leagues/primera-division" 
                        name="Primera Division"
                        onClickEvent={()=>this.props.setLeagueDetails(2014,'primera-division')}
                    />
                    <SidebarItem 
                        link="/leagues/seria-a" 
                        name="Serie A"
                        onClickEvent={()=>this.props.setLeagueDetails(2019,'seria-a')}
                    />
                </SidebarDropdown>
                <SidebarDropdown dropdownName="Fixtures">
                    <SidebarItem 
                        link="/fixtures/premier-league" 
                        name="Premier League"
                    />
                    <SidebarItem 
                        link="/fixtures/bundesliga" 
                        name="Bundesliga" 
                    />
                    <SidebarItem 
                        link="/fixtures/primera-division" 
                        name="Primera Division"
                    />
                    <SidebarItem 
                        link="/fixtures/seria-a" 
                        name="Serie A"
                    />
                </SidebarDropdown>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        leagueDetails: state.league.leagueDetails
    }
}

export default connect(mapStateToProps,{
    setLeagueDetails
})(Sidebar);
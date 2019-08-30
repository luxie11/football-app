import React, { Component, Fragment } from 'react';
import './Table.css';
import history from '../history';
import { connect } from 'react-redux';

import { setSelectedClub } from '../../actions';

class LeagueTable extends Component{

    createTeamLink(e){
        const teamName = e.target.parentNode.children[1].innerHTML.split('>')[1];
        const teamNameArray = teamName.split(' ');
        const link = teamNameArray.map(el => el.toLowerCase()).join('-');
        return link;
    }

    onRowClick(e, clubID, leagueID){
        const teamLink = this.createTeamLink(e);
        history.push(`/leagues/${this.props.leagueTitle}/${teamLink}`);
        this.props.setSelectedClub(clubID, leagueID, teamLink)
    }

    renderLeagueTable(){
        const { standings } = this.props;
        if(!standings){
            return;
        }
        return standings.standings[0].table.map(el=>{
            return(
                <tr data-club-id={el.team.id}  
                    onClick={(e)=>{
                       this.onRowClick(e, el.team.id, this.props.leagueID);
                    }} 
                    className="league-row" 
                    key={el.team.id}
                >
                    <td>{el.position}</td>
                    <td className="team-name">
                        <img className="team-icon" alt={el.team.name} src={el.team.crestUrl}></img> 
                        {el.team.name}
                    </td>
                    <td>{el.playedGames}</td>
                    <td>{el.won}</td>
                    <td>{el.draw}</td>
                    <td>{el.lost}</td>
                    <td>{el.goalsFor}</td>
                    <td>{el.goalsAgainst}</td>
                    <td>{el.goalDifference}</td>
                    <td>{el.points}</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>P</th>
                            <th>Team</th>
                            <th>M</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>G+</th>
                            <th>G-</th>
                            <th>GD</th>
                            <th>P</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLeagueTable()}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        selectedClub: state.club.selectedClub
    }
}

export default connect(mapStateToProps,{
    setSelectedClub
})(LeagueTable);
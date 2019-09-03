import React, { Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { 
    getClubInformation,
    getClubFixtures,
    getClubNextMatches,
    getLeagueStandings,
    clearClubInformation
} from '../../actions';
import './Club.css';
import countryCode from '../countryCode';
import history from '../history';

import Header from '../Header';
import InformationBox from '../InformationBox/InformationBox';
import Container from '../Container/Container';
import LogoBoxRound from '../LogoBoxRound';
import Column from '../Column';
import Loader from '../Loader';
import Row from '../Row';
import ShortenedTable from '../Tables/ShortenedTable';
import ClubDetailsBox from '../ClubDetailsBox/';
import PlayersTable from '../Tables/PlayersTable';
import GoBack from '../Button/GoBack';

class Club extends Component{

    componentDidMount(){
        this.props.clearClubInformation();
        if(!this.props.selectedClub){
            history.push(`/leagues/${this.props.match.params.name}`)
        } else{
            setTimeout(()=>{
                this.fetchInformation();
            }, 3000)
        }
    }

    fetchInformation(){

        this.props.getClubInformation(this.props.selectedClub.clubID);
        this.props.getClubFixtures(this.props.selectedClub.clubID);
        this.props.getClubNextMatches(this.props.selectedClub.clubID);
    }

    renderClubImage(){
        try{
            return <LogoBoxRound 
                        imgSrc={this.props.clubInformation.crestUrl} 
                        altText={this.props.clubInformation.shortName}
                    />
        } catch(e){
            return ;
        }
    }

    getWinningTeam(match){
        const selectedTeamName = this.props.selectedClub.title.split('-');
        let selectedTeamSide = match.homeTeam.name.toLowerCase() === selectedTeamName.join(' ') ? "HOME_TEAM" : "AWAY_TEAM";
        if(selectedTeamSide === match.score.winner){
            return {
                title: 'WIN',
                backgroundColor: '#3A927F'
            }
        } else if(match.score.winner === "DRAW"){
            return {
                title: 'DRAW',
                backgroundColor: '#ff7b28'
            }
        } else{
            return {
                title: 'LOSE',
                backgroundColor: '#a73c3c'
            }
        }
    }

    renderClubPreviousMatches(){
        return this.props.previousMatches.matches.map((match, index) =>{
            let winningTeam = this.getWinningTeam(match);
            return(
                <tr className="fixture-row" key={match.id}>
                    <td className="fixture-team-name">{match.homeTeam.name}</td>
                    <td className="fixture-club-result">{match.score.fullTime.homeTeam} </td>
                    <td className="fixture-label">
                        <div style={{backgroundColor: `${winningTeam.backgroundColor}`}}>
                            {winningTeam.title}
                        </div>
                    </td>
                    <td className="fixture-club-result">{match.score.fullTime.awayTeam}</td>
                    <td className="fixture-team-name">{match.awayTeam.name}</td>
                </tr>
            )
        })
    }
    
    renderGoBackButton(){
        if(history.location.pathname !== '/'){
            return <GoBack />
        } 
    }

    renderNextMatcesTable(){
        var { nextMatches } = this.props;
        const selectedTeamName = this.props.selectedClub.title.split('-').join(' ');
        return nextMatches.matches.map(match => {
            return(
                <tr key={match.id}>
                    <td className="next-match-time">{match.utcDate.replace('T', ' ').replace('Z', ' ')}</td>
                    <td className="next-match-home-team" 
                        style={{color:`${selectedTeamName === match.homeTeam.name.toLowerCase() ? '#908e90' : 'white'}`}}
                    >
                        {match.homeTeam.name}
                    </td>
                    <td className="versus-div">-</td>
                    <td className="next-match-away-team"
                        style={{color:`${selectedTeamName === match.awayTeam.name.toLowerCase() ? '#908e90' : 'white'}`}}
                    >{match.awayTeam.name}</td>
                </tr>
            )
        })
    }
    

    renderClubTitle(){
        const nationalityCode = countryCode[this.props.clubInformation.area.name].toLowerCase();
        return(
            <Fragment>
                <div className="club-title">
                    <h3>
                        {this.props.clubInformation.name}
                    </h3>
                </div>
                <div className="club-country">
                    <img 
                        alt={nationalityCode}
                        src={require(`../../images/flags/${nationalityCode}.svg`)}
                    />
                </div>
            </Fragment>
        )
    }

    getClubCoach(){
        for(let i = this.props.clubInformation.squad.length - 1; i >= 0; i--){
            if(this.props.clubInformation.squad[i].role === "COACH"){
                return this.props.clubInformation.squad[i].name
            }
        }
    }

    renderClubInformation(){
        return(
            <Fragment>
                <ClubDetailsBox title="tla" information={this.props.clubInformation.tla}/>
                <ClubDetailsBox title="Colors"  information={this.props.clubInformation.clubColors}/>
                <ClubDetailsBox title="Founded"  information={this.props.clubInformation.founded}/>
                <ClubDetailsBox title="Coach" information={this.getClubCoach()}/>
                <ClubDetailsBox title="Stadium" information={this.props.clubInformation.venue}/>
                <ClubDetailsBox title="Phone" information={this.props.clubInformation.phone}/>
            </Fragment>
        )
    }

    renderPlayersTable(){
        return <PlayersTable players={this.props.clubInformation.squad} />
    }
    
    renderShortenedTable(){
        return  <ShortenedTable
                    standings={this.props.standings}
                    clubName={this.props.clubInformation.name} 
                />
    }

    renderPage(){
        if(!this.props.clubInformation || 
            !this.props.standings ||
            !this.props.nextMatches ||
            !this.props.previousMatches ||
            !this.props.selectedClub){
            return <Loader />
        }
        return(
            <Fragment>
                <GoBack />
                <Row alignCenter="true">
                    <Column col="4">
                        <Column col="4">
                            {this.renderClubImage()}
                        </Column >
                        <Column col="8">
                            {this.renderClubTitle()}
                        </Column >
                    </Column >
                    <Column col="8">
                        {this.renderClubInformation()}
                    </Column >
                </Row>
                <Row>
                    <Column col="7">
                        {this.renderPlayersTable()}
                    </Column>
                    <Column col="5">
                        <Column col="12">
                            {this.renderShortenedTable()}
                        </Column>
                        <Column col="12">
                            <InformationBox title="Next Matches">
                                <table>
                                    <tbody>
                                        {this.renderNextMatcesTable()}
                                    </tbody>
                                </table>
                            </InformationBox>
                        </Column>
                        <Column col="12">
                            <InformationBox title="Fixtures">
                                <table>
                                    <tbody>
                                        {this.renderClubPreviousMatches()}
                                    </tbody>
                                </table>
                            </InformationBox>
                        </Column>
                    </Column>
                </Row>
            </Fragment>
        )
    }

    render(){
        return(
            <Fragment>
                <Header />
                <Container>
                    {this.renderPage()}
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        clubInformation: state.club.clubInformation,
        selectedClub: state.club.selectedClub,
        previousMatches: state.club.previousMatch,
        nextMatches: state.club.nextMatches,
        standings: state.league.standings
    }
}

export default connect(mapStateToProps,{
    getClubInformation,
    getClubFixtures,
    getClubNextMatches,
    getLeagueStandings,
    clearClubInformation
})(Club);
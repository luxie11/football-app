import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import './Leagues.css';
import countryCode from '../countryCode';

import { 
    getLeagueStandings, 
    getLeagueTopScorers,
    getLeagueFixtures,
    setLeagueDetails,
    clearLeagueInformation
} from '../../actions';

import Header from '../Header';
import InformationBox from '../InformationBox/InformationBox';
import Container from '../Container/Container';
import LogoBoxRound from '../LogoBoxRound';
import LeagueTable from '../Tables/LeagueTable';
import Column from '../Column';
import Loader from '../Loader';
import Row from '../Row'

class Leagues extends Component{

    componentDidMount(){
        this.getLeagueID();
        setTimeout(()=>{
            this.fetchInformation();
        }, 5000)
    }

    componentDidUpdate(prevProps){
        if(prevProps.leagueDetails !== this.props.leagueDetails){
            this.props.clearLeagueInformation();
            this.fetchInformation();
        }
    }
    
    fetchInformation(){
        this.props.getLeagueStandings(this.props.leagueDetails.leagueID);
        this.props.getLeagueTopScorers(this.props.leagueDetails.leagueID);
        this.props.getLeagueFixtures(this.props.leagueDetails.leagueID);
    }
       

    getLeagueID(){
        const leagueName = this.props.match.params.name;
        let leagueID = 0;
        if(leagueName === 'bundesliga'){
            leagueID = 2002;
        } else if(leagueName === 'primera-division'){
            leagueID = 2014;
        } else if(leagueName === 'seria-a'){
            leagueID = 2019;
        } else if(leagueName === 'premier-league'){
            leagueID = 2021;
        }
        return this.props.setLeagueDetails(leagueID, leagueName)
    }

    renderLeagueImage(){
        try{
            const leagueImage = require(`../../images/${this.props.match.params.name}.png`);
            return(
                <LogoBoxRound centered="true" imgSrc={leagueImage} altText={leagueImage}/>
            )
        } catch(e){
            return ;
        }
    }

    renderLeagueStandings(){
        if(!this.props.standings){
            return <Loader />
        }
        return(
            <LeagueTable 
                leagueID={this.props.leagueDetails.leagueID} 
                leagueTitle={this.props.match.params.name} 
                standings={this.props.standings}
            />
        )
    }

    renderLeagueTopScorers(){
        if(!this.props.topScorers){
            return;
        }
        return this.props.topScorers.scorers.map((el,index) =>{
            const nationalityCode = countryCode[el.player.nationality].toLowerCase();
            return(
                <tr key={el.player.id}>
                    <td>{index + 1}</td>
                   <td className="player-name">{el.player.name}</td>
                   <td className="nationality">
                        <img
                            alt={nationalityCode}
                            src={require(`../../images/flags/${nationalityCode}.svg`)} 
                        />
                    {el.player.nationality}
                   </td>
                   <td className="player-club">{el.team.name}</td>
                   <td className="player-goals">{el.numberOfGoals}</td>
                </tr>
            )
        })
    }


    reverseArray(array){
        var newArray = [];
        for(var i = array.length - 1; i >= 0; i--){
            newArray.push(array[i]);
        }
        return newArray;
    }

    renderLeagueFixtures(){
        if(!this.props.fixtures){
            return;
        }
        return this.props.fixtures.matches.map((match, index) =>{
            return(
                <tr className="fixture-row" key={match.id}>
                    <td className="fixture-team-name">{match.homeTeam.name}</td>
                    <td className="fixture-result">{match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}</td>
                    <td className="fixture-team-name">{match.awayTeam.name}</td>
                </tr>
            )
        })
    }

    renderPage(){
        if(!this.props.fixtures || !this.props.topScorers || !this.props.standings){
            return <Loader />
        }
        return(
            <Fragment>
                {this.renderLeagueImage()}
                <Row>
                    <Column col="7">
                        {this.renderLeagueStandings()}
                    </Column>
                    <Column col="5">
                        <InformationBox title="Fixtures">
                            <table>
                                <tbody>
                                {this.renderLeagueFixtures()}
                                </tbody>
                            </table>
                        </InformationBox>
                    </Column>
                    <Column col="5">
                        <InformationBox title="Top scorers">
                            <table>
                                <tbody>
                                    {this.renderLeagueTopScorers()}
                                </tbody>
                            </table>
                        </InformationBox>
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
        standings: state.league.standings,
        topScorers: state.league.topScorers,
        fixtures: state.league.fixtures,
        leagueDetails: state.league.leagueDetails
    } 
}

export default connect(mapStateToProps, {
    getLeagueStandings,
    getLeagueTopScorers,
    getLeagueFixtures,
    setLeagueDetails,
    clearLeagueInformation,
})(Leagues);
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getMatchTable } from '../../actions';
import './Home.css';

import Header from '../Header';
import Container from '../Container/Container';
import MatchesTable from '../Tables/MatchTable';
import Loader from '../Loader';

class Home extends Component{

    componentDidMount(){
        this.props.getMatchTable("premier-league", 2021);
        this.props.getMatchTable("seria-a", 2019);
        this.props.getMatchTable("primera-division", 2014);
        this.props.getMatchTable("bundesliga", 2002);
    }

    generateTable = (tableInformation, league) =>{
        if(!tableInformation){
            return;
        }
        return <MatchesTable league={league} tableInfo={tableInformation}/>
    }

    renderHomePage(){
        if(Object.keys(this.props.tableInformation).length < 4){
            return <Loader />
        }
        return(
            <Fragment>
                <div className="table-div">
                    <h3 className="league-title">
                        <img className="flag-icon" src="https://lipis.github.io/flag-icon-css/flags/4x3/gb-eng.svg" alt="England Flag"/>
                        England | Premier League
                        </h3>
                    {this.generateTable(this.props.tableInformation, "premier-league")}
                </div>
                <div className="table-div">
                    <h3 className="league-title">
                    <img className="flag-icon" 
                         src="https://lipis.github.io/flag-icon-css/flags/4x3/it.svg" alt="Italy Flag"/>
                        Italy | Seria A
                    </h3>
                    {this.generateTable(this.props.tableInformation, "seria-a")}
                </div>
                <div className="table-div">
                    <h3 className="league-title">
                    <img className="flag-icon" src="https://lipis.github.io/flag-icon-css/flags/4x3/es.svg" alt="Spain Flag"/>
                        Spain | Primera Division
                    </h3>
                    {this.generateTable(this.props.tableInformation, "primera-division")}
                </div>
                <div className="table-div">
                    <h3 className="league-title">
                    <img className="flag-icon" src="https://lipis.github.io/flag-icon-css/flags/4x3/de.svg" alt="Germany Flag"/>
                        Germany | Bundesliga
                    </h3>
                    {this.generateTable(this.props.tableInformation, "bundesliga")}
                </div>
            </Fragment>
        )
    }

    render(){
        return(
            <Fragment>
                <Header />
                <Container>
                    {this.renderHomePage()}
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        tableInformation: state.table.matches
    }
}

export default connect(mapStateToProps, {
    getMatchTable
})(Home);
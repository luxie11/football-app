import React from 'react';
import './Table.css';

class MatchesTable extends React.Component{

    isLive(status){
        if(status === 'LIVE'){
            return(
                <label className="live-label">
                    LIVE
                </label>
            )
        }
    }

    renderTableInformation(){
        var { tableInfo } = this.props;
        if(!tableInfo[this.props.league]){
            return;
        }
        return tableInfo[this.props.league].matches.map(el=>{
            return(
                <tr key={el.id}>
                    <td className="time">{el.utcDate.replace('T', ' ').replace('Z', ' ')}</td>
                    <td className="status">
                        {this.isLive(el.status)}
                    </td>
                    <td className="team-name">{el.homeTeam.name}</td>
                    <td className="versus-div">-</td>
                    <td className="team-name">{el.awayTeam.name}</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            <th className="time">Time</th>
                            <th className="status"></th>
                            <th className="team-name">Home team</th>
                            <th className="versus-div"></th>
                            <th className="team-name">Away team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableInformation()}
                    </tbody>
                </table>
            </React.Fragment>
        )
    } 
}

export default MatchesTable;

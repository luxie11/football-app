import React, {Fragment, Component} from 'react';
import './Table.css'
import countryCode from '../countryCode';

class PlayersTable extends Component{

    calculateAge(birthDate){
        const playerDateOfBirth = new Date(birthDate);
        const currentDate = new Date();
        const age = currentDate.getTime() - playerDateOfBirth.getTime()
        return Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
    }

    renderTableInformation(){
        return this.props.players.map((player, index) => {
            const nationalityCode = countryCode[player.nationality] ? countryCode[player.nationality].toLowerCase() : 'gb-eng';
            const dateOfBirth = player.dateOfBirth ? player.dateOfBirth.split('T')[0] : '';
            const age = player.dateOfBirth ? this.calculateAge(player.dateOfBirth) : '';
            if(player.role === 'PLAYER')
                return(
                    <tr>
                        <td className="player-number">{player.shirtNumber}</td>
                        <td className="player-nationality">
                            <img
                                alt={nationalityCode}
                                src={require(`../../images/flags/${nationalityCode}.svg`)} />
                        </td>
                        <td className="player-name">{player.name}</td>
                        <td className="player-position">{player.position}</td>
                        <td className="player-date">{dateOfBirth}</td>
                        <td className="player-age">{age}</td>
                    </tr>
                )
            else   
                return null;
        })
    }

    render(){
        return(
            <Fragment>
                <table>
                <thead>
                    <tr>
                        <th className="player-number">Number</th>
                        <th className="player-nationality">Nat.</th>
                        <th className="player-name">Player</th>
                        <th className="player-position">Position</th>
                        <th className="player-date">Date of birth</th>
                        <th className="player-age">Age</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTableInformation()}
                </tbody>
            </table>
        </Fragment>
       )  
    }
}

export default PlayersTable;
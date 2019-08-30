import React, { Fragment, Component } from 'react';

class ShortenedTable extends Component{
    
    getInterval(length){
        let tableIntervals = Math.floor(length / 5);
        let tableRemainder = length -  tableIntervals * 5;
        let intervalArray = [0];
        for(var i = 0; i < tableIntervals; i++){
            intervalArray.push(intervalArray[i] + 5);
        }
        if(tableRemainder > 0){
            intervalArray[intervalArray.length - 1] += tableRemainder;
        }
        return intervalArray;
    }

    binarySearch(interval, clubPosition){
        var m = 0;
        var n = interval.length - 1;
        while(m <= n){
            var k = (n + m) >> 1;
            var compare = clubPosition - interval[k];
            if(compare > 0){
                m = k + 1;
            } else if(compare < 0){
                n = k - 1;
            } else {
                return {
                    lowerInterval:interval[k],
                    higherInterval:interval[k + 1]
                };
            }
        }
        return {
            lowerInterval:interval[n],
            higherInterval:interval[n + 1]
        };
    }

    renderShortenedTable(){
        const { standings } = this.props;
        if(!standings){
            return;
        }
        const tableLength = standings.standings[0].table.length;
        const tableIntervals = this.getInterval(tableLength);
        let clubPosition = 0;
        standings.standings[0].table.map(el =>{
            if(this.props.clubName === el.team.name){
                return clubPosition = el.position;
            }
            return null;
        });
        const shotenedTableIndexes = this.binarySearch(tableIntervals,clubPosition);
        let array = [];
        let lowerIndex = shotenedTableIndexes.lowerInterval % 5 === 0 && shotenedTableIndexes.lowerInterval !== 0 ? shotenedTableIndexes.lowerInterval - 1 : shotenedTableIndexes.lowerInterval;
        for(let i = lowerIndex; i < shotenedTableIndexes.higherInterval; i++){
           array.push((
                <tr data-league-id={standings.standings[0].table[i].team.id}  
                    key={standings.standings[0].table[i].team.id}
                    style={{backgroundColor:`${i === (clubPosition - 1) ? '#ff7b28' : ''}`}}
                >
                    <td>{standings.standings[0].table[i].position}</td>
                    <td className="team-name">
                        <img className="team-icon" 
                            alt={standings.standings[0].table[i].team.name} 
                            src={standings.standings[0].table[i].team.crestUrl}
                        ></img> 
                        {standings.standings[0].table[i].team.name}
                    </td>
                    <td>{standings.standings[0].table[i].playedGames}</td>
                    <td>{standings.standings[0].table[i].goalDifference}</td>
                    <td>{standings.standings[0].table[i].points}</td>
                </tr>
            ))
        }
        return array;
    }

    render(){
        return(
            <Fragment>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="2">Shortened League Table</th>
                            <th>Games</th>
                            <th>+/-</th>
                            <th>Pts.</th>
                        </tr>
                    </thead>
                    <tbody>
                       {this.renderShortenedTable()}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default ShortenedTable;
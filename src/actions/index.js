import { 
    GET_MATCHES_TABLE,
    GET_LEAGUE_STANDINGS,
    GET_LEAGUE_SCORERS,
    GET_LEAGUE_FIXTURES,
    SET_LEAGUE_DETAILS,
    CLEAR_LEAGUE_INFORMATION,
    GET_CLUB_INFORMATION,
    SET_SELECTED_CLUB,
    GET_CLUB_PREV_MATCH,
    GET_CLUB_NEXT_MATCHES,
    CLEAR_CLUB_INFORMATION
} from './types';
import football from '../apis/football';
import football_second from '../apis/football_second';
import football_third from '../apis/football_third';

const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : `${dateObj.getMonth() + 1}`;
    const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : `${dateObj.getDate()}`;
    return `${year}-${month}-${day}`
}

export const getMatchTable = (league,id) =>{
    return async dispatch =>{
        const currentDate = new Date();
        const nextDate = new Date(new Date().getTime() + 7*24*60*60*1000);    
        const dateFrom = formatDate(currentDate);
        const dateTo = formatDate(nextDate);
        const tableResults = await football.get(`competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`);
        dispatch({
            type: GET_MATCHES_TABLE,
            payload: {
                league,
                tableData: tableResults.data
            }
        })
    }
}

export const getLeagueStandings = (id) =>{
    return async dispatch =>{
        const leagueStandings = await football_second.get(`competitions/${id}/standings`);
        dispatch({
            type:GET_LEAGUE_STANDINGS,
            payload: leagueStandings.data
        })
    }
}

export const getLeagueTopScorers = (id) =>{
    return async dispatch => {
        const leagueTopScorers = await football_second.get(`competitions/${id}/scorers`);
        dispatch({
            type:GET_LEAGUE_SCORERS,
            payload: leagueTopScorers.data
        })
    }
}

export const getLeagueFixtures = (id) =>{
    return async dispatch =>{
        const currentDate = new Date();
        const previousTwoWeeksDate = new Date(new Date().getTime() - 8*24*60*60*1000);    
        const dateTo= formatDate(currentDate);
        const dateFrom = formatDate(previousTwoWeeksDate);
        const leagueFixtures = await football_third.get(`competitions/${id}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`);
        dispatch({
            type:GET_LEAGUE_FIXTURES,
            payload: leagueFixtures.data
        })
    }
}

export const setLeagueDetails = (id, title) =>{
    return ({
        type:SET_LEAGUE_DETAILS,
        payload:{
            leagueID: id,
            leagueName: title
        }
    })
}

export const clearLeagueInformation = () =>{
    return({
        type:CLEAR_LEAGUE_INFORMATION
    })
}

export const getClubInformation = (id) =>{
    return async dispatch =>{
        const clubDetails = await football_third.get(`teams/${id}`);
        dispatch({
            type:GET_CLUB_INFORMATION,
            payload: clubDetails.data
        })
    }
}

export const setSelectedClub = (clubID, leagueID, clubTitle) =>{
    return{
        type:SET_SELECTED_CLUB,
        payload:{
            clubID,
            leagueID,
            clubTitle
        }
    }
}

export const getClubFixtures = (id) =>{
    return async dispatch =>{
        const clubFixtures = await football.get(`teams/${id}/matches?status=FINISHED`);
        dispatch({
            type:GET_CLUB_PREV_MATCH,
            payload: clubFixtures.data
        })
    }
}

export const getClubNextMatches = (id) =>{
    return async dispatch =>{
        const nextMatches = await football_second.get(`teams/${id}/matches?status=SCHEDULED&limit=5`);
        dispatch({
            type:GET_CLUB_NEXT_MATCHES,
            payload: nextMatches.data
        })
    }
}

export const clearClubInformation = () =>{
    return{
        type:CLEAR_CLUB_INFORMATION
    }
}
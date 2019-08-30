import {
    GET_LEAGUE_STANDINGS,
    GET_LEAGUE_SCORERS,
    GET_LEAGUE_FIXTURES,
    SET_LEAGUE_DETAILS,
    CLEAR_LEAGUE_INFORMATION
} from '../actions/types';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case GET_LEAGUE_STANDINGS:
            return{
                ...state,
                standings: action.payload
            }
        case GET_LEAGUE_SCORERS:
            return{
                ...state,
                topScorers: action.payload
            }
        case GET_LEAGUE_FIXTURES:
            return{
                ...state,
                fixtures: action.payload
            }
        case SET_LEAGUE_DETAILS:
            return{
                ...state,
                leagueDetails:{
                    leagueID: action.payload.leagueID,
                    leagueName:action.payload.leagueName
                }
            }
        case CLEAR_LEAGUE_INFORMATION:
            return{
                ...state,
                fixtures: null,
                topScorers: null,
                standings: null
            }
        default:
            return state;
    }
}
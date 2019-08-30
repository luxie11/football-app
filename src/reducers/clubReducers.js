import {
    GET_CLUB_INFORMATION,
    SET_SELECTED_CLUB,
    GET_CLUB_PREV_MATCH,
    GET_CLUB_NEXT_MATCHES,
    CLEAR_CLUB_INFORMATION
} from '../actions/types'

export default (state={}, action) =>{
    switch(action.type){
        case GET_CLUB_INFORMATION:
            return{
                ...state,
                clubInformation: action.payload
            }
        case SET_SELECTED_CLUB:
            return{
                ...state,
                selectedClub:{
                    clubID: action.payload.clubID,
                    leagueID: action.payload.leagueID,
                    title: action.payload.clubTitle
                }
            }
        case GET_CLUB_PREV_MATCH:
            return{
                ...state,
                previousMatch: action.payload
            }
        case GET_CLUB_NEXT_MATCHES:
            return{
                ...state,
                nextMatches: action.payload
            }
        case CLEAR_CLUB_INFORMATION:
            return{
                ...state,
                previousMatch: undefined,
                nextMatches: undefined,
                clubInformation:undefined
            }
        default:
            return state;
    }
}
import {
    GET_MATCHES_TABLE
} from '../actions/types';

const INITIAL_STATE = {
    matches: {
        
    }
}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case GET_MATCHES_TABLE:
            return{
                ...state,
                matches: {
                    ...state.matches,
                    [action.payload.league]: action.payload.tableData
                }
            }
        default:
            return state;
    }
}
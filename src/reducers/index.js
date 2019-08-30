import { combineReducers } from 'redux';
import tableReducers from './tableReducers';
import leagueReducers from './leaguesReducers';
import clubReducers from './clubReducers';

export default combineReducers({
    table: tableReducers,
    league: leagueReducers,
    club: clubReducers
})
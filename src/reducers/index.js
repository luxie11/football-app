import { combineReducers } from 'redux';
import tableReducers from './tableReducers';
import leagueReducers from './leaguesReducers';
import clubReducers from './clubReducers';
import viewportReducers from './viewportReducers';

export default combineReducers({
    table: tableReducers,
    league: leagueReducers,
    club: clubReducers,
    viewPort: viewportReducers
})
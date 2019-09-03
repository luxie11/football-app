import {
    SET_VIEWPORT,
    SET_MOBILE_MENU_STATE,
    SET_MOBILE_MENU_STATE_FALSE
} from '../actions/types';

const INITIAL_STATE = {
    windowWidth: window.innerWidth,
    isMobileMenuOpened: false
}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case SET_VIEWPORT:
            return{
                ...state,
                windowWidth: action.payload
            }
        case SET_MOBILE_MENU_STATE:
            return{
                ...state,
                isMobileMenuOpened: !state.isMobileMenuOpened
            }
        case SET_MOBILE_MENU_STATE_FALSE:
            return{
                ...state,
                isMobileMenuOpened: false
            }
        default:
            return state;
    }
}
import { PARTNERS } from '../shared/partners';
import * as ActionTypes from './ActionTypes';

export const Partners = (state = PARTNERS, action) => { 
    switch(action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, errMess: null, partners : action.payload};
        case ActionTypes.PARTNERS_FAILED:
            return {...state, errMess: action.payload}
        case ActionTypes.LOAD_PARTNERS:
//            const partner = action.payload;
//            return {...state, comments: state.partners.concat(partners)};
        default: 
            return state;
    }
};

export const Comments = (state = { errMess: null, comments: []}, action) => { 
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload}
        case ActionTypes.LOAD_COMMENTS:
            const comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};
        default: 
            return state;
    }
};
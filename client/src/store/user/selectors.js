import { createSelector } from 'reselect';

function getUserFromState(state){
    return state.userReducer.user;
}

export const getUser = createSelector(getUserFromState, (user)=> user);
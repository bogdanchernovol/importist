import {userAction} from './actions';

export const UsersState = () => ({
    user: {},
    error: '',
    signUpStatus: '',
    signUpCompleteStatus: ''
});

export function UserReducer (state = new UsersState(), {payload, type}){
    switch(type){
        case userAction.SIGN_IN_FULFILED:
            if (payload.resp.token) localStorage.setItem('token', payload.resp.token);
            return {
                ...state,
                user: payload.resp.user
            }
        case userAction.SIGN_UP_FULFILED:
            return {
                ...state,
                signUpStatus: payload.status
            }
        case userAction.SIGN_IN_ERROR:
            return {
                ...state,
                error: payload.error.data.error
            }
        case userAction.VERIFY_EMAIL_FULFILED:
            return {
                ...state,
                user: payload.resp.user,
                signUpStatus: payload.resp.status
            }
        case userAction.INVITE_ACCEPTED:
            return {
                ...state,
                user: payload.resp.user,
                signUpStatus: payload.resp.status
            }
        case userAction.COMPLETE_SIGN_UP_FULFILED:
            return {
                ...state,
                company: payload.resp.company,
                signUpCompleteStatus: payload.resp.status
            }
        case userAction.COMPLETE_SIGN_UP_ERROR:
            return {
                ...state,
                error: payload.error.data.error,
            }
        case userAction.CLEAR_ERROR:
            return {
                ...state,
                error: '',
                signUpStatus: ''
            }
        default:
            return {
                ...state
            }
        }
}

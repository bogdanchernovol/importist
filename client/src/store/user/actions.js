import {commonActions} from '../common/actions';

export const userAction ={

    SIGN_IN_FULFILED: 'SIGN_IN_FULFILED',
    SIGN_UP_FULFILED: 'SIGN_UP_FULFILED',
    SIGN_IN_ERROR: 'SIGN_IN_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    VERIFY_EMAIL_FULFILED: 'VERIFY_EMAIL_FULFILED',
    INVITE_ACCEPTED: 'INVITE_ACCEPTED',
    COMPLETE_SIGN_UP: 'COMPLETE_SIGN_UP',
    COMPLETE_SIGN_UP_ERROR: 'COMPLETE_SIGN_UP_ERROR',
    COMPLETE_SIGN_UP_FULFILED: 'COMPLETE_SIGN_UP_FULFILED',

    signIn: user => ({
        type: commonActions.REQUEST,
        payload: {
            data: user,
            method: 'post',
            url: '/api/user/signIn',
            sucess: userAction.signInFulfilled,
            error: userAction.signInError
        }
    }),
    signInFulfilled: resp =>({
        type: userAction.SIGN_IN_FULFILED,
        payload: {resp}
    }),
    signInError: error => ({
        type: userAction.SIGN_IN_ERROR,
        payload: {error}
    }),
    clearError: ()=>({
        type: userAction.CLEAR_ERROR
    }),
    signUp: user =>({
        type: commonActions.REQUEST,
        payload: {
            data: user,
            method: 'post',
            url: '/api/user/startSignUp',
            sucess: userAction.signInFulfilled,
            error: userAction.signInError
        }
    }),
    signUpPass: user =>({
        type: commonActions.REQUEST,
        payload: {
            data: user,
            method: 'post',
            url: '/api/user/signUpCreatePass',
            sucess: userAction.signUpFulfilled,
            error: userAction.signInError
        }
    }),
    signUpFulfilled: status =>({
        type: userAction.SIGN_UP_FULFILED,
        payload: {status}
    }),
    verifyEmail: user =>({
        type: commonActions.REQUEST,
        payload: {
            data: user,
            method: 'post',
            url: '/api/user/verifyEmail',
            sucess: userAction.verifyEmailFulfilled,
            error: userAction.signInError
        },

    }),
    verifyEmailFulfilled: resp =>({
        type: userAction.VERIFY_EMAIL_FULFILED,
        payload: {resp}
    }),

    acceptInvite: code =>({
        type: commonActions.REQUEST,
        payload: {
            data: code,
            method: 'post',
            url: '/api/user/acceptInvite',
            sucess: userAction.acceptInviteFulfilled,
            error: userAction.signInError
        },

    }),
    acceptInviteFulfilled: resp =>({
        type: userAction.INVITE_ACCEPTED,
        payload: {resp}
    }),
    forgotPass: user => ({
        type: commonActions.REQUEST,
        payload: {
            data: user,
            method: 'post',
            url: '/api/user/forgotPass',
            sucess: userAction.verifyEmailFulfilled,
            error: userAction.signInError
        }
    }),
    completeSignUp: company =>({
        type: commonActions.REQUEST,
        payload: {
            data: company,
            method: 'post',
            url: '/api/user/completeRegistration',
            sucess: userAction.completeSignUpFulfilled,
            error: userAction.completeSignUpError
        },

    }),
    completeSignUpUser: user =>({
        type: commonActions.REQUEST,
        payload: {
            data: user,
            method: 'post',
            url: '/api/user/completeRegistrationUser',
            sucess: userAction.completeSignUpFulfilled,
            error: userAction.completeSignUpError
        },

    }),
    completeSignUpFulfilled: resp =>({
        type: userAction.COMPLETE_SIGN_UP_FULFILED,
        payload: {resp}
    }),
    completeSignUpError: error => ({
        type: userAction.COMPLETE_SIGN_UP_ERROR,
        payload: {error}
    }),
    checkEmail: user =>({
        type: commonActions.REQUEST,
        payload: {
            data: user,
            method: 'post',
            url: '/api/user/checkEmail',
            sucess: userAction.verifyEmailFulfilled,
            error: userAction.signInError
        },

    }),
    resetPass: user =>({
        type: commonActions.REQUEST,
        payload: {
            data: user,
            method: 'post',
            url: '/api/user/resetPass',
            sucess: userAction.signUpFulfilled,
            error: userAction.signInError
        }
    }),
}

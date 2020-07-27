export const routeSignIn = '/sign-in';
export const routeSignUp = '/sign-up';
export const routeForgotPass = '/forgot-pass';
export const routeProducts = '/products';
export const routeSignUpPass = '/sign-up-pass';
export const routeVerifyEmail = '/verify-email/:id/:verifyCode';
export const routeAcceptInvite = '/accept-invite/:code';
export const routeComplteRegistration = '/complete-registration';
export const routeResetPassword = '/reset-password/:id/:verifyCode';
export const routeMyAccount = '/my-account';
export const routeMyProfile = '/my-account#myProfile';

export const ERROR = 'error';
export const SUCCESS= 'success';
export const PASS_RESETED = 'password reseted';

export const SUPPLIER = 'supplier';
export const CLIENT = 'client';
export const USER = 'user';
export const REGISTRATION_START = 'start';
export const REGISTRATION_SEND_EMAIL = 'send email';
export const REGISTRATION_EMAIL_VERIFIED = 'email verified';
export const REGISTRATION_COMPLETED = 'completed';

export const COUNT_STAFF = ['1-10', '11-50', '51-100', '100-500', '500+'];
export const REVENUE_AMOUNT = ['$0-1M', '$1M-$5M', '$5M-$20M', '$20M-$100M', '$100M-$1B', '$1B+'];
//TO-DO remove after user flow implementing
export const USER_PROFILE = {
    fullName: 'Andrew Jones',
    email: 'aj@supershippers.io',
    position: 'Lead Buyer',
    phone: '+1 620 485 2734',
}
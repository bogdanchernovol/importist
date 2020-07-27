import * as constant from './constant';

export function validateEmail(email) { 
    // eslint-disable-next-line     
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email && email.match(re)) {
      return {
        validateStatus: constant.SUCCESS,
        errorMsg: null,
      };
    }
    return {
      validateStatus: constant.ERROR,
      errorMsg: 'Incorrect email.',
    };
}

export function  validateName(name) {      
    if (typeof name === 'string' && name.length > 2) {
        return {
          validateStatus: constant.SUCCESS,
          errorMsg: null,
        };
      }
      return {
        validateStatus: constant.ERROR,
        errorMsg: 'Incorrect full name.',
      };
}
export function  validatePassword(pass) {      
  if (typeof pass === 'string' && pass.length >= 8) {
      return {
        validateStatus: constant.SUCCESS,
        errorMsg: null,
      };
    }
    return {
      validateStatus: constant.ERROR,
      errorMsg: 'Incorrect password',
    };
}
export function validateConfirmPassword(confirmPass, password) {      
  if (typeof confirmPass === 'string' && confirmPass.length >= 8 && 
      confirmPass === password) {
      return {
        validateStatus: constant.SUCCESS,
        errorMsg: null,
      };
    }
    return {
      validateStatus: constant.ERROR,
      errorMsg: 'Incorrect confirm password',
    };
}

export function validateRequired(value) {      
  if (typeof value === 'string' && value.length >= 1) {
      return {
        validateStatus: constant.SUCCESS,
        errorMsg: null,
      };
    }
    return {
      validateStatus: constant.ERROR,
      errorMsg: 'Incorrect field value',
    };
}
export function validatePhone(phone) {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  if (phone && phone.match(re)) {
    return {
      validateStatus: constant.SUCCESS,
      errorMsg: null,
    };
  }
  return {
    validateStatus: constant.ERROR,
    errorMsg: 'The Phone must be correct!',
  };
}
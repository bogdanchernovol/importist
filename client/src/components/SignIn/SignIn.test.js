import React from 'react';
import * as enzyme from 'enzyme';
const { shallow } = enzyme;
import { shallowToJson } from 'enzyme-to-json';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import {validatePassword, validateEmail} from '../../utils/validate';
import {userAction} from '../../store/user';
import * as constant from '../../utils/constant';
import { SignIn } from './SignIn';

enzyme.configure({ adapter: new ReactSixteenAdapter() });
const dispatch = jest.fn();
const history = jest.fn()
history.push = jest.fn();

function setup() {
    const props = {
        error: '',
        user: {},
        dispatch,
        history
    };
    const renderedComponent = shallow(<SignIn {...props} />);
    return {
      props,
      renderedComponent,
    };
  }

  describe('SignIn Component', () => {
    it('should render self', () => {
        const { renderedComponent } = setup();
        expect(shallowToJson(renderedComponent)).toMatchSnapshot();
    });
    it('should change pass', () => {
        const { renderedComponent } = setup();
        const handleChangePass = renderedComponent.instance().handleChangePass;
        const value = '11111111';
        handleChangePass(value);
        expect(renderedComponent.state().password).toEqual({
                ...validatePassword(value),
                value: value            
        });
    });
    it('should change email', () => {
        const { renderedComponent } = setup();
        const handleChangeEmail = renderedComponent.instance().handleChangeEmail;
        const value = 'as@mail.com';
        handleChangeEmail(value);
        expect(renderedComponent.state().email).toEqual({
                ...validateEmail(value),
                value: value            
        });
    });
    it('should click onSignIn', () => {
        const { renderedComponent } = setup();
        const btn = renderedComponent.find('.btn-green');
        const email = 'as@mail.com';
        const password = '11111111';
        renderedComponent.state().email = {
            ...validateEmail(email),
                value: email
        }
        renderedComponent.state().password = {
            ...validatePassword(password),
                value: password
        }
        btn.simulate('click');
        expect(dispatch).toHaveBeenCalledWith(userAction.clearError());
        expect(dispatch).toHaveBeenCalledWith(userAction.signIn({
            email: renderedComponent.state().email.value,
            password: renderedComponent.state().password.value
        }));
    });
    it('should check initState', () => {
        const { renderedComponent } = setup();
        const initState = renderedComponent.instance().initState;
        initState();
        expect(renderedComponent.state()).toEqual({
                email: {},
                password: {}
        });
    });
    it('should change props - Incorrect password', () => {
        const { renderedComponent } = setup();
        const password = '11111111';
        const error =  'Incorrect password';
        renderedComponent.state().password = {
            ...validatePassword(password),
                value: password
        }
        // Change props
        renderedComponent.setProps({error});
        renderedComponent.state().password = {
            validateStatus: constant.ERROR,
            errorMsg: error,
            value: password
        }
    });
    it('should change props - Incorrect email', () => {
        const { renderedComponent } = setup();
        const email = 'as@mail.com';
        const error =  'Incorrect email';
        renderedComponent.state().email = {
            ...validateEmail(email),
                value: email
        }
        // Change props
        renderedComponent.setProps({error});
        renderedComponent.state().email = {
            validateStatus: constant.ERROR,
            errorMsg: error,
            value: email
        }
    });
    it('should change props - correct user', () => {
        const { renderedComponent, props } = setup();       
        renderedComponent.setProps({user: constant.USER_PROFILE});
        expect(props.history.push.mock.calls.length).toBe(1);
    });
  })



import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import SignUpPass from '../../components/SignUpPass';
import VerifyEamil from '../../components/VerifyEamil';
import AcceptInvite from '../../components/AcceptInvite';
import CompleteRegistration from '../CompleteRegistration';
import ForgotPassword from '../../components/ForgotPassword';
import ResetPassword from '../../components/ResetPassword';
import MyAccount from '../MyAccount';
import * as constant from '../../utils/constant';

class App extends Component {
  render() {
    return (
      <Router>   
        <Switch>
            <Route exact path='/' component={()=><span>
              <Link to={constant.routeSignIn}>sign-in</Link>
            </span>}/>
            <Route exact path={constant.routeSignIn} component={SignIn} />
            <Route exact path={constant.routeSignUp} component={SignUp} />
            <Route exact path={constant.routeSignUpPass} component={SignUpPass} />
            <Route path={constant.routeVerifyEmail} component={VerifyEamil} />
            <Route path={constant.routeAcceptInvite} component={AcceptInvite} />
            <Route exact path={constant.routeComplteRegistration} component={CompleteRegistration} />
            <Route exact path={constant.routeForgotPass} component={ForgotPassword} />
            <Route path={constant.routeResetPassword} component={ResetPassword} />
            <Route path={constant.routeMyAccount} component={MyAccount} />
        </Switch>

     </Router>   
    );
  }
}

export default App;

import React, { Component } from 'react';
import {Icon} from '../../utils/antd';
import Raven from 'raven-js';

Raven.config(process.env.SENTRY_API_KEY).install()

class ErrorCatch extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        Raven.captureException(error, { extra: errorInfo });
    }
    render() {
        if (this.state.error) {
            //render fallback UI
            return (
                <div
                className="error-catch"
                onClick={() => Raven.lastEventId() && Raven.showReportDialog()}>
                    <Icon type="meh-o" />
                    <p>We're sorry — something's gone wrong.</p>
                    <p>Our team has been notified, but click here fill out a report.</p>
                </div>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        }
    }
}

export default ErrorCatch;
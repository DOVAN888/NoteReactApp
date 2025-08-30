import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import './Doctor.scss'

class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="doctor-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            {/* Fallback nếu không match path, có thể redirect nếu cần */}
                            <Route component={() => (<Redirect to="/doctor/manage-schedule" />)} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(Doctor);

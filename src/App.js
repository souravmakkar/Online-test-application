import React from 'react';
import Register from './components/register/register';
import ExamInstructions from './components/examInstructions/examInstructions';
import ProtectedRoute from './utilities/services/ProtectedRoute';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import onlineTest from './components/onlineTest/onlineTest';
import TestReport from './components/TestReport/TestReport';
import NoMatch from './components/NoMatch/NoMatch';
import { getTestState, isRegistered } from './utilities/services/authService';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={['/', '/register']}
          render={(props) => {
            if (isRegistered()) return <Redirect to="/exam-info" {...props} />;
            else {
              return <Register {...props} />;
            }
          }}
        />
        <Route
          exact
          path="/exam-info"
          render={(props) => {
            if (isRegistered()) return <ExamInstructions {...props} />;
            else {
              return <Redirect to="/register" />;
            }
          }}
        />
        <ProtectedRoute path="/online/test" component={onlineTest} />
        <Route
          exact
          path="/test/report"
          render={(props) => {
            if (getTestState()) {
              return <TestReport {...props} />;
            } else if (!isRegistered()) {
              return <Redirect to="/register" />;
            } else {
              return <Redirect to="/exam-info" />;
            }
          }}
        />
        <Route render={() => <NoMatch />} />
      </Switch>
    </Router>
  );
}

export default App;

App.propTypes = {
  location: PropTypes.object,
};

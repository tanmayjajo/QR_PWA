import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App = () => {
  const isAuthenticated = true; // Set to true if the user is authenticated

    return (
    <Router>
        <Switch>
            <Route path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <LoginPage />}
            </Route>
            <Route path="/">
            {isAuthenticated ? <HomePage /> : <Redirect to="/login" />}
            </Route>
        </Switch>
        </Router>
    );
};

export default App;

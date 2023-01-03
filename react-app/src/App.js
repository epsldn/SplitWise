import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import "./stylesheets/reset.css";
import ActivityShowCase from "./components/ActivityComponents/ActivityShowCase";
import LandingPage from './components/LandingPage/LandingPage';
import CreateClub from './components/ClubComponents/CreateClub';
import MainNavBar from './components/MainNavBar';
import EditClub from './components/ClubComponents/EditClub';
import CreateActivity from './components/ActivityComponents/CreateActivity';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/welcome' exact >
          <LandingPage />
        </Route>
        <Route path='/login' exact>
          <LoginForm />
        </Route>
        <Route path='/join' exact>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/" exact>
          <MainNavBar />
          THIS WILL SOME DAY BE THE HOME PAGE
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/clubs/create" exact>
          <CreateClub />
        </ProtectedRoute>
        <ProtectedRoute path="/clubs/:clubId/edit" exact>
          <EditClub />
        </ProtectedRoute>
        <ProtectedRoute path="/activities/create" exact>
          <CreateActivity />
        </ProtectedRoute>
        <ProtectedRoute path={`/activities/:activityId`}>
          <ActivityShowCase />
        </ProtectedRoute>
        <Route>
          404 Error
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

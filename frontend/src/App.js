import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import './reset.css'

import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import { MainPage } from './components/MainPage/MainPage';

import { getCurrentUser } from './store/session';
import { NavBar } from './components/NavBar/NavBar';



function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch])

  return loaded && (
    <>
      <NavBar></NavBar>
      <Switch>
        <Route path={'/'}><MainPage/></Route>
      </Switch>
    </>
  );
}

export default App;
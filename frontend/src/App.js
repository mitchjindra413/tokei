import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import './reset.css'

import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import { MainPage } from './components/MainPage/MainPage';

import { getCurrentUser } from './store/session';
import { NavBar } from './components/NavBar/NavBar';
import { UploadForm } from './components/UploadForm/UploadForm';



function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch])

  return loaded && (
    <>
      <NavBar></NavBar>
      <Switch>
        <Route path={'/topics/:topic'}><MainPage/></Route>
        <Route path={'/upload'}>
          {!user ? <Redirect to="/"></Redirect> : <UploadForm></UploadForm>}
        </Route>
        <Route path={'/'}><MainPage/></Route>
      </Switch>
    </>
  );
}

export default App;
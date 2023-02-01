import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import './reset.css'

import { MainPage } from './components/MainPage/MainPage';

import { getCurrentUser } from './store/session';
import { NavBar } from './components/NavBar/NavBar';
import { UploadForm } from './components/UploadForm/UploadForm';
import { PostView } from './components/PostView/PostView';


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
        {/* <Route path={'/post/:postId'}><PostView></PostView></Route> */}
        <Route path={'/music/:sound'}></Route>
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
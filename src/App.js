
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './backend/redux/User/user.actions';


//hoc
import WithAuth from './backend/hoc/withAuth';

//pages
import Signup from './frontend/pages/signup/Signup';
import Login from './frontend/pages/login/Login';
import Homepage from './frontend/pages/homepage/Homepage';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

  }, []);

  return (
      <div className='App'>
        <Switch>
        <Route exact path = "/" component={Homepage}/>
        <Route exact path = "/login" component={Login}/>
        <Route exact path = "/signup" component={Signup}/>
        </Switch>
      </div>

  )
}

export default App;

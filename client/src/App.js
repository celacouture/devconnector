import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from './actions/authActions';
import {logoutUser} from './actions/authActions';
import {Provider} from 'react-redux';
import store from './store';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

//check for token
if(localStorage.jwtToken){
  //set auth header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired jwtToken
  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //clear current profiles

    //redirect to login
    window.location.href='/login';

  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar/>
            <Route exact path="/" component={Landing} />
            <div className='container'>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            </div>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

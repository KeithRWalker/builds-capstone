import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.min.css';

import userData from '../helpers/data/userData';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import MyNav from '../components/MyNav/MyNav';
import AddBuild from '../components/AddBuild/AddBuild';
import EditBuild from '../components/EditBuild/EditBuild';
import UserBuilds from '../components/UserBuilds/UserBuilds';
import SingleBuild from '../components/SingleBuild/SingleBuild';

import fbConnection from '../helpers/data/connection';

import './App.scss';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(prevState => ({
          authed: !prevState.authed,
        }));
        userData.getUserInfo(user.uid)
          .then(resp => this.setState({ userName: resp.displayName, uid: resp.uid }))
          .catch(err => console.error(err));
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const { userName } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNav authed={authed} userName={userName}/>
            <div className="Container">
              <div className="Row">
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed}/>
                  <PrivateRoute path='/home' component={Home} authed={authed} userName={userName}/>

                  <PrivateRoute path='/add' component={AddBuild} authed={authed} userName={userName}/>
                  <PrivateRoute path='/edit/:id' component={EditBuild} authed={authed} userName={userName}/>
                  <PrivateRoute path='/build/:id' component={SingleBuild} authed={authed} userName={userName}/>
                  <PrivateRoute path='/userbuilds' component={UserBuilds} authed={authed} userName={userName}/>

                  <Redirect from='*' to='/auth' />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PlayerDetails from './components/players/PlayerDetails';
import AddPlayer from './components/players/AddPlayer';
import EditPlayer from './components/players/EditPlayer';
import AddTeam from './components/teams/AddTeam';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/addplayer' component={AddPlayer} />
            <Route path='/addteam' component={AddTeam} />
            <Route exact path='/player/:id' component={PlayerDetails} />
            <Route exact path='/player/edit/:id' component={EditPlayer} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;

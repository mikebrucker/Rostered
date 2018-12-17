import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PlayerDetails from './components/players/PlayerDetails';
import AddPlayer from './components/players/AddPlayer';
import EditPlayer from './components/players/EditPlayer';
import TeamDetails from './components/teams/TeamDetails';
import AddTeam from './components/teams/AddTeam';
import EditTeam from './components/teams/EditTeam';

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
            <Route path='/addteam' component={AddTeam} />
            <Route exact path='/team/:id' component={TeamDetails} />
            <Route exact path='/team/edit/:id' component={EditTeam} />
            <Route exact path='/team/:id/addplayer/' component={AddPlayer} />
            <Route exact path='/team/:id/player/:type' component={PlayerDetails} />
            <Route exact path='/team/:id/editplayer/:type' component={EditPlayer} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import PlayerDetails from './components/players/PlayerDetails';
import TeamDetails from './components/teams/TeamDetails';
import ScheduleDetails from './components/schedules/ScheduleDetails';

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
            <Route exact path='/team/:id' component={TeamDetails} />
            <Route exact path='/team/:id/player/:type' component={PlayerDetails} />
            <Route exact path='/team/:id/schedule/:type' component={ScheduleDetails} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;

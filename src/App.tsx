import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import { Animals } from './components/Animals';
import { OneAnimal } from './components/Animal';
import { PageNotFound } from './components/PageNotFound';

import './App.css';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/"><Animals /></Route>
        <Route path="/animal/:id"><OneAnimal /></Route>
        <Route path="*"><PageNotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;

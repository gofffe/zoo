import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import { Animals } from './components/Animals';
import { Animal } from './components/Animal';
import { PageNotFound } from './components/PageNotFound';

import './App.css';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/"><Animals></Animals></Route>
        <Route path="/animal/:id"><Animal></Animal></Route>
        <Route path="*"><PageNotFound></PageNotFound></Route>
      </Switch>
    </Router>
  );
}

export default App;

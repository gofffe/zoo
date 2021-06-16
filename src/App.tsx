import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import { Animals } from './components/Animals';
import { AnimalDetails } from './components/AnimalDetails';
import { PageNotFound } from './components/PageNotFound';

import './App.scss';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/"><Animals /></Route>
        <Route path="/animal/:id"><AnimalDetails /></Route>
        <Route path="*"><PageNotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import './create-screen.css';
import { BrowserRouter, Route} from 'react-router-dom';
import { Switch} from 'react-router'
import CreateGameScreen from './pages/CreateGameScreen';
import GameDetails from './pages/GameDetails';
import NotFoundScreen from './pages/NotFoundScreen';

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path='/' component={CreateGameScreen} exact={true} />
      <Route path='/games/:gameId' component={GameDetails}/>
      <Route path='*' component={NotFoundScreen} />
     </Switch>
    </BrowserRouter>
    
  );
}

export default App;

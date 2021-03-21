import React from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Profile from './components/Profile';
import WithRouterSample from './components/WithRouterSample';

const App = () => {
  const activeStyle = {
    background: 'black',
    color: 'white'
  }
  return (
    <div>
      <ul>
        <li>
          <NavLink exact activeStyle={activeStyle} to="/">홈</NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/about">소개</NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profile/minseok">민석 프로필</NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profile/velopert">velopert 프로필</NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile/:username" component={Profile} />
        <Route 
          render={({location}) => (<div>{location.pathname}은 존재하지 않습니다</div>)}
        />
      </Switch>
    </div>
  );
};

export default App;
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { InsertMatch } from './components/InsertMatch';
import MatchDetail from './components/match-detail/MatchDetail';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/insert-match' component={InsertMatch} />
        <Route path='/match-detail/:id' component={MatchDetail} />
      </Layout>
    );
  }
}

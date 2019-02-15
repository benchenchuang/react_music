import React, { Component } from 'react';
import './App.less';
import '../assets/style/font.css'
import '../assets/style/reset.css'
import Ranking from './Ranking'
import Recommend from '../container/Recommend'
import RankDetail from '../container/RankDetail'
import Search from '../container/Search'
import AlbumInfo from '../container/albumInfo'
// import {BrowserRouter as Router,Redirect,Switch,Route} from 'react-router-dom'
import {HashRouter as Router,Redirect,Switch,Route} from 'react-router-dom'
import Player from '../container/Player'

class App extends Component {
    render() {
      return (
        <Router >
          <div className="app">
              <Switch>
                <Route exact path="/recommend" component={Recommend}/>
                <Route exact path="/ranking" component={Ranking}/>
                <Route path="/search" component={Search}/>
                <Route path="/album/:id" component={AlbumInfo}/>
                <Route path="/ranking/:id" component={RankDetail}/>
                <Redirect from="/" to="/recommend"/>
                <Route component={Recommend}/>
              </Switch>
            <Player />
          </div>
        </Router>
      );
    }
}

export default App;

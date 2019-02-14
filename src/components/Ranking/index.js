import React, { Component } from 'react'
import './ranking.less'
import Header from '../../model/Header'
import RankList from '../RankList'

export default class Ranking extends Component {

  render() {
    return (
      <div className="music-ranking">
        <Header />
        <RankList />
      </div>
    )
  }
}

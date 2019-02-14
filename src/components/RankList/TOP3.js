import React, { Component } from 'react'
import './top.less'

export default class TOP3 extends Component {
  render() {
    return (
      <div className="top_list">
          {
              this.props.tops.map((top,index)=>{
                  return(
                      <p className="top_item" key={index}><span className="top">{index}</span>{top.songname} - {top.singername}</p>
                  )
              })
          }
      </div>
    )
  }
}

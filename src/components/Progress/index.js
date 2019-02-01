import React, { Component } from 'react'
import './progress.less'

export default class Progress extends Component {
    render() {
        return (
            <div className="progress_bar">
               <div className="progress" style={{width:"20%"}}></div>
               <div className="progress_button" style={{left:'70px'}}></div>
            </div>
        )
    }
}
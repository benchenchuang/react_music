import React, { Component } from 'react'
import './music_header.less'

export default class MusicHeader extends Component {
    handleBack(){
        window.history.back();
    }
    render() {
        return (
            <div className="music_header" style={{background:"rgba(10,10,10,"+this.props.opacity+")"}}>
                <i className="iconfont icon-back" onClick={this.handleBack.bind(this)}></i>
                <p className="header_txt">{this.props.title}</p>
            </div>
        )
    }
}

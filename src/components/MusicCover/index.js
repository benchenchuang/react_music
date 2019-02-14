import React, { Component } from 'react'
import './music_cover.less'
export default class MusicCover extends Component {
    playAll(){
        this.props.bindPlay();
    }
    render() {
        let propsData=this.props.data;
        return (
            <div className="music_cover">
                <img width="100%" src={propsData.coverPic} alt={propsData.name}/>
                <div className="play-button" onClick={this.playAll.bind(this)}>
                    <i className="iconfont icon-play"></i>
                    <span>播放全部</span>
                </div>
            </div>
        )
    }
}

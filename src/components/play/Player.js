import React, { Component } from 'react'
import './player.less'

export default class Player extends Component {
    constructor(props){
        super(props);
        this.currentSong=[0,'','','',0];
        this.currentIndex=0;
        //播放模式:list-列表； single-单曲; shuffle-随机 
        this.playModes=['list','single','shuffle'];

        this.state={
            currentTime: 0,
            playProgress: 0,
            playStatus: false,
            currentPlayMode: 0
        }
    }
    componentDidMount(){

    }
    render() {
        console.log(this.props.currentSong);
        console.log(this.props.playSongs);
        return (
            <div>
            </div>
        )
    }
}

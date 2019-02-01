import React, { Component } from 'react'
import './miniPlayer.less'

export default class MiniPlayer extends Component {
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
        this.audioDOM=null;
    }
    componentDidMount(){
        this.audioDOM.addEventListener('canplay',()=>{
            this.audioDOM.play();
            this.setState({
                playStatus:true
            })
        })
        this.audioDOM.addEventListener('ended',()=>{
            if(this.props.playSongs.length>1){
                let currentIndex=this.currentIndex;
                if(this.state.currentPlayMode===0){//列表播放
                    if(currentIndex===this.props.playSongs.length-1){
                        currentIndex=0;
                    }else{
                        currentIndex+=1;
                    }
                }else if(this.state.currentPlayMode===1){//单曲循环
                    this.audioDOM.play();
                    return false;
                }else {//随机播放
                    currentIndex=parseInt(Math.random()*this.props.playSongs.length,10)
                }
                this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
                this.props.changeCurrentIndex(currentIndex)
            }
        })
    }
    handlePlayOrPause(){

    }
    handleNext(){

    }
    render() {
        let song=this.props.currentSong || {};
        console.log(song)
        let playStyle={};
        if(this.props.showStatus===true){
            playStyle={display:"none"}
        }
        if(!song.img){
            song.img=require('../../assets/images/music.png');
        }
        let imgStyle={};
        if (this.state.playStatus === true) {
            imgStyle["WebkitAnimationPlayState"] = "running";
            imgStyle["animationPlayState"] = "running";
        } else {
            imgStyle["WebkitAnimationPlayState"] = "paused";
            imgStyle["animationPlayState"] = "paused";
        }
        let playButtonClass=this.state.playStatus===true?'iconfont icon-pause':'iconfont icon-play';

        return (
            <div className="mini-player" style={playStyle}>
                <div className="player-img rotate" style={imgStyle}>
                    <img src={song.img} alt={song.name}/>
                </div>
                <div className="player-center">
                    <p className="song">{song.name}</p>
                    <p className="singer">{song.singer}</p>
                </div>
                <div className="player-right">
                    <i className={playButtonClass} onClick={this.handlePlayOrPause.bind(this)}/>
                    <i className="iconfont icon-next ml-10" onClick={this.handleNext.bind(this)}></i>
                </div>
                <audio ref={(el) => { this.audioDOM = el; }}></audio>
            </div>
        )
    }
}

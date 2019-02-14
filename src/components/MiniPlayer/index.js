import React, { Component } from 'react'
import './miniPlayer.less'

export default class MiniPlayer extends Component {
    constructor(props){
        super(props);
        this.currentSong=[0,'','','',0];
        this.currentIndex=0;
        this.isFirstPlay = true;
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
                this.currentIndex=currentIndex;
            }else{
                if(this.props.playSongs.length===1){
                    this.audioDOM.play();
                }else{
                    
                    //暂停
                    this.audioDOM.pause();
                    this.setState({
                        playProgress: 0,
                        currentTime: 0,
                        playStatus: false
                    })
                }
            }
        });
        this.audioDOM.addEventListener('error',()=>{
            this.setState({
                playStatus:false
            })
            alert('歌曲加载错误')
        });
    }
    componentDidUpdate(){
        if(this.isFirstPlay===true){
            this.audioDOM.play();
            this.isFirstPlay=false;
        }
    }
    handlePlayOrPause(){
        if(this.props.playSongs.length){
            let thisPlayStatus=this.state.playStatus;
            thisPlayStatus ? (this.audioDOM.pause()) : this.audioDOM.play();
            this.setState({
                playStatus:!thisPlayStatus
            })
        }
    }
    handleNext(){
        let songsLength=this.props.playSongs.length;
        if(songsLength>1){
            let currentIndex=this.currentIndex;
            let thisPlayMode=this.state.currentPlayMode;
            if(thisPlayMode===0){//列表播放
                if(currentIndex===songsLength-1){
                    currentIndex=0;
                }else{
                    currentIndex+=1;
                }
            }else if(thisPlayMode===1){//单曲循环
                return false;
            }else{//随机播放
                let index=parseInt(Math.random()*songsLength);
                currentIndex=index;
            }
            this.props.changeCurrentSong(this.props.playSongs[currentIndex]);
            this.currentIndex=currentIndex;
        }
    }
    handlePlayMode(){
        let currentMode=this.state.currentPlayMode;
        let modeLength=this.playModes.length;
        if(currentMode===modeLength-1){
            this.setState({
                currentPlayMode:0
            })
        }else{
            this.setState({
                currentPlayMode:currentMode+1
            })
        }
    }
    render() {
        // 从redux中获取当前播放歌曲
        if (this.props.currentSong && this.props.currentSong.url) {
            // 当前歌曲发发生变化
            if (this.currentSong.id !== this.props.currentSong.id) {
                this.currentSong = this.props.currentSong;
                if (this.audioDOM) {
                    this.audioDOM.src = this.currentSong.url;
                    // 加载资源，ios需要调用此方法
                    this.audioDOM.load();
                }
            }
        }
        let song=this.currentSong;

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
        let playModeClass=null;
        let currentPlayMode=this.state.currentPlayMode;
        switch(currentPlayMode){
            case 0:
                playModeClass="iconfont icon-music_cycle";
                break;
            case 1:
                playModeClass="iconfont icon-single_cycle";
                break;
            default:
                playModeClass="iconfont icon-random";
        }
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
                    <i className={playModeClass} onClick={this.handlePlayMode.bind(this)}/>
                    <i className={playButtonClass} onClick={this.handlePlayOrPause.bind(this)}/>
                    <i className="iconfont icon-next" onClick={this.handleNext.bind(this)}></i>
                </div>
                <audio ref={(el) => { this.audioDOM = el; }}></audio>
            </div>
        )
    }
}

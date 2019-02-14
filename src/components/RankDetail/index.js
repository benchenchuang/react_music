import React, { Component } from 'react'
import {topDetail,getSongKey} from '../../api/jsonp'
import MusicHeader from '../../model/musicHeader'
import MusicCover from '../MusicCover'
import './detail.less'

export default class RankDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            topInfo:{},
            songs:[],
            song_num:0
        }
    }
    componentDidMount(){
        let topId=this.props.match.params.id
        topDetail(topId).then(res=>{
            if(res && res.code===0){
                let songList=res.songlist
                let songs=[]
                if(songList.length){
                    songList.forEach(list=>{
                        let item=list.data;
                        let singer=item.singer.map(singer =>{
                            return singer.name;
                        });
                        let singerStr=singer.join(' / ');
                        let songImg=`http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`;
                        let song={
                            id:item.songid,
                            name:item.songname,
                            singer:singerStr,
                            url:'',
                            img:songImg
                        }
                        this.getSongUrl(song,item.songmid);
                        songs.push(song)
                    });
                }
                this.setState({
                    topInfo:res.topinfo,
                    songs:songs,
                    song_num:res.cur_song_num
                })
            }
        })
    }
    getSongUrl(song,mId){
        getSongKey(mId).then(res=>{
            if(res && res.code===0){
                if(res.data.items){
                    let item=res.data.items[0];
                    song.url =  `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`
                }
            }
        })
    }
    selectSong(song){
        this.props.setSongs([song]);
        this.props.changeCurrentSong(song);
    }
    playAll(){
        let songs=this.state.songs;
        this.props.setSongs(songs);
        this.props.changeCurrentSong(songs[0]);
    }
    render() {
        let {topInfo,songs,song_num}=this.state;
        let songsBox=songs.map((song,index)=>{
            return (
                <div className="song_item" key={song.id} onClick={this.selectSong.bind(this,song)}>
                    <div className="item_count">
                        {index+1}
                    </div>
                    <div className="item_content">
                        <p className="name">{song.name}</p>
                        <p className="singer">{song.singer}</p>
                    </div>
                </div>
            )
        });
        let coverData={
            'coverPic':topInfo.pic_album,
            'name':topInfo.ListName
        }
        return (
            <div>
                <MusicHeader title={topInfo.ListName}/>
                <MusicCover data={coverData} bindPlay={this.playAll.bind(this)}/>
                <div className="song_box">
                    <p className="songs_head">排行榜 {song_num} 首</p>
                    <div className="songs">
                        {songsBox}
                    </div>
                </div>
            </div>
        )
  }
}

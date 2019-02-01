import React, { Component } from 'react'
import './album_info.less'
import MusicHeader from '../../model/musicHeader'
import {albumInfo,getSongKey} from '../../api/jsonp'

export default class AlbumInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            album:{},
            songs:[],
            coverPic:'',
            opacity:0,
            loading:false
        }
    }
    componentDidMount(){
        window.addEventListener('scroll',this.bindScroll.bind(this));
        let albumId=this.props.match.params.id;
        albumInfo(albumId).then(res =>{
            if(res && res.code===0){
                let songList=res.data.list;
                let songs=[]
                songList.forEach(item=>{
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
                let coverPic=`http://y.gtimg.cn/music/photo_new/T002R300x300M000${res.data.mid}.jpg?max_age=2592000`;
                this.setState({
                    album:res.data,
                    songs:songs,
                    coverPic:coverPic
                })
            }
        });
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
    bindScroll(event){
        let scrollTop =event.srcElement.documentElement.scrollTop || event.srcElement.body.scrollTop;
        let proportion=scrollTop/220;
        let opacity=proportion>1?1:proportion;
        this.setState({
            opacity:opacity
        });
    };
    //选择歌曲
    selectSong(song){
        return (e)=>{
            this.props.setSongs([song]);
            this.props.changeCurrentSong(song);
        }
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }
    render() {
        let album=this.state.album;
        let songs=this.state.songs.map(song => {
            return (
                <div className="song_item" key={song.id} onClick={this.selectSong(song)}>
                    <p className="song_name">{song.name}</p>
                    <p className="song_singer">{song.singer}</p>
                </div>
            )
        })
        return (
            <div>
                <MusicHeader title={album.name} opacity={this.state.opacity}/>
                <div className="music_cover">
                    <img width="100%" src={this.state.coverPic} alt={album.name}/>
                    <div className="play-button">
                        <i className="iconfont icon-play"></i>
                        <span>播放全部</span>
                    </div>
                </div>

                <div className="album_container">
                    <div className="album_wrap">
                        <div className="songs_num">专辑 共{album.total_song_num}首</div>
                        <div className="song_list">
                            {songs}
                        </div>
                        {
                            album.desc?(
                                <div className="album_info" >
                                    <h1 className="album_title">专辑简介</h1>
                                    <div className="album_desc">
                                        {album.desc}
                                    </div>
                                </div>
                            ):''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

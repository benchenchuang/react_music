import React, { Component } from 'react'
import './album_info.less'
import MusicHeader from '../../model/musicHeader'
import {albumInfo,getSongKey} from '../../api/jsonp'
import MusicCover from '../MusicCover'

export default class AlbumInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            album:{},
            songs:[],
            coverPic:'',
            loading:false
        }
    }
    componentDidMount(){
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
    //选择歌曲
    selectSong(song){
        return (e)=>{
            this.props.setSongs([song]);
            this.props.changeCurrentSong(song);
        }
    }
    playAll(){
        let songs=this.state.songs;
        this.props.setSongs(songs);
        this.props.changeCurrentSong(songs[0]);
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
        let coverData={
            'coverPic':this.state.coverPic,
            'name':album.name
        }
        return (
            <div>
                <MusicHeader title={album.name}/>
                <MusicCover data={coverData} bindPlay={this.playAll.bind(this)}/>

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

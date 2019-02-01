import React, { Component } from 'react'
import './album.less'
import LazyLoad from "react-lazyload"
import {Link} from "react-router-dom"
export default class Album extends Component {
    // constructor(props){
    //     super(props);
    // }

    // toAlbumDetail(album_id){
    //     this.props.toAlbum(album_id);
    // }
    render() {
        function getPicUrl(id){
            return `http://y.gtimg.cn/music/photo_new/T002R300x300M000${id}.jpg?max_age=2592000`
        }
        function singerBox(singers){
            let singerArray = singers.map(singer => {
                return singer.singer_name;
            });
            return singerArray.join("/");
        }
        return (
            <div className="album_wrapper">
                {
                    this.props.newAlbums.map(album=>{
                        return (
                            <Link className="album_item" key={album.album_id} to={{pathname:'/album/'+album.album_mid}}>
                                <div className="album_side">
                                    <LazyLoad>
                                        <img src={getPicUrl(album.album_mid)} alt={album.album_name} className="album_img"/>
                                    </LazyLoad>
                                </div>
                                <div className="album_info">
                                    <p className="album_name">{album.album_name}</p>
                                    <p className="album_singer">{singerBox(album.singers)}</p>
                                    <p className="album_time">{album.public_time}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

import React, { Component } from 'react'
import './search.less'
import Header from '../../model/Header'
import SearchInput from '../../model/SearchInput'
import {searchFor,getSongKey} from '../../api/jsonp'

export default class Search extends Component {
    constructor(props){
      super(props);
      this.state={
        keyWords:'',
        songs:[]
      }
    }
    getKeys(e){
      this.setState({
        keyWords:e
      });
      this.searchFor(e);
    }
    
    searchFor(keys,page,limit){
      searchFor(keys,page=1,limit=30).then(res=>{
        if(res && res.code===0){
          let songList=res.data.song.list;
          let songs=[]
          if(songList.length){
              songList.forEach(item=>{
                  let singer=item.singer.map(singer =>{
                      return singer.name;
                  });
                  let singerStr=singer.join(' / ');
                  let songImg=`http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`;
                  let song={
                      id:item.songmid,
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
              songs:songs,
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

    setPlay(song){
      this.props.setSongs([song]);
      this.props.changeSong(song);
    }

    render() {
      let {songs}=this.state;
      return (
        <div className="music-search">
          <Header />
          <SearchInput keyWords={this.state.keyWords} onBlurProps={this.getKeys.bind(this)}/>
          <div className="search_result" style={{display:this.state.keyWords?'block':'none'}}>
            {
              songs.map(song=>{
                return (
                  <div key={song.id} className="item" onClick={this.setPlay.bind(this,song)}>
                    <i className="iconfont icon-music"></i>
                    <div className="song_detail">
                      <p className="name">{song.name}</p>
                      <p className="singer">{song.singer}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )
    }
}

import React, { Component } from 'react'
import './recommend.less'
import {getNewAlbum, recommendMusic} from '../../api/jsonp'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import Album from '../../model/Album'
import Radio from '../../model/Radio'
import AlbumSkeleton from '../../model/skeleton/album'
import RadioSkeleton from '../../model/skeleton/radio'
import Header from '../../model/Header'

export default class Recommend extends Component {
  constructor(props){
    super(props);
    this.state={
      sliderList:[],
      radioList:[],
      newAlbums:[]
    };
  }
  componentDidMount(){
    getNewAlbum().then(res=>{
      if(res && res.code===0){
        let newAlbums=res.albumlib.data.list;
        newAlbums.sort((a,b)=>{
          return new Date(b.public_time).getTime() - new Date(a.public_time).getTime();
        });
        this.setState({
          newAlbums:newAlbums
        })
      }
    });
    recommendMusic().then(res=>{
      if(res && res.code===0){
        this.setState({
          sliderList:res.data.slider,
          radioList:res.data.radioList
        },()=>{
          if(!this.sliderSwiper){
            //初始化轮播图
            this.sliderSwiper=new Swiper('.swiper-container',{
              loop:true,
              autoplay:3000,
              autoplayDisableOnInteraction: false,
              pagination: {
                el: '.swiper-pagination',
              },
            })
          }
        });
      }
    })
  }

  render() {
    let {match}=this.props;
    return (
      <div className="music-recommend">
        <Header />
        <div className="recommend_wrapper">
          <div className="swiper-container" style={{display:this.state.sliderList.length?'block':'none'}}>
            <div className="swiper-wrapper">
              {
                this.state.sliderList.map(slider=>{
                  return (
                    <div className="swiper-slide" key={slider.id}>
                      <a className="slider-nav" href={slider.linkUrl}>
                        <img src={slider.picUrl} width="100%" height="100%" alt="推荐"/>
                      </a>
                    </div>
                  )
                })
              }
            </div>
            <div className="swiper-pagination"></div>
          </div>
          {
            !this.state.sliderList.length?(<div className="swiper_skeleton"></div>):''
          }
          <div className="radio_container">
            <h2 className="album_head">推荐电台</h2>
            {
              this.state.radioList.length?(<Radio radioList={this.state.radioList} />):<RadioSkeleton />
            }
          </div>

          <div className="album_container">
              <h2 className="album_head">最新专辑</h2>
              {
                this.state.newAlbums.length?(<Album pathName={match} newAlbums={this.state.newAlbums}/>):<AlbumSkeleton />
              }
          </div>
        </div>
      </div>
    )
  }
}

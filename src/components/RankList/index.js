import React, { Component } from 'react'
import {topList} from '../../api/jsonp'
import {Link} from 'react-router-dom'
import TOP3 from './TOP3'
import './rank_list.less'

export default class RankList extends Component {
    constructor(props){
        super(props);
        this.state={
            topList:[]
        }
    }
    componentDidMount(){
        topList().then(res=>{
            if(res && res.code===0){
                this.setState({
                    topList:res.data.topList
                })
            }
        })
    }
    render() {
        const numFormate=num=>{
            return num>9999?((num/10000).toFixed(2)+'w'):num
        }
        return (
            <div className="rank_list">
                {
                    this.state.topList.map(item=>{
                        return (
                            <Link to={'/ranking/'+item.id} key={item.id} className="rank_item">
                                <div className="rank_cover">
                                    <p className="rank_count"><i className="iconfont icon-headset"></i>{numFormate(item.listenCount)}</p>
                                    <img src={item.picUrl} alt={item.topTitle}/>
                                </div>
                                <div className="song_box">
                                    <h2 className="song_head">{item.topTitle}</h2>
                                    <TOP3 tops={item.songList}/>
                                </div>
                            </Link>  
                        )
                    })
                }
            </div>
        )
    }
}

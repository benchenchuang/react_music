import React, { Component } from 'react'
import {hotKey} from '../../api/jsonp'
import './hot_search.less'

export default class HotSearch extends Component {
    constructor(props){
        super(props);
        this.state={
            keywords:[]
        }
    }
    componentDidMount(){
        hotKey().then(res=>{
            if(res.code===0){
                this.setState({
                    keywords:res.data.hotkey
                })
            }
        })
    }

    getHotKey(keyword){
        this.props.getHotWords(keyword)
    }

    render() {
        let {keywords}=this.state;
        keywords=keywords.slice(0,10);
        return (
            <div className="hot_search">
                <h3 className="hot_head">热门搜素</h3>
                <ul className="keywords_box">
                    {
                        keywords.map(item=>{
                            return(
                                <li key={item.n} onClick={this.getHotKey.bind(this,item.k)}>{item.k}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

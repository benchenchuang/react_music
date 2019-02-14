import React, { Component } from 'react'
import './search_input.less'
import HotSearch from '../HotSearch'

export default class SearchInput extends Component {
    constructor(props){
        super(props);
        this.state={
            keywords:this.props.keyWords || ''
        }
    }
    onHandleSearch(e){
        let key=e.target.value;
        this.props.onBlurProps(key);
    }
    onHandleChange(e){
        let key=e.target.value;
        this.setState({
            keywords:key
        })
    }
    // componentWillReceiveProps(nextProps){
    //     let keyWords=nextProps.keyWords;
    //     if(keyWords){
    //         this.setState({
    //             keywords:nextProps.keyWords
    //         })
    //     }
    // }
    handleCancel(){
        this.setState({
            keywords:''
        });
    }
    setKeyWords(words){
        this.setState({
            keywords:words
        });
        this.props.onBlurProps(words);
    }
    render() {
        return (
            <div>
                <div className="search_form">
                    <i className="iconfont icon-search"></i>
                    <input className="search_put" type="search" name="keywords" value={this.state.keywords} placeholder="搜索歌曲、歌手、专辑" onChange={this.onHandleChange.bind(this)} onBlur={this.onHandleSearch.bind(this)}/>
                    {
                        this.state.keywords?(<span className="search_cancel" onClick={this.handleCancel.bind(this)}>取消</span>):""
                    }
                </div>
                {
                    !this.state.keywords?(<HotSearch getHotWords={this.setKeyWords.bind(this)}/>):''
                }
            </div>
        )
    }
}

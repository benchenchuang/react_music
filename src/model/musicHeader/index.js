import React, { Component } from 'react'
import './music_header.less'

export default class MusicHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            opacity:0
        }
    }
    componentDidMount(){
        window.addEventListener('scroll',this.bindScroll.bind(this));
    }
    handleBack(){
        window.history.back();
    }
    bindScroll(event){
        let scrollTop =event.srcElement.documentElement.scrollTop || event.srcElement.body.scrollTop;
        let proportion=scrollTop/220;
        let opacity=proportion>1?1:proportion;
        this.setState({
            opacity:opacity
        });
    };
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }
    render() {
        return (
            <div className="music_header" style={{background:"rgba(10,10,10,"+this.state.opacity+")"}}>
                <i className="iconfont icon-back" onClick={this.handleBack.bind(this)}></i>
                <p className="header_txt">{this.props.title}</p>
            </div>
        )
    }
}

import React, { Component } from 'react'
import './radio.less'
import LazyLoad from "react-lazyload"

export default class Radio extends Component {
    render() {
        return (
            <div className="radio_box">
                {
                    this.props.radioList.map(radio=>{
                        return (
                            <div className="radio_item" key={radio.radioid}>
                                <div className="radio_cover">
                                    <i className="iconfont icon-play"></i>
                                    <LazyLoad>
                                        <img src={radio.picUrl} alt={radio.Ftitle}/>
                                    </LazyLoad>
                                </div>
                                <div className="radio_name">{radio.Ftitle}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

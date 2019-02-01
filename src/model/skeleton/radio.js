import React, { Component } from 'react'
import '../Radio/radio.less'
export default class RadioSkeleton extends Component {
    render() {
        return (
            <div className="radio_box">
                {
                    [1,2].map(item=>{
                        return (
                            <div className="radio_item" key={item}>
                                <div className="radio_pic"></div>
                                <div className="radio_title"></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

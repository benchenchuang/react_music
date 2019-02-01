import React, { Component } from 'react'
import './album.less'

export default class AlbumSkeleton extends Component {
    render() {
        return (
        <div className="album_skeleton">
            {
                [1,2,3,4,5,6].map(item=>{
                    return (
                        <div className="skeleton_item" key={item}>
                            <div className="item_pic"></div>
                            <div className="item_info">
                                <p className="item_name"></p>
                                <p className="item_name"></p>
                                <p className="item_name"></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        )
    }
}

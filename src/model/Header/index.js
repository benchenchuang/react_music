import React, { Component } from 'react'
import logo from '../../assets/images/logo.png'
import '../../model/Header/header.less'
import {NavLink} from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
        <div className="header-box">
            <div className="header-fixed">
                <div className="app-header-fix">
                    <header className="app-header">
                        <i className="iconfont icon-list"></i>
                        <img src={logo} className="app-logo" alt="logo"/>
                        <h1 className="app-title">React Music</h1>
                    </header>
                    <div className="music-tab">
                        <div className="tab-item">
                            <NavLink to="/recommend" className="nav-link">
                                <span>推荐</span>
                            </NavLink>
                        </div>
                        <div className="tab-item">
                            <NavLink to="/ranking" className="nav-link">
                                <span>排行榜</span>
                            </NavLink>
                        </div>
                        <div className="tab-item">
                            <NavLink to="/search" className="nav-link">
                                <span>搜索</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

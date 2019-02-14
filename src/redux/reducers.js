//reducers 存放更新一切状态管理的纯函数；
import {combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'
/**
 * reducer是一个纯函数，接收旧的state和action,返回新的state
 */
 //需要存储的初始状态数据
 const initialState={
    showStatus:false,//显示状态
    song:{},//当前歌曲
    songs:[],//歌曲列表,
    scrollTop:0
 }
 //拆分reducer
 //显示或隐藏播放状态
function showStatus(showStatus=initialState.showStatus,action){
    switch(action.type){
        case ActionTypes.SHOW_PLAYER:
            return action.showStatus;
        default:
            return showStatus
    }
}
//修改当前歌曲
function song(song=initialState.song,action){
    switch(action.type){
        case ActionTypes.CHANGE_SONG:
            return action.song;
        default:
            return song;
    }
}

//添加或移除歌曲
function songs(songs=initialState.songs,action){
    switch(action.type){
        case ActionTypes.SET_SONGS:
            // return songs.concat(action.songs);
            return action.songs;
        case ActionTypes.REMOVE_SONG_FROM_LIST:
            return songs.filter(song => song.id !== action.id);
        default:
            return songs;
    }
};

function scrollTop(scrollTop=initialState.scrollTop,action){
    switch(action.type){
        case ActionTypes.SET_SCROLL_TOP:
            return action.top;
        default:
            return scrollTop
    }
}

//合并reducer
const reducer=combineReducers({
    showStatus,
    song,
    songs,
    scrollTop
});

export default reducer;

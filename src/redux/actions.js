//存放要操作的对象,必须有一个type表示要执行的操作；
import * as ActionTypes from './actionTypes'
/**
 * action是把数据从应用传到store的，它是store数据的唯一来源
 * 
 */
//Action创建函数，用来穿件action对象
export function showPlayer(showStatus){
    return {type:ActionTypes.SHOW_PLAYER,showStatus}
};

export function changeSong(song){
    return {type:ActionTypes.CHANGE_SONG,song}
};

export function removeSong(songId){
    return {type:ActionTypes.REMOVE_SONG_FROM_LIST,songId}
};

export function setSongs(songs){
    return {type:ActionTypes.SET_SONGS,songs}
};
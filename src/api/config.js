const URL = {
    // 推荐轮播
    carousel:"https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
    // 最新专辑
    newAlbum:"https://u.y.qq.com/cgi-bin/musicu.fcg",
    //推荐音乐
    recommendMusic:'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    //专辑信息
    albumInfo:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
    //排行榜
    topList:'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    //排行榜详情
    topDetail:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    //热搜
    hotKeys:'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    //搜索
    searchFor:'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
    //歌曲vkey
    songVKey:'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
}
const PARAM = {
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0
}
const OPTION = {
    param: 'jsonpCallback',
    prefix: 'callback'
}
const CODE_SUCCESS = 0;
export {URL , PARAM , OPTION , CODE_SUCCESS}
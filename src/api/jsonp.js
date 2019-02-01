import originJsonp from 'jsonp';
import {URL , PARAM ,OPTION} from './config'

let Jsonp=(url,data,option)=>{
    return new Promise((resolve,reject)=>{
        originJsonp(bindUrl(url,data),option,(err,data)=>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
};

function bindUrl(url,data){
    let params=[];
    for(var k in data){
        params.push(`${k}=${data[k]}`);
    }
    let param=params.join('&');
    if(url.indexOf('?'===-1)){
        url+='?'+param;
    }else{
        url+=param;
    }
    return url;
}

//推荐轮播
export const getCarousel=()=>{
    const data=Object.assign({},PARAM,{
        g_tk: 701075963,
		uin: 0,
		platform: "h5",
		needNewCode: 1,
		_: new Date().getTime()
    });
    return Jsonp(URL.carousel,data,OPTION);
};
//最新专辑
export const getNewAlbum=()=>{
    const data = Object.assign({}, PARAM, {
		g_tk: 1278911659,
		hostUin: 0,
		platform: "yqq",
		needNewCode: 0,
		data: `{"albumlib":
		{"method":"get_album_by_tags","param":
		{"area":1,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":50,"click_albumid":0},
		"module":"music.web_album_library"}}`
	});
	const option = {
		param: "callback",
		prefix: "callback"
	};
	return Jsonp(URL.newAlbum, data, option);
}
//推荐音乐
export const recommendMusic=()=>{
    const data = Object.assign({}, PARAM, {
		g_tk: 701075963,
		uin: 0,
		platform: "h5",
		needNewCode: 1,
		_: new Date().getTime()
    });
    return Jsonp(URL.recommendMusic,data,OPTION);
}
//专辑信息
export const albumInfo=(albumMid)=>{
    const data=Object.assign({},PARAM,{
        albummid: albumMid,
		g_tk: 1278911659,
		hostUin: 0,
		platform: "yqq",
		needNewCode: 0
    });
    return Jsonp(URL.albumInfo,data,OPTION)
}
//获取歌曲VKey
export const getSongKey=(songMid)=>{
    let data=Object.assign({},PARAM,{
        g_tk: 1278911659,
        hostUin: 0,
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cid: 205361747,
        uin: 0,
        songmid: songMid,
        filename: `C400${songMid}.m4a`,
        guid: 3655047200
    });
    const option = {
		param: "callback",
		prefix: "callback"
	};
    return Jsonp(URL.songVKey,data,option)
};
//排行榜
export const topList=()=>{
    const data=Object.assign({},PARAM,{
		g_tk: 5381,
		notice: 0,
		platform: "h5",
		needNewCode: 1
    });
    return Jsonp(URL.topList,data,OPTION)
}
//排行榜详情
export const topDetail=(topid)=>{
    let data=Object.assign({},PARAM,{
        topid: topid,
		g_tk: 5381,
		notice: 0,
		platform: "h5",
        needNewCode: 1,
        tpl: 3,
        page: 'detail',
        type: 'top'
    });
    return Jsonp(URL.topDetail,data,OPTION)
};
//热搜
export const hotKey=()=>{
    let data=Object.assign({},PARAM,{
		g_tk: 5381,
		notice: 0,
		platform: "h5",
        needNewCode: 1
    });
    return Jsonp(URL.hotKeys,data,OPTION)
}
//搜索
export const searchFor=(key,page,num)=>{
    let data=Object.assign({},PARAM,{
        w: key,
        p: page,
        n: num,
		g_tk: 5381,
		notice: 0,
		platform: "h5",
        needNewCode: 1
    });
    return Jsonp(URL.searchFor,data,OPTION)
}

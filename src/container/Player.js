import {connect} from 'react-redux'
import {showPlayer,changeSong} from '../redux/actions'
import MiniPlayer from '../components/MiniPlayer/index'
// import Player from '../components/play/Player'

//映射redux全局的state到组件的props上
const mapStateToProps=(state)=>({
    showStatus: state.showStatus,
    currentSong: state.song,
    playSongs: state.songs
});
//映射dispatch到props上
const mapDispatchToProps=(dispatch)=>({
    showMusicPlayer:(status)=>{
        dispatch(showPlayer(status))
    },
    changeCurrentSong:(song)=>{
        dispatch(changeSong(song))
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(MiniPlayer);
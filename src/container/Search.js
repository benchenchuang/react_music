import {connect} from 'react-redux';
import {setSongs,changeSong} from '../redux/actions'
import Search from '../components/Search'

const mapDispatchToProps=dispatch=>({
    setSongs:songs=>{
        dispatch(setSongs(songs))
    },
    changeSong:song=>{
        dispatch(changeSong(song))
    }
});
export default connect(null,mapDispatchToProps)(Search)
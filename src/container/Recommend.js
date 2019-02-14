import {connect} from 'react-redux'
import Recommend from '../components/Recommend'
import { setScrollTop } from '../redux/actions'

const mapStateToProps=(state)=>({
    scrollTop:state.scrollTop
})

const mapDispatchToProps=(dispatch)=>({
    setLocation:(top)=>{
        dispatch(setScrollTop(top))
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(Recommend)
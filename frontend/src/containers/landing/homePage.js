import React, { Component } from 'react';
import { connect } from 'react-redux'

import {fetchCatogories} from '../../actions'

class HomePage extends Component {

    render(){
        return(
            <React.Fragment>
            <div>Catogories</div>
            <div style={{'display':'flex','justify-content':'center','padding-top':'300px'}}>
                
                <button onClick={()=>{this.props.onClick()}}>getCats</button>
                {this.props.isCatogoryFetching ? <p>"Loading"</p>:<p></p>}
            </div>
            </React.Fragment>
            
        )
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        isCatogoryFetching: state.isCatogoryFetching,
        ...ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      onClick: () => {
        dispatch(fetchCatogories())
      }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage);
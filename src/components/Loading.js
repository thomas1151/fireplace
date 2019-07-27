
import React, { Component } from 'react';


export class Loading extends Component{

    render(){
            // let inputProps = {...this.props.inputProps};
            return(<div className="cssload-container">
                    <div className="cssload-lt"></div>
                    <div className="cssload-rt"></div>
                    <div className="cssload-lb"></div>
                    <div className="cssload-rb"></div>
                </div>)
    }
}
export default Loading;


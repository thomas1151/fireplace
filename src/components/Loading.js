
import React, { Component } from 'react';


export class Loading extends Component{
    constructor(props) {
            super(props);
    }
    render(){
            // let inputProps = {...this.props.inputProps};
            return(<div class="cssload-container">
                    <div class="cssload-lt"></div>
                    <div class="cssload-rt"></div>
                    <div class="cssload-lb"></div>
                    <div class="cssload-rb"></div>
                </div>)
    }
}
export default Loading;


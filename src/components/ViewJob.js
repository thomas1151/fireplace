import React, { Component } from 'react';
import {Link,State, Route} from 'react-router';
import template from './Invoice.rt';


export class ViewJob extends Component{
    constructor(props) {
            super(props);
            
    }
   
    render(){
            // let inputProps = {...this.props.inputProps};
            return(<div className="document a4"  style={{size: 'A4'}}>

                    <div className="header">
                        {this.props.header}
                    </div>

                    <div className="body">
                        {this.props.actions}
                    </div>


                    <div className="footer">
                        
                    </div>
                   {this.props.match.params.id}
                 
                
            </div>)
            // return(template())

    }
}
export default ViewJob;
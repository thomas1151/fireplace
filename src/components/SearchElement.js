import React, { Component } from 'react';

export class SearchElement extends Component{
    render(){
        return(
            <div className="searchBox row">
                <input className="col-xs-11" type="text"/>
                <button className="icon-holder for-input col-xs-1">
                    <div className="middle-xs center-xs icon"><i class="fas fa-search"></i></div>
                </button>
            </div>    
        )
    }
}
export default SearchElement;
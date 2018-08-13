import React, { Component } from 'react';
import { SearchElement } from './SearchElement';

export class SearchBar extends Component{
    constructor(props) {
            super(props);
    }
    render(){
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){
            return(
                <div className="searchBar isMobile row" style={{background:bg}}>
                
                <div className="col-xs-11">
                    <SearchElement/>
                </div>
               
                <div className="col-xs-1">
                    <div className="icon middle-xs"><i class="fas fa-cogs"></i></div>
                </div>
            </div>
            )
        }
        return(

            <div className="searchBar" style={{background:bg}}>
                <div className="active-outer  col-md-2">
                    <div className="logo-inner middle-xs">{this.props.logo}</div>
                </div>
                <div className="active-outer col-xs-10 col-md-8">
                    <SearchElement/>
                </div>
                <div className="active-outer  col-xs-1-4">
                    <button className="icon middle-xs"><i class="fas fa-user"></i></button>
                </div>
                <div className="active-outer col-xs-1-4">
                    <button className="icon middle-xs"><i class="fas fa-cogs"></i></button>
 
                </div>
            </div>

        )
    }
}
export default SearchBar;
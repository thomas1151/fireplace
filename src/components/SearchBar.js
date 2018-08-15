import React, { Component } from 'react';
import { SearchElement } from './SearchElement';
import { SearchBarSettings } from './SearchBarSettings';

export class SearchBar extends Component{
    constructor(props) {
            super(props);
    }
    render(){
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){
            return(
                <div id="search-bar" className="searchBar isMobile row" style={{background:bg}}>
                
                <div className="col-xs-11">
                    <SearchElement/>
                </div>
               
                <div className="active-buttons col-xs-1">
                    <div className="active-outer ">
                        <SearchBarSettings/>
                    </div>
                </div>
            </div>
            )
        }
        return(

            <div id="search-bar" className="searchBar" style={{background:bg}}>
                <div className="active-outer  col-md-2">
                    <div className="logo-inner middle-xs"><i className="fas fa-fire"></i></div>
                </div>
                <div className="col-xs-10 col-md-8">
                    <SearchElement/>
                </div>

                <div className="active-buttons col">
                    {/* <div className="active-outer  first-setting--searchBar">
                        <button className="icon middle-xs"><i class="fas fa-user"></i></button>
                    </div> */}
                    <div className="active-outer ">
                        <SearchBarSettings/>

                        
                    </div>
                </div>
            </div>

        )
    }
}
export default SearchBar;
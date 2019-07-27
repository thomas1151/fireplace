import React, { Component } from 'react';
import { SearchElement } from './SearchElement';
import { SearchBarSettings } from './SearchBarSettings';

export class SearchBar extends Component{

    render(){
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){
            return(
                <div id="search-bar" className="searchBar noPrint isMobile row" style={{background:bg}}>
                
                <div className="col-xs-11">
                    <SearchElement src={this.props.src}/>
                </div>
               
                <div className="active-buttons col-xs-1">
                    <div className="active-outer ">
                        <SearchBarSettings onLogOut={this.props.onLogOut}/>
                    </div>
                </div>
            </div>
            )
        }
        return(

            <div id="search-bar" className="searchBar noPrint" style={{background:bg}}>
                <div className="active-outer  col-md-2 end-xs">
                    <div className="logo-inner middle-xs "></div>
                </div>
                <div className="col-xs-10 col-md-8">
                    <SearchElement src={this.props.src}/>
                </div>

                <div className="active-buttons col">
                    {/* <div className="active-outer  first-setting--searchBar">
                        <button className="icon middle-xs"><i class="fas fa-user"></i></button>
                    </div> */}
                    <div className="active-outer ">
                        <SearchBarSettings onLogOut={this.props.onLogOut}/>

                        
                    </div>
                </div>
            </div>

        )
    }
}
export default SearchBar;
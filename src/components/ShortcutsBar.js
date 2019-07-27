import React, { Component } from 'react';
import { SearchElement } from './SearchElement';
import { SearchBarSettings } from './SearchBarSettings';
import { MainShortcuts } from './MainShortcuts';
import { ShortcutsMobile } from './ShortcutsMobile';
import { AuthContext } from '../contexts/authContext';
import Loading from './Loading';

export class ShortcutsBar extends Component{
    constructor(props) {
            super(props);
    }
    render(){
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){

            
            
            return(
                <div className="shortcutsBar isMobile row" >
                    <ShortcutsMobile location={this.props.location} title="Shortcuts" src={'main'} debug={true} style={{ background: this.props.config['application-style']['dark'] }}/>
                </div>
            )
        }
        return(
                // <Loading/>
                <div className="shortcutsBar col-md-2 col-lg-1 noPrint " style={ {background: this.props.config['application-style']['dark']}}>

                    <div className="user-title">
                        <p>{this.props.config['application-name']}</p>
                    </div>
                    
                    <MainShortcuts location={this.props.location} title="Shortcuts" src={'main'} debug={true}/>
                    <MainShortcuts location={this.props.location} title="Most Used" src={'mostUsed'} debug={true}/>
                    <MainShortcuts location={this.props.location} title="People" src={'people'} debug={true}/>

                    <div className="most-used-shortcuts"/>
                    <div className="people-shortcuts"/>
                </div>

        )
    }
}
ShortcutsBar.contextType = AuthContext;

export default ShortcutsBar;
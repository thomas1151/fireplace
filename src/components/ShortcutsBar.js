import React, { Component } from 'react';
import { SearchElement } from './SearchElement';
import { SearchBarSettings } from './SearchBarSettings';
import { MainShortcuts } from './MainShortcuts';
import { ShortcutsMobile } from './ShortcutsMobile';

export class ShortcutsBar extends Component{
    constructor(props) {
            super(props);
    }
    render(){
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){

            
            
            return(
                <div className="shortcutsBar isMobile row">
                    <ShortcutsMobile title="Shortcuts" src={'main'} debug={true}/>
                </div>
            )
        }
        return(
                <div className="shortcutsBar col-md-2">
                    <div className="user-title">
                        <p>Thomas Barratt</p>
                    </div>
                    <MainShortcuts title="Shortcuts" src={'main'} debug={true}/>
                    <MainShortcuts title="Most Used" src={'mostUsed'} debug={true}/>
                    <MainShortcuts title="People" src={'people'} debug={true}/>
                    <div className="most-used-shortcuts">
                    </div>
                    <div className="people-shortucts">
                    </div>
                </div>

        )
    }
}
export default ShortcutsBar;
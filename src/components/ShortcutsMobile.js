import React, { Component } from 'react';
import { SearchElement } from './SearchElement';
import { SearchBarSettings } from './SearchBarSettings';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const shortcuts_main = [
    {
        title: '',
        url: "",
        icon: 'fas fa-home',
    },
    {
        title: '',
        url: "actions",
        icon: 'fas fa-fire',
    },
    {
        title: '',
        url: "invoices",
        icon: 'fas fa-file-invoice',
    },
    {
        title: '',
        url: "quotes",
        icon: 'fas fa-receipt',
    },
    {
        title: '',
        url: "people",
        icon: 'fas fa-user',
    },
    {
        title: '',
        url: "locations",
        icon: 'fas fa-map-marker-alt',
    },
];

export class ShortcutsMobile extends Component{
    constructor(props) {
            super(props);
            if(this.props.debug){
                this.state = {
                    items: eval("shortcuts_"+this.props.src)
                }
            }
    }
    render(){
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){
            return(
                <div className="shortcutsBar isMobile row">
                
                </div>
            )
        }

        const listItems = this.state.items.map((item) =>
            <div className="col-xs mobile-shortcut for-input"><Link to={item.url}><i className={item.icon}></i>{item.title}</Link></div>
        );

        return(
            <div className="main-shortcuts">
                <div className="row">
                    {listItems}
                </div>

            </div>
        )
    }
}
export default ShortcutsMobile;
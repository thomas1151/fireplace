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
        title: 'Home',
        url: "",
        icon: 'fas fa-home',
    },
    {
        title: 'Actions',
        url: "actions",
        icon: 'fas fa-fire',
    },
    {
        title: 'Jobs',
        url: "jobs",
        icon: 'fas fa-briefcase',
    },
    {
        title: 'Documents',
        url: "documents",
        icon: 'fas fa-file-alt',
    },
    {
        title: 'People',
        url: "people",
        icon: 'fas fa-user',
    },
    {
        title: 'Organisations',
        url: "organisations",
        icon: 'fas fa-building',
    },
    {
        title: 'Location',
        url: "locations",
        icon: 'fas fa-map-marker-alt',
    },
];


const shortcuts_mostUsed = [{
        title: 'Ray Estate',
        url: "locations/ray-estate",
        icon: 'fas fa-map-marker',
    }
];

const shortcuts_people = [{
        title: 'Thomas Barratt',
        url: 'people/tbarratt',
        icon: 'fas fa-user',
        
},
{
    title: 'Donald Trump',
    url: 'people/donald-trump',
    icon: 'fas fa-user'
}]


export class MainShortcuts extends Component{
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

        const listItems = this.state.items.map((item,i) =>
            <li key={i} className={(item.url.length > 1 ? (this.props.location.pathname.startsWith('/' + item.url) && 'selected') : (this.props.location.pathname === item.url + "/" && 'selected'))}><Link to={'/' + item.url}><i className={item.icon}></i><div className="item-title">{item.title}</div></Link></li>
        );

        return(
            <div className="main-shortcuts">
                <div className="section-title">
                    <p>{this.props.title}</p>
                </div>
                <ul className="shortcutList">
                    {listItems}
                </ul>
            </div>
        )
    }
}
export default MainShortcuts;
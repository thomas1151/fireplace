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
        url: "jobs",
        icon: 'fas fa-briefcase',
    },
    {
        title: '',
        url: "documents",
        icon: 'fas fa-file-alt',
    },
    {
        title: '',
        url: "people",
        icon: 'fas fa-users',
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
            this.trackScrolling = this.trackScrolling.bind(this);
            if(this.props.debug){
                this.state = {
                    items: eval("shortcuts_"+this.props.src),
                    atTop:false
                }
            }
    }
    isTop(el) {
        console.log(el.getBoundingClientRect);
        return el.getBoundingClientRect().bottom <= 0;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('search-bar');
        if (this.isTop(wrappedElement)) {
            this.setState({'atTop':true})
            // document.removeEventListener('scroll', this.trackScrolling);
        }else{
            this.setState({'atTop':false})
        }
    };

    render(){
        let bg =this.props.backgroundColor;
        let classesToAdd = "";
        if(this.state.atTop){
            classesToAdd += "stuck-top"
        }
        const listItems = this.state.items.map((item) =>
            <div key={item.icon + item.url} className={"col-xs mobile-shortcut for-input " +  (item.url.length > 1 ? (this.props.location.pathname.startsWith('/' + item.url) && 'selected') : (this.props.location.pathname === item.url + "/" && 'selected'))}><Link to={'/'+item.url}><i className={item.icon}></i>{item.title}</Link></div>
        );

        return(
            <div className={"main-shortcuts "+classesToAdd} id="shortcuts-bar" style={this.props.style}>
                <div className="row">
                    {listItems}
                </div>

            </div>
        )
    }
}
export default ShortcutsMobile;
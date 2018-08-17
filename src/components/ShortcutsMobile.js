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
        document.addEventListener('touchmove', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
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
            <div className="col-xs mobile-shortcut for-input "><Link to={item.url}><i className={item.icon}></i>{item.title}</Link></div>
        );

        return(
            <div className={"main-shortcuts "+classesToAdd} id="shortcuts-bar" >
                <div className="row">
                    {listItems}
                </div>

            </div>
        )
    }
}
export default ShortcutsMobile;
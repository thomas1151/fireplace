import React, { Component } from 'react';

export class SearchBarSettings extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: false
        };

        // This binding is necessary to make `this` work in the callback
        this.handleToggle = this.handleToggle.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isToggleOn) {
            this.setState({isToggleOn:false})
        }
    }

    handleToggle() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render(){
        return(
        <div className="menu-outer" ref={this.setWrapperRef}>
            <button onClick={this.handleToggle} className="icon middle-xs"><i className="fas fa-user"></i></button>
            <div className={"menu-settings "+(this.state.isToggleOn ? 'menu-open' : '')}>
                <div className="menu-title">
                    <p>Thomas Barratt</p>
                </div>
                <ul>
                    <li><a><i className="fas fa-info"></i>About You</a></li>
                    <li><a><i className="fas fa-cogs"></i>Settings</a></li>                    
                    <li><a><i className="fas fa-sign-out-alt"></i>Logout</a></li>
                </ul>
            </div>
        </div>)
    }
}
export default SearchBarSettings;
import React, { Component } from 'react';
import { AuthContext } from '../contexts/authContext';
import Link from 'react-router-dom/Link';


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
        this.handleLogOut = this.handleLogOut.bind(this);
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

    handleLogOut(){
        if(this.props.onLogOut){
            this.props.onLogOut();
        }
    }
    render(){
        return(
            (this.context.user ? 
            <div className="menu-outer" ref={this.setWrapperRef}>
                <button onClick={this.handleToggle} className="icon middle-xs profile-menu">
                    <i className="fas fa-user"></i>
                    <p>{this.context.user.name}</p>
                </button>
                <div className={"menu-settings "+(this.state.isToggleOn ? 'menu-open' : '')}>
                    <div className="menu-title">
                        <p>{this.context.domain}</p>
                    </div>
                    <div className="menu-title">
                        <p>{this.context.user.name}</p>
                    </div>
                    <ul>
                        <li><Link to={'/people/'+this.context.user.username}><i className="fas fa-info"></i>About You</Link></li>
                        {/* <li><a><i className="fas fa-cogs"></i>Settings</a></li>                     */}
                        <li><Link to='/'  onClick={this.handleLogOut}><i className="fas fa-sign-out-alt"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>
            :
                <div className="menu-outer" ref={this.setWrapperRef}>
                    <button onClick={this.handleToggle} className="icon middle-xs"><i className="fas fa-user"></i></button>
                    <div className={"menu-settings " + (this.state.isToggleOn ? 'menu-open' : '')}>
                        <div className="menu-title">
                            <p>{this.context.username}</p>
                        </div>
                        <ul>
                            <li><Link onClick={this.handleLogOut} to='/'><i className="fas fa-sign-out-alt"></i>Logout</Link></li>
                        </ul>
                    </div>
                </div>            
                )
        )
    }
}
SearchBarSettings.contextType = AuthContext;
export default SearchBarSettings;

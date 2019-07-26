import React, { Component } from 'react';


export class Checkbox extends Component{
    constructor(props) {
            super(props);
            this.state = {
                checked: true
            }
            this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        this.props.hasOwnProperty('defaultCheck') && this.setState({checked: this.props.defaultCheck}) 
    }
    toggle(event) {
        let checked = !this.state.checked;
        if(this.props.onToggle){
            this.props.onToggle(checked)
        }
        this.setState({
            checked: checked
        });
    }
    render(){
            // let inputProps = {...this.props.inputProps};
            return(<div class="custom-checkbox">
                {/* <input type="checkbox" onChange={(e) => this.toggle(e)} {...inputProps} id="custom-checkbox" /> */}
                <label for="custom-checkbox " className={this.props.className+" "+(this.state.checked && 'checked') } onClick={(e) => this.toggle(e)}></label>
            </div>)
    }
}
export default Checkbox;
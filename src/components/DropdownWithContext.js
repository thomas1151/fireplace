import React, { Component } from 'react';


export class DropdownWithContext extends Component{
    constructor(props) {
            super(props);
            this.state = {
                value: 'select'
            }
            this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        this.setState({
            value: event.target.value
        });
        this.props.onSelect(this.props.id,event.target.value)
    }
    render(){
            // let inputProps = {...this.props.inputProps};
            let styles = {
                container : "dropdownWithContext-container",
                wrapper   : "dropdownWithContext-wrapper",
                select    : "dropdownWithContext",
                option    : "option"
            }
            if(this.props.customStyles){
                styles.container += " "+this.props.customStyles.container;
                styles.wrapper += " "+this.props.customStyles.wrapper;
                styles.select += " "+this.props.customStyles.select;
                styles.option += " "+this.props.customStyles.option; 
            }
            return(
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                    {this.props.children}
                    <select className={styles.select} onChange={(e) => this.onChange(e)} value={this.state.value}>
                        <option value="select">Select</option>
                        {this.props.items.map( (f,i) =>{
                            return(<option className={styles.option} value={f.value}>{f.label}</option>)
                        }) }            
                    </select>
                    </div>
                </div>
            )
    }
}
export default DropdownWithContext;
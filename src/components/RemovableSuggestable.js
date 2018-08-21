import React, { Component } from 'react';
import ActionPerson from './ActionPerson';
export class RemovableSuggestable extends Component{
    constructor(props) {
            super(props);
    }

    render(){
            // let inputProps = {...this.props.inputProps};
            return(<div key={this.props.id} className="row">
                        <ActionPerson assigned={this.props.assigned} className={this.props.inputProps.suggestable} id={this.props.id} src={this.props.src} onChangeForParent={this.props.onChangeForParent} debug={this.props.debug}/>
                        {/* <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} /> */}
                        {this.props.existingPeopleLength < 1 ? <div><p>Add a new person</p></div> : null}
                        <button className={this.props.inputProps.button} onClick={()=>this.props.onRemove(this.props.id)}><i className="fas fa-times"></i></button>
                    </div> );
    }
}
export default RemovableSuggestable;
import React, { Component } from 'react';
import ActionPerson from './ActionPerson';
import fetchSuggestions from '../logic/fetchSuggestions';

export class RemovableSuggestable extends Component{
    constructor(props) {
            super(props);
            this.state ={
                isLoaded: true,
                suggestData: []
            }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(value, src, endpoint, keyPositions, propName, idField, other) {
        fetchSuggestions(value, src, endpoint, keyPositions, propName, this, idField, other);
    }
    render(){
            // let inputProps = {...this.props.inputProps};
            return (
                this.state.isLoaded &&
            <div key={this.props.id} className="row">
                        <ActionPerson
                            minQueryLength={0}
                            endpoint={this.props.endpoint}
                            propName={this.props.propName}
                            data={this.state.suggestData}
                            assigned={this.props.assigned} 
                            className={this.props.inputProps.suggestable} 
                            id={this.props.id} 
                            onFetchForParent={this.fetchData} 
                            onChangeForParent={this.props.onChangeForParent}
                            onSelectedForParent={this.props.onSelectedForParent}
                            keyPositions={this.props.keyPositions}
                            debug={this.props.debug}/>
                        {this.props.existingPeopleLength < 1 ? <div><p>Add a new person</p></div> : undefined}
                        <button className={this.props.inputProps.button} onClick={()=>this.props.onRemove(this.props.id)}><i className="fas fa-times"></i></button>
            </div> );
    }
}
export default RemovableSuggestable;
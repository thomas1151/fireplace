import React, { Component } from 'react';
import ActionPerson from './ActionPerson';
import axios from "axios";
import objectMap from '../logic/objectMap';

export class RemovableSuggestable extends Component{
    constructor(props) {
            super(props);
            this.state ={
                isLoaded: false
            }
    }
    componentDidMount() {
        let self = this;
        axios.get(this.props.src.url + 'users/')
            .then(function (response) {
                let data = response.data;
                // handle success
  
                let suggestData = []


                data.map( (option,i) => { 
                        suggestData.push({id: option.id, data: [], other:"1"})
                        for (var key in option) {
                            if (option.hasOwnProperty(key)) {
                                switch(key){
                                    case 'name':
                                    case 'email': suggestData[suggestData.length - 1]['data'].unshift([key, option[key]]); break;
                                    default: suggestData[suggestData.length - 1]['data'].push([key, option[key]]);
                                }
                            }
                        }
                })
                console.log(suggestData);
                self.setState({
                    isLoaded: true,
                    items: data,
                    suggestData: suggestData,
                    response
                });
            })
            .catch(function (error) {
                // handle error
                self.setState({
                    isLoaded: true,
                    error
                });
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }

    render(){
            // let inputProps = {...this.props.inputProps};
            return (
                this.state.isLoaded &&
            <div key={this.props.id} className="row">
                        <ActionPerson 
                            assigned={this.props.assigned} 
                            className={this.props.inputProps.suggestable} 
                            id={this.props.id} 
                            src={this.state.suggestData} 
                            onChangeForParent={this.props.onChangeForParent}
                            onSelectedForParent={this.props.onSelectedForParent}
                            debug={this.props.debug}/>
                        {/* <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} /> */}
                        {this.props.existingPeopleLength < 1 ? <div><p>Add a new person</p></div> : null}
                        <button className={this.props.inputProps.button} onClick={()=>this.props.onRemove(this.props.id)}><i className="fas fa-times"></i></button>
            </div> );
    }
}
export default RemovableSuggestable;
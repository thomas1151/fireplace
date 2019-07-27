
import React, {
    Component
} from 'react';
import {ActionPerson} from './ActionPerson';
import fetchSuggestions from '../logic/fetchSuggestions';

export class ActionLocation extends Component {
    constructor(props) {
        super(props);
        this.handleLocationAutofill = this.handleLocationAutofill.bind(this);
        this.onChangeForParent = this.onChangeForParent.bind(this);
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
        this.state ={
            line1:undefined,
            line2:undefined,
            line3:undefined,
            line4:undefined,
            postcode:undefined,
            isLoaded: true,
            line1SuggestData: [],
            line2SuggestData: [],
            line3SuggestData: [],
            line4SuggestData: [],
            postcodeSuggestData:[],
            
        }
    }

     componentDidMount() {

     }


    handleLocationAutofill(s,i){
        console.log(s);
        let a = []
        s.suggestion.data.map((d, i) => { 
            a[[d[0]]] = d[1];
            return null;
        })
        a["id"] = s.suggestion.id
        console.log(a)
        this.setState({...a});
        this.props.onChangeForParent(a)
    }
    onChangeForParent(i, value) {
        this.setState({[i]:value})

        this.props.onChangeForParent(value, i);

    }
    fetchSuggestions(value, src, endpoint, keyPositions, propName, idField = 'id', other = "1"){
      fetchSuggestions(value, src, endpoint, keyPositions, propName, this, idField, other);
    }
    render() {

        // autoFocus and initialDate are helper props for the example wrapper but are not
        // props on the SingleDatePicker itself and thus, have to be omitted.
        if (this.props.isMobile) {

        }
        let assignedVals = []
        if(this.props.values){
            assignedVals = this.props.values
        }else{
            assignedVals = {
                line1: this.state.line1    ,
                line2:this.state.line2    ,
                line3:this.state.line3    ,
                line4:this.state.line4    ,
                postcode:this.state.postcode ,
            }
        }
        return (
            this.state.isLoaded ?
            <div className="address row">
                <div className="col-xs-6 address-1 input-wrap ">
                    <ActionPerson assigned={assignedVals.line1} endpoint={'locations/?line1__icontains='} propName={'line1'} value={'line1'}  id={'line1'} data={this.state.line1SuggestData} debug={false} onFetchForParent={this.fetchSuggestions} onSelectedForParent={this.handleLocationAutofill} onChangeForParent={this.onChangeForParent} placeholder="Line 1"/>
                </div>

                <div className="col-xs-6 address-2 input-wrap">
                    <ActionPerson assigned={assignedVals.line2}   endpoint={'locations/?line2__icontains='} propName={'line2'}   value={'line2'}   id={'line2'}  data={this.state.line2SuggestData} debug={false} onFetchForParent={this.fetchSuggestions} onChangeForParent={this.onChangeForParent} placeholder="Line 2"/>
                </div>
                
                <div className="col-xs-6 address-3 input-wrap">
                    <ActionPerson assigned={assignedVals.line3}  endpoint={'locations/?line3__icontains='} propName={'line3'}  value={'line3'}   id={'line3'}  data={this.state.line3SuggestData} debug={false} onFetchForParent={this.fetchSuggestions} onChangeForParent={this.onChangeForParent} placeholder="Line 3"/>
                </div>
                
                <div className="col-xs-6 address-4 input-wrap">
                    <ActionPerson assigned={assignedVals.line4}  endpoint={'locations/?line4__icontains='} propName={'line4'}  value={'line4'}   id={'line4'}  data={this.state.line4SuggestData} debug={false} onFetchForParent={this.fetchSuggestions} onChangeForParent={this.onChangeForParent} placeholder="Line 4"/>
                </div>
                
                <div className="col-xs-6 address-postcode input-wrap">
                    <ActionPerson assigned={assignedVals.postcode} endpoint={'locations/?postcode__icontains='}  propName={'postcode'} value={'postcode'} id={'postcode'}  data={this.state.postcodeSuggestData} debug={false} onFetchForParent={this.fetchSuggestions} onChangeForParent={this.onChangeForParent} placeholder="Postcode"/>
                </div>
                {this.props.children}

            </div>
            :
            "Loading"
        )
    }
}





export default ActionLocation;
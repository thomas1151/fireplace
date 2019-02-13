
import React, {
    Component
} from 'react';
import moment from 'moment';
import {ActionPerson} from './ActionPerson';
import axios from "axios";

export class ActionLocation extends Component {
    constructor(props) {
        super(props);
        this.handleLocationAutofill = this.handleLocationAutofill.bind(this);
        this.onChangeForParent = this.onChangeForParent.bind(this);
        this.state ={

        }
    }

     componentDidMount() {
         let self = this;
         axios.get(this.props.src.url + 'locations/')
             .then(function (response) {
                 let data = response.data;
                 // handle success

                 let suggestData = []


                 data.map((option, i) => {
                     suggestData.push({
                         id: option.id,
                         data: [],
                         other: '1'
                     })
                     for (var key in option) {
                         if (option.hasOwnProperty(key)) {
                             switch (key) {
                                 case 'line1': suggestData[suggestData.length - 1]['data'].unshift([key, option[key]]); break;
                                case 'line2': suggestData[suggestData.length - 1]['data'].splice(1,0,[key, option[key]]); break;

                                 default:
                                     suggestData[suggestData.length - 1]['data'].push([key, option[key]]);
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


    handleLocationAutofill(s,i){
        console.log(s);
        let a = []
        s.suggestion.data.map((d, i) => { 
            a[[d[0]]] = d[1];
        })
        a["id"] = s.suggestion.id
        console.log(a)
        this.setState({...a});
        this.props.onChangeForParent(a)
    }
    onChangeForParent(i, value) {
        const { l1,l2,l3,l4,postcode } = this.state;
        this.setState({[i]:value})

        this.props.onChangeForParent(value, i);

    }

    render() {

        // autoFocus and initialDate are helper props for the example wrapper but are not
        // props on the SingleDatePicker itself and thus, have to be omitted.
        const props = this.props;
        let bg = this.props.backgroundColor;
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
                    <ActionPerson assigned={assignedVals.line1} value={'line1'}  id={'line1'} src={this.state.suggestData} debug={false} onSelectedForParent={this.handleLocationAutofill} onChangeForParent={this.onChangeForParent} placeholder="Line 1"/>
                </div>

                <div className="col-xs-6 address-2 input-wrap">
                    <ActionPerson assigned={assignedVals.line2}   value={'line2'}   id={'line2'}  src={this.state.suggestData} debug={false} onChangeForParent={this.onChangeForParent} placeholder="Line 2"/>
                </div>
                
                <div className="col-xs-6 address-3 input-wrap">
                    <ActionPerson assigned={assignedVals.line3}  value={'line3'}   id={'line3'}  src={this.state.suggestData} debug={false} onChangeForParent={this.onChangeForParent} placeholder="Line 3"/>
                </div>
                
                <div className="col-xs-6 address-4 input-wrap">
                    <ActionPerson assigned={assignedVals.line4}  value={'line4'}   id={'line4'}  src={this.state.suggestData} debug={false} onChangeForParent={this.onChangeForParent} placeholder="Line 4"/>
                </div>
                
                <div className="col-xs-6 address-postcode input-wrap">
                    <ActionPerson assigned={assignedVals.postcode}  value={'postcode'}id={'postcode'}  src={this.state.suggestData} debug={false} onChangeForParent={this.onChangeForParent} placeholder="Postcode"/>
                </div>
                {this.props.children}

            </div>
            :
            "Loading"
        )
    }
}





export default ActionLocation;
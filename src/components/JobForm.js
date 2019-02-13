import React, { Component } from 'react';
import { ActionLocation } from './ActionLocation';
import { ActionPerson } from './ActionPerson';
import { SingleDateInput} from './SingleDateInput';
import { DropdownWithContext } from './DropdownWithContext';
import { isEqual } from 'lodash';
import axios from "axios";
import fetchSuggestions from "../logic/fetchSuggestions";
// const people_types= [
//     {
//         label: <div><i className="fas fa-user"/>Provider</div>,
//         value: '1',
//     },
//     {
//         label: <div><i className="fas fa-user"/>Client</div>,
//         value: '2',
//     },
//     {
//         label: <div><i className="fas fa-times"/>Don't Show</div>,
//         value: '3',
//     },
// ]
export class JobForm extends Component{
    constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleDateChange = this.handleDateChange.bind(this);
            this.handleOrgChange = this.handleOrgChange.bind(this);
            this.handleJobAddrChange = this.handleJobAddrChange.bind(this);
            this.calcPeople = this.calcPeople.bind(this);
            this.onPeopleTypeChange = this.onPeopleTypeChange.bind(this);
            this.handleSelected = this.handleSelected.bind(this);

            let jobAddr = this.actionAddressCalcEquality(this.props.selectedActions)
            let people = this.calcPeople()
            this.state = {
                start_date: new Date(),
                invoice_address: {
                    ['line1']: undefined,
                    ['line2']: undefined,
                    ['line3']: undefined,
                    ['line4']: undefined,
                    ['postcode']: undefined,
                },
                job_address: jobAddr,
                people: people,
                
            };
            this.props.onJobAddrChange(jobAddr);
            this.props.onDateChange(this.state.start_date);
            this.props.onPeopleChange(this.state.people)
    }

    componentDidMount() {
        let self = this;
        fetchSuggestions(this.props.src.url, "organisation", [], self, "org");        
        fetchSuggestions(this.props.src.url, "status-type", [], self, "statusType");
        fetchSuggestions(this.props.src.url,"work-type",[],self,"workType");
        fetchSuggestions(this.props.src.url, "ref-type", [], self, "refType");
        let people_types = []
        

        this.setState({people_types: people_types})
    }

        


    handleChange(id,value){
        if(id!="organisation"){
            this.setState({ [id] :value});
            this.props.handleChange(id,value)
        }
    }
    handleDateChange(day){
        this.props.onDateChange(day)
        this.setState({date:day});
    }
    
    handleLocationChange(values,i){
        let locations = this.state.invoice_address
        if(i === undefined){

            locations.line1 = values[0]
            locations.line2 = values[1]
            locations.line3 = values[2]
            locations.line4 = values[3]
            locations.postcode = values[4]

            this.props.onInvoiceAddrChange({line1:values[0],line2:values[1],line3:values[2],line4:values[3],postcode:values[4]});

            this.setState({invoice_address:locations})
        }else{
            locations[[i]] = values;
            this.setState({invoice_address:locations})
        }
    }

    handleJobAddrChange(values, i) {
        let locations = this.state.job_address
        if (i === undefined) {

            locations.line1 = values[0]
            locations.line2 = values[1]
            locations.line3 = values[2]
            locations.line4 = values[3]
            locations.postcode = values[4]
            this.props.onJobAddrChange({line1:values[0],line2:values[1],line3:values[2],line4:values[3],postcode:values[4]});

            this.setState({
                job_address: locations
            })
        } else {
            locations[[i]] = values;
            this.setState({
                job_address: locations
            })
        }
        this.props.onJobAddrChange(locations)

    }
    generatePeopleTypes(){
        let people = []
        for (let i = 0; i < this.state.refTypeSuggestData.length; i++){
            let peep_type = {}

            for (let l = 0; l < this.state.refTypeSuggestData[i].data.length; l++) {

                switch (this.state.refTypeSuggestData[i].data[l][0]) {
                    case 'id': peep_type["value"] = this.state.refTypeSuggestData[i].data[l][1]; break; 
                    case 'name': peep_type["label"] =  <div><i className="fas fa-user"/>{this.state.refTypeSuggestData[i].data[l][1]}</div>; break; 
                }
            }
            people.push(peep_type);
        }
        return people;
    }
    handleOrgChange(s){
        console.log(s);
        let locations = this.state.invoice_address
        locations={
            line1:    s.suggestion.data[1][1].line1,
            line2:    s.suggestion.data[1][1].line2,
            line3:    s.suggestion.data[1][1].line3,
            line4:    s.suggestion.data[1][1].line4,
            postcode: s.suggestion.data[1][1].postcode,
            id: s.suggestion.data[1][1].id
        }
        this.props.onOrgChange({organisation: s.suggestion.data[4][1], invoice_address: locations});
        this.setState({organisation: s.suggestion.data[4], invoice_address: locations})

    }
    actionAddressCalcEquality(acts){
        if(acts.length < 2){
            return acts[0].location;
        }
        let definiteAddr = {}

        for (var i = 1, len = acts.length; i < len; i++) {
            if(acts[i].location.length === 0){
                continue; 
            }
            if (acts[i].location.length !== acts[i - 1].location.length ){
                return false;
            }
            let actsILocations = Object.values(acts[i].location)
            let actsIMinus1Locations = Object.values(acts[i-1].location)

            if (actsILocations[actsILocations.length-1] === actsIMinus1Locations[actsILocations.length-1]) {
                return acts[i].location;
            }

            let actsIKeys = Object.keys(acts[i].location);
            let actsIMinus1Keys = Object.keys(acts[i-1].location);

            for (var j = actsILocations.length-2; j >= 0; j--) {
                if (actsILocations[j] !== actsIMinus1Locations[j]){

                    definiteAddr[actsIKeys[j]] = '';
                    break;
                }
                definiteAddr[actsIKeys[j]] = actsILocations[j];
            }
            if(!definiteAddr[['line1']]){
                definiteAddr[ ['line1'] ] = 'Various' 
            }
        }
        return definiteAddr;
    }

    calcAddrVals(){
        let acts = this.props.selectedActions;
        // console.log(this.props.selectedActions);

        return this.actionAddressCalcEquality(acts)
        // this.setState({job_address:this.actionAddressCalcEquality(acts)});
    }
    onPeopleTypeChange(i,val){
        let peeps = this.state.people
        peeps[i][ ['type'] ] = val;
        this.setState({people:peeps})
        this.props.onPeopleChange(this.state.people)

    }

    calcPeople(){
        let acts = this.props.selectedActions;
        let peeps = []
        for(let i = 0; i < acts.length; i++){
            for(let j = 0; j < acts[i].people.length;j++){
                let exists = false;
                for(let k =0; k < peeps.length;k++){
                    if(isEqual(peeps[k],acts[i].people[j])){
                        exists = true;
                    }
                    // if(exists){
                    //     continue
                    // }
                }
                if(exists == false){
                    peeps.push(acts[i].people[j])
                }
            }
        }
        return peeps;
    }
    handleSelected(s, state_val) {
        console.log(s);
        this.setState({ [state_val+"_data"]:s.suggestion.id})
        if(this.props.handleSelected){
            this.props.handleSelected(s.suggestion.id,state_val);
        }
    }
    render(){
        return(
            <div className="jobForm">

                <div className="row">

                    <div className="org col-xs-12 col-sm-6">
                        <div className="section-title">
                            <p>Organisation and Invoice Address</p>
                        </div>
                        {this.state.orgLoaded && 
                        
                            <React.Fragment>
                                <ActionPerson className="col-xs-12" id={'organisation'} src={this.state.orgSuggestData} onSelectedForParent={this.handleOrgChange} onChangeForParent={this.handleChange} debug={false}/>
                                <ActionLocation src={this.props.src} id={'inv-addr'} onChangeForParent={this.handleLocationChange.bind(this)} values={this.state.invoice_address}>
                                </ActionLocation> 
                            </React.Fragment>
                        }
                    </div>
                    <div className="org col-xs-12 col-sm-6">
                        <div className="section-title">
                            <p>Job Address</p>
                        </div>
                        <ActionLocation src={this.props.src} values={this.state.job_address} id={'job-addr'} onChangeForParent={this.handleJobAddrChange.bind(this)}>
                        </ActionLocation>
                    </div>
                    <div className="type col-xs-12 col-sm-6 row">
                        <div className="section-title col-xs-12">
                            <p>Status</p>
                        </div>
                        <p className="col-xs-3">This is a</p> 
                        {this.state.statusTypeLoaded && <ActionPerson className="col-xs" id={'statusType'} src={this.state.statusTypeSuggestData} onSelectedForParent={this.handleSelected} onChangeForParent={this.handleChange} debug={false}/> }
                    </div>
                    <div className="type col-xs-12 col-sm-6 row">
                        <div className="section-title col-xs-12">
                            <p>Work Type</p>
                        </div>
                        {this.state.workTypeLoaded && <ActionPerson className="col-xs" id={'workType'} src={this.state.workTypeSuggestData} onSelectedForParent={this.handleSelected} onChangeForParent={this.handleChange} debug={false}/> }
                    </div>
                    <div className="date-wrapper col-xs-12 col-sm-6 row">
                        <div className="section-title col-xs-12">
                            <p>Date</p>
                        </div>
                        <SingleDateInput className="col-xs-12" isMobile={this.props.isMobile} onChangeForParent={this.handleDateChange} start_date={this.state.start_date}/>
                    </div>
                    <div className="type col-xs-12 col-sm-6 row">
                        <div className="section-title col-xs-12">
                            <p>Notes</p>
                        </div>
                        <textarea className="col-xs" onChange={ (e) => this.handleChange('notes',e.target.value)} placeholder="Prompt payment would be appreciated">
                        </textarea>
                    </div>
                    <div className="type col-xs-12">
                        <div className="section-title col-xs-12">
                            <p>People</p>
                        </div>
                        <div className="col-xs-12 row">
                        {this.state.refTypeLoaded && this.state.people.map( (el,i) =>{
                            return(<DropdownWithContext id={i} items={this.generatePeopleTypes()}
                                    customStyles={{
                                        container: 'col-xs-6 col-sm-3', 
                                        wrapper:   '',
                                        select: '',
                                        opton: ''
                                    }}
                                    onSelect={this.onPeopleTypeChange}>
                                    <div className="info">
                                        <div className="title">{el.name}</div>
                                        <div className="subtitle">{el.organisation.name}</div>
                                    </div>
                                    </DropdownWithContext>)
                         })}            
                        </div>
                        </div>
                </div>
            </div>
        )
    }
}
export default JobForm;
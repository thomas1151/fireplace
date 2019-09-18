import React, { Component } from 'react';
import { ActionPerson } from './ActionPerson';
import { JobForm } from './JobForm';
import fetchSuggestions from '../logic/fetchSuggestions';
import { DropdownWithContext } from './DropdownWithContext';

import { isEqual } from 'lodash';

export class ActionSelection extends Component{

    constructor(props) {
        super(props);
        this.totalPrice = this.totalPrice.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleJobChange = this.handleJobChange.bind(this);
        this.exportFormJSON = this.constructFormJSON.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewJob = this.handleNewJob.bind(this);
        this.addActions = this.addActions.bind(this);
        this.handleBack = this.handleBack.bind(this); 
        this.onDateChange = this.onDateChange.bind(this);
        this.onInvoiceAddrChange = this.onInvoiceAddrChange.bind(this);
        this.onJobAddrChange = this.onJobAddrChange.bind(this);
        this.onOrgChange = this.onOrgChange.bind(this);
        this.onPeopleChange = this.onPeopleChange.bind(this);
        this.onJobChange = this.onJobChange.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleSelected = this.handleSelected.bind(this);
        this.onPeopleTypeChange = this.onPeopleTypeChange.bind(this);
        this.state ={
            jobLinkForm:false, 
            documentForm: false,
            addToJobForm: false,
            job: {},
            notes: '',
            statusTypeSuggestData: [],
            jobSuggestData: [],
            documentSuggestData: [],
            refTypeSuggestData: []
        }
    }
    componentDidMount(){
        let self = this;
        fetchSuggestions("", this.props.src.url, "ref-type/", [], "refType", self);
        let people = this.calcPeople()
        this.setState({people:people});
    }
    totalPrice(){
        if(this.props.items.length > 0){
            return(this.props.items.map(item => item.price*item.quantity).reduce((prev, next) => prev + next));
        }else{
            return(0)
        }

    }
    handleRemove(el){
        this.props.onRemove();
    }
    handleRemoveSingle(i){
        this.props.onSingleRemove(i);
    }
    handleJobChange(i,value){
        this.setState({job:{name:value}})
    }
    handleNewJob(){
        this.setState({newJobForm:true,hideJobBox:true})
    }
    newJob(){
        return(<JobForm onDateChange={this.onDateChange}
onInvoiceAddrChange={this.onInvoiceAddrChange}
onJobAddrChange={this.onJobAddrChange}
onOrgChange={this.onOrgChange}
onPeopleChange={this.onPeopleChange}
src={this.props.src}
handleSelected={this.handleSelected}
handleChange={this.onJobChange} isMobile={this.props.isMobile} selectedActions={this.props.items}/>);

    }
    handleChange(id, value) {
        console.log(id)
        console.log(value)
        this.setState({ [id]: value });
        if (this.props.handleChange) {
            this.props.handleChange(id, value)
        }

    }
    handleSelected(s, state_val) {
        console.log(s);
        this.setState({ [state_val + "_data"]: s.suggestion.id })
        if (this.props.handleSelected) {
            this.props.handleSelected(s.suggestion.id, state_val);
        }
    }
    fetchSuggestions(value, src, endpoint, keyPositions, propName, idField = 'id', other = "1") {
        fetchSuggestions(value, src, endpoint, keyPositions, propName, this, idField, other);
        
    }

    jobLink(){
        return(
            <div className="col-xs-12">
                {this.state.hideJobBox ? 
                null:
                    <React.Fragment>
                        <div className="job-ref">
                                {/* <ActionPerson className="col-xs-12 col-sm-9" id={'jobLink'} src={'jobs'} onChangeForParent={this.handleJobChange} debug={true}/> */}
                                <button onClick={this.handleNewJob} className="button-content-wrap success">
                                    <i className="fas fa-plus"></i><p>New Job, Document</p>
                                </button>
                                {this.state.documentForm ?
                                <div className="row">
                                    <div className="section-title">
                                        <p>Add to existing document</p>
                                    </div>
                                    <ActionPerson
                                        minQueryLength={0}
                                        endpoint={'documents/?search='}
                                        propName={"document"}
                                        className="col-xs-12"
                                        id={'document'}
                                        keyPositions={{'idRef':0, 'url  ': 1}}
                                        data={this.state.documentSuggestData}
                                        onFetchForParent={this.fetchSuggestions}
                                        onSelectedForParent={this.handleSelected}
                                        onChangeForParent={this.handleChange}
                                        debug={false} /> 
                                </div>
                                :
                                <button onClick={() => (this.setState({ documentForm: !this.state.documentForm, addToJobForm: false, showPeopleSelection: true, job: Object.assign({}, this.state.job, { job_id: undefined }) }))} className="button-content-wrap success"><i className="fas fa-file-alt" />Add to existing document</button>

                                }        
                                {this.state.addToJobForm ?
                                <div className="row">

                                    <div className="section-title">
                                        <p>>Add actions to a new document on an existing job</p>
                                    </div>
                                    <ActionPerson
                                        minQueryLength={0}
                                        endpoint={'jobs/?search='}
                                        propName={"job"}
                                        className="col-xs-12"
                                        id={'job_id'}
                                        keyPositions={{ 'idRef': 0, 'url  ': 1 }}
                                        data={this.state.jobSuggestData}
                                        onFetchForParent={this.fetchSuggestions}
                                        onSelectedForParent={this.handleSelected}
                                        onChangeForParent={this.handleChange}
                                        debug={false} />

                                    <div className="section-title col-xs-12">
                                        <p>Status</p>
                                    </div>
                                    <div className="type col-xs-12 col-sm-6 row">
                                        <p className="col-xs-3">This is a</p>
                                        <ActionPerson className="col-xs" minQueryLength={0} endpoint={'status-type/?name__icontains='} id={'statusType'} propName={"statusType"} onFetchForParent={this.fetchSuggestions} data={this.state.statusTypeSuggestData} onSelectedForParent={this.handleSelected} onChangeForParent={this.handleChange} debug={false} />
                                    </div>
                                    <div className="section-title col-xs-12">
                                        <p>Amend Purchase Order Number</p>
                                    </div>
                                    <div className="type col-xs-12 col-sm-6 row">
                                        <input className="col-xs" onChange={(e) => this.handleChange('orderNumber', e.target.value)} placeholder="P150411" />
                                    </div>

                                    
                                    <textarea className="col-xs" onChange={(e) => this.handleChange('notes', e.target.value)} placeholder="Prompt payment would be appreciated">
                                    </textarea>

                                </div>
                                :
                                <button onClick={() => (this.setState({ addToJobForm: !this.state.addToJobForm, documentForm: false, showPeopleSelection: true, job: Object.assign({}, this.state.job, { document: undefined }) }))} className="button-content-wrap success"><i className="fas fa-briefcase"/>Add to new document to existing job</button>
                                }
                                {this.state.showPeopleSelection &&
                                
                                <div className="type col-xs-12">
                                    <div className="section-title col-xs-12">
                                        <p>People</p>
                                    </div>
                                    <div className="col-xs-12 row">
                                        {this.state.refTypeLoaded && this.state.people.map((el, i) => {
                                            return (<DropdownWithContext id={i} items={this.generatePeopleTypes()}
                                                customStyles={{
                                                    container: 'col-xs-6 col-sm-3',
                                                    wrapper: '',
                                                    select: '',
                                                    opton: ''
                                                }}
                                                onSelect={this.onPeopleTypeChange}
                                                key={el.username}>
                                                <div className="info">
                                                    <div className="title">{el.name}</div>
                                                    <div className="subtitle">{el.organisation.name}</div>
                                                </div>
                                            </DropdownWithContext>)
                                        })}
                                    </div>
                                </div>
                                }


                        </div>
                    </React.Fragment>
                }

                {this.state.newJobForm ? this.newJob() : null}
            </div>
        )
    }

    generatePeopleTypes() {
        let people = []
        for (let i = 0; i < this.state.refTypeSuggestData.length; i++) {
            let peep_type = {}

            for (let l = 0; l < this.state.refTypeSuggestData[i].data.length; l++) {

                switch (this.state.refTypeSuggestData[i].data[l][0]) {
                    case 'id': peep_type["value"] = this.state.refTypeSuggestData[i].data[l][1]; break;
                    case 'name': peep_type["label"] = this.state.refTypeSuggestData[i].data[l][1];

                    //TODO: Add default;
                    // case 'name': peep_type["label"] =  <div><i className="fas fa-user"/>{this.state.refTypeSuggestData[i].data[l][1]}</div>; break; 
                }
            }
            people.push(peep_type);
        }
        console.log(people);
        return people;
    }
    onPeopleTypeChange(i, val) {
        let peeps = this.state.people
        peeps[i][['type']] = val;
        this.setState({ people: peeps })
        this.onPeopleChange(this.state.people)

    }
    calcPeople() {
        let acts = this.props.items;
        let peeps = []
        for (let i = 0; i < acts.length; i++) {
            for (let j = 0; j < acts[i].people.length; j++) {
                let exists = false;
                for (let k = 0; k < peeps.length; k++) {
                    if (isEqual(peeps[k], acts[i].people[j])) {
                        exists = true;
                    }
                    // if(exists){
                    //     continue
                    // }
                }
                if (exists === false) {
                    peeps.push(acts[i].people[j])
                }
            }
        }
        return peeps;
    }


    constructFormJSON(){
        let d = {}
        d['items'] = this.props.items;
        d['job'] = this.state.job
        d['people'] = this.state.people;
        d['notes'] = this.state.notes;
        d['order_number'] = this.state.orderNumber;
        console.log(d);
        return d;
    }
    handleSubmit(event){
        let data = this.exportFormJSON()
        let _this = this;
        if(this.state.jobLinkForm){
            this.props.onRemove("job", data.job.name, ['selected'], [true]);
            this.props.onRemove();
            let url = 'jobs/';
            if(this.state.job.document){
                url = 'actions/add_job/'
            }
            if(this.state.job.job_id){
                url = 'documents/' 
            }
            //TODO: SEND;
            console.log(this.constructFormJSON());
            event.preventDefault();
            this.props.src.rest.post(url, this.constructFormJSON(), {
                'method': 'post', })
                .then(function (response) {
                    let data = response.data;
                    console.log(data);
                    _this.setState({jobLinkForm:false});

                })
                .catch(function (error) {})
                .then(function () {
                    // always executed
                    _this.props.onSubmit && _this.props.onSubmit();
                });

        }if(this.state.newJobForm){
            //
        }else{
            this.setState({jobLinkForm:true});
            
        }
        console.log(data);
    }

    addActions(){
        let buttons = [ this.removeButtonUI(),this.continueButtonUI()]
        if(this.state.jobLinkForm){
            buttons.splice(1, 0, this.backButtonUI());
            buttons[-1] = (this.completeButtonUI());
        }

        return(
            buttons
        )
    }
    handleBack(){
        this.setState({jobLinkForm:false,hideJobBox:false,newJobForm:false});
    }
    removeButtonUI(){
        return(<button onClick={this.handleRemove} className="button-content-wrap light">
            <i className="fas fa-eraser"></i><p>Clear</p> 
        </button>)   
    }
    continueButtonUI(){
        return(<button onClick={this.handleSubmit} className="button-content-wrap success">
            <i className="fas fa-chevron-right"></i><p>Continue</p> 
        </button>)   
    }
    completeButtonUI(){
        return(<button onClick={this.handleSubmit} className="button-content-wrap success">
            <i className="fas fa-check-circle"></i><p>Save</p> 
        </button>)   
    }
    backButtonUI(){
        return(<button onClick={this.handleBack} className="button-content-wrap light ">
            <i className="fas fa-chevron-left"></i><p>Back</p> 
        </button>)   
    }
    onDateChange(day){
        let prevJob = this.state.job;
        prevJob[ ['date']] = day;
        this.setState({job:prevJob})
    }
    onInvoiceAddrChange(locations){
        let prevJob = this.state.job;
        prevJob[ ['invoice_address']] = locations;
        this.setState({job:prevJob})
    }
    onJobAddrChange(locations) {
        let prevJob = this.state.job;
        prevJob[ ['job_address']] = locations;
        this.setState({
            job: prevJob
        })
    }
    // onJobChange(job){
    //     // this.setState({})
    // }
    onOrgChange(vals){
        console.log(vals);
        let prevJob = this.state.job;
        prevJob[['organisation']] = vals.organisation;
        prevJob[['invoice_address']] = vals.invoice_address;
        this.setState({
            job: prevJob
        })
    }
    onPeopleChange(vals){
        let prevJob = this.state.job
        prevJob[ ['people']] = vals;
        this.setState({
            job: prevJob
        })
    }

    onJobChange(i,val){
        let prevJob = this.state.job
        prevJob[ [i] ] = val;
        this.setState({job:prevJob})
    }
    handleSelected(s, state_val) {
        if(s.hasOwnProperty('suggestion')){
            s = s.suggestion.id
        }

        let prevJob = this.state.job
        prevJob[state_val] = s
        this.setState({
            job: prevJob
        })
    }
    // this.props.onOrgChange({
            //     org: s.suggestion.data[0][1],
            //     invoice_address: locations
            // });

    render(){
        return(
            <div className={"stuck-bottom actionSelection "+(this.state.jobLinkForm ? 'height-100' : null)}>
                <div className="elements row">
                    {this.props.items.map((el, i) => (
                        <div key={el.idRef} className="element">
                            <div className="wrap">
                                <button className="button-remove pip" onClick={() => this.handleRemoveSingle(i)}><i className="fas fa-times"></i></button>
                                <span>{el.idRef}: </span> {el.location.line1}</div>
                        </div>
                    ))}

                </div>
                {this.state.jobLinkForm ? this.jobLink() : null}
                <div className="for-save col-xs-12">
                    <div className="total-price">
                        £{ this.totalPrice().toFixed(2)}
                        {this.addActions()}
                    </div>
                </div>        
            </div>);         
    }
}
export default ActionSelection;

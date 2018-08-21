import React, { Component } from 'react';
import { ActionPerson } from './ActionPerson';
import { JobForm } from './JobForm';

export class ActionSelection extends Component{

    constructor(props) {
        super(props);
        this.totalPrice = this.totalPrice.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleJobChange = this.handleJobChange.bind(this);
        this.exportFormJSON = this.exportFormJSON.bind(this);
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
        this.state ={jobLinkForm:false, job: {}}
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
handleChange={this.onJobChange} isMobile={this.props.isMobile} selectedActions={this.props.items}/>);

    }
    jobLink(){
        return(
            <div className="col-xs-12">
                {this.state.hideJobBox ? 
                null:
                    <React.Fragment>
                        <div className="job-ref">
                            <div className="section-title">
                            <p>Add to Job</p>
                            </div>
                            <div className="row">
                                        <ActionPerson className="col-xs-12 col-sm-9" id={'jobLink'} src={'jobs'} onChangeForParent={this.handleJobChange} debug={true}/>
                                        <div className="col-xs-12 new-job-button">
                                        <p className="or">or</p>
                                        <button onClick={this.handleNewJob} className="button-content-wrap success">
                                            <i className="fas fa-plus"></i><p>New</p> 
                                        </button>
                                        </div>
                            </div>
                        </div>
                    </React.Fragment>
                }

                {this.state.newJobForm ? this.newJob() : null}
            </div>
        )
    }
    exportFormJSON(){
        let d = {}
        d['items'] = this.props.items;
        d['job'] = this.state.job
        return d;
    }
    handleSubmit(){
        
        let data = this.exportFormJSON()
        if(this.state.jobLinkForm){
            this.props.onRemove("job", data.job.name, ['selected'], [true]);
            this.props.onRemove();

            //TODO: SEND;
            this.setState({jobLinkForm:false});
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
    onOrgChange(vals){
        let prevJob = this.state.job;
        prevJob[['organisation']] = vals.org;
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
            // this.props.onOrgChange({
            //     org: s.suggestion.data[0][1],
            //     invoice_address: locations
            // });

    render(){
        return(
            <div className={"stuck-bottom actionSelection "+(this.state.jobLinkForm ? 'height-100' : null)}>
                <div className="elements row">
                    {this.props.items.map((el, i) => (
                        <div className="element">
                        {/* <button className="button-remove pip" onClick={() => this.handleRemoveSingle(i)}><i className="fas fa-times"></i></button> */}
                            <div className="wrap"><span>{el.id}: </span> {el.location.line1}</div>
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
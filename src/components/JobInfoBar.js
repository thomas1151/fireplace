import React, { Component } from 'react';
import { ActionPerson } from './ActionPerson';
import { JobForm } from './JobForm';
import { Redirect, Link } from 'react-router-dom';

export class JobInfoBar extends Component{

    constructor(props) {
        super(props);
        this.handleDownload = this.handleDownload.bind(this);
        this.state ={ }
    }
  
    addActions(){
        let buttons = [ this.downloadButtonUI(),this.editButtonUI()]
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
    handleDownload(){
        this.props.onJobDownload();
    }
    downloadButtonUI(){
        return(
                <Link to={this.props.viewURL}>
                    <button onClick={this.handleDownload} className="button-content-wrap success">
                        <i className="fas fa-eye"></i><p>View</p> 
                    </button>
                </Link>

        )   
    }
    editButtonUI(){
        return(<button onClick={this.handleSubmit} className="button-content-wrap light">
            <i className="fas fa-pencil-alt"></i><p>Edit</p> 
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
    render(){
        return(
            <div className="job-info-bar">
                <div className="for-save col-xs-12">
                    <div className="total-price">

                        {this.addActions()}
                    </div>
                </div>        
            </div>);         


    }
}
export default JobInfoBar;
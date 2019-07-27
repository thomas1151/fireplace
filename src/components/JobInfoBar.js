import React, { Component } from 'react';
import { ActionPerson } from './ActionPerson';
import { JobForm } from './JobForm';
import { Redirect, Link } from 'react-router-dom';

export class JobInfoBar extends Component{

    constructor(props) {
        super(props);
        this.handleDownload = this.handleDownload.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.state ={ }
    }
  
    addActions(){
        let buttons = [ this.backButtonUI(), this.downloadButtonUI(),this.editButtonUI(), this.printButtonUI(), this.deleteButtonUI()]
        if(this.state.jobLinkForm){
            buttons.splice(1, 0, this.backButtonUI());
            buttons[-1] = (this.completeButtonUI());
        }

        return(
            buttons
        )
    }
    handleDelete(e){
        if(this.props.item){
            console.log(this.props.item.url);
            if(this.props.src){
                console.log("Deleting")
                this.props.src.rest.delete(this.props.item.url);
            }else{
                console.log("No src given :(");
            }
        }else{
            console.log("No item! :O");
        }
        console.log(e);

    }
    handleBack(){
        this.props.history.goBack();
    }
    handleDownload(){
        this.props.onJobDownload();
    }
    downloadButtonUI(){
        return(
                <Link to={this.props.viewURL} onClick={this.handleDownload} className="button-content-wrap success ">
                        <i className="fas fa-eye"></i><p>View</p> 
                </Link>

        )   
    }

    printButtonUI() {
        return (
            
                <button onClick={window.print} className="button-content-wrap light ">
                    <i className="fas fa-print"></i><p>Print</p>
                </button>

        )
    }

    editButtonUI(){
        return(<button onClick={this.handleSubmit} className="button-content-wrap light ">
            <i className="fas fa-pencil-alt"></i><p>Edit</p> 
        </button>)   
    }
    completeButtonUI(){
        return(<button onClick={this.handleSubmit} className="button-content-wrap success ">
            <i className="fas fa-check-circle"></i><p>Save</p> 
        </button>)   
    }
    backButtonUI(){
        return(<button onClick={this.handleBack} className="button-content-wrap light  ">
            <i className="fas fa-chevron-left"></i><p>Back</p> 
        </button>)   
    }
    deleteButtonUI() {
        return (<button onClick={ (e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(e) }} className="button-content-wrap light dangerous  ">
            <i className="fas fa-times"></i><p>Delete</p>
        </button>)
    }
    render(){
        return(
            <div className="job-info-bar noPrint">
                <div className="for-save  col-xs-12">
                    <div className="row">

                        {this.addActions().map( el => (
                            <div className="button-outer-wrap col-xs-4 col-md-3 col-lg-2">
                                {el}    
                            </div>
                        ))}
                    </div>
                </div>        
            </div>);         


    }
}
export default JobInfoBar;

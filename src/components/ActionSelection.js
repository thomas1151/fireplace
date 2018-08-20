import React, { Component } from 'react';
import { ActionPerson } from './ActionPerson';

export class ActionSelection extends Component{

    constructor(props) {
        super(props);
        this.totalPrice = this.totalPrice.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleJobChange = this.handleJobChange.bind(this);
        this.exportFormJSON = this.exportFormJSON.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.state ={jobLinkForm:false}
    }
    totalPrice(){
        if(this.props.items.length > 0){
            return(this.props.items.map(item => item.price*item.quantity).reduce((prev, next) => prev + next));
        }else{
            return(0)
        }

    }
    handleRemove(el){
        console.log(el);
        this.props.onRemove();
    }
    handleRemoveSingle(i){
        this.props.onSingleRemove(i);
    }
    handleJobChange(i,value){
        this.setState({job:value})
    }
    jobLink(){
        return(
            <div className="col-xs-12">
                <div className="job-ref">
                    <div className="section-title">
                    <p>Add to Job</p>
                    </div>
                    <ActionPerson className="col-xs-12" id={'jobLink'} src={'jobs'} onChangeForParent={this.handleJobChange} debug={true}/>
                </div>
            </div>
        )
    }
    exportFormJSON(){
        let d = {}
        d['items'] = this.props.items;
        d['job'] = {}
        d['job']['name'] = this.state.job;
        return d;
    }
    handleSubmit(){
        
        if(this.state.jobLinkForm){
            let data = this.exportFormJSON()
            console.log(data);
            this.props.onRemove("job", data.job, ['selected'], [true]);
            this.props.onRemove();
            this.setState({jobLinkForm:false});
        }else{
            this.setState({jobLinkForm:true})
        }
    }
    render(){
        return(

            <div className={"stuck-bottom actionSelection "+(this.state.jobLinkForm ? 'height-70' : null)}>
                <div className="elements row">
                    {this.props.items.map((el, i) => (
                        <div className="element col-xs-6 col-sm-3">
                            <div className="wrap">{el.id}: {el.location.line1}<button className="button-remove pip" onClick={() => this.handleRemoveSingle(i)}><i className="fas fa-times"></i></button></div>
                        </div>
                    ))}

                </div>
                {this.state.jobLinkForm ? this.jobLink() : null}
                <div className="for-save col-xs-12">
                    <div className="total-price">
                        £{ this.totalPrice().toFixed(2)}
                    </div>
                    <button onClick={this.handleRemove} className="button-content-wrap light">
                        <i className="fas fa-eraser"></i><p>Clear</p> 
                    </button>   
                    <button onClick={this.handleSubmit} className="button-content-wrap success">
                        <i className="fas fa-plus"></i><p>Add</p> 
                    </button>   
                </div>        
            </div>);         


    }
}
export default ActionSelection;
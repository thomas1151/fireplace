
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';


export class FeedElement extends Component{
    constructor(props) {
        super(props);
        this.handleButton = this.handleButton.bind(this);
    }
    state ={
        redirect: false
    }
    // handleAddButton(d){
    //     this.setState({selected:true});
    //     this.props.onAdd(this.props.data);
    //     console.log("Clicked")
    //     // this.removeButton();
    // }
    // handleRemoveButton(d){
    //     this.props.onRemove([this.props.data]);
    //     this.setState({selected:false});
    // }
    handleButton(type){
        switch(type){
            case 'more': console.log("more"); break;
            case 'add' : this.props.onAdd(this.props.ikey); break;
            case 'edit': console.log("edit"); break;
            case 'remove': this.props.onRemove(this.props.ikey); break;
        }
    }


    addButton(){
        return(
            <button className="col-xs-4 action" onClick={() =>this.handleButton('add')}>
                <i className="fas fa-plus"></i>
                <p>Select</p>
            </button>
            
        )
    }

    removeButton(){
        return(<button className="col-xs-4 action" onClick={() =>this.handleButton('remove')}>
            <i className="fas fa-times"></i>
            <p>Remove</p>
        </button>)   
    }

    editButton(){
        return(
            <button className="col-xs-4 action" onClick={() =>this.handleButton('edit')}>
                        <i className="fas fa-edit"></i>
                        <p>Edit</p>
                    </button>
        )

    }

    moreButton(){

        
        if(this.props.onMoreUrl){
            return(
                <Link to={this.props.onMoreUrl} className="col-xs-4 action">
                    <button onClick={() =>this.handleButton('more')}>
                        <i className="fas fa-angle-down"></i>
                        <p>More</p>
                    </button> 
                </Link>
            )
        }else{
            return(
                <button className="col-xs-4 action" onClick={() =>this.handleButton('more')}>
                    <i className="fas fa-angle-down"></i>
                    <p>More</p>
                </button> 
            )
        }
    }

    addActions(){
        let buttons = [ this.addButton(),this.moreButton(),this.editButton()]
        if(this.props.data.selected){
            buttons[0] = this.removeButton();
        }
        if(this.props.data.document){
            buttons.shift();
        }
        return(
            buttons
        )
    }

    render(){
            const d = this.props.data;
             // let inputProps = {...this.props.inputProps};
            return(<div className={"feed-element "+(d.selected ? 'selected' : '')+(d.documents ? ' withJob' : '')}>
                    <div className="row">
                        {
                            this.state.redirect ? <Redirect to={this.props.onMoreUrl} /> : null
                        }
                        <div className="col-xs-12 content">
                            <div className="row title-row">
                                    <div className="col-xs">
                                        <div className="title">{this.props.title}</div>
                                        <div className="subtitle">{this.props.subtitle}</div>
                                    </div>
                                <div className="col-xs-3">
                                    <div className="id-badge">{this.props.badge}</div>
                                    <div className="price">{this.props.usefulData}</div>
                                </div>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 section body">
                            <div className="description"
                            // dangerouslySetInnerHTML={{__html:this.props.description}}
                            >
                            {this.props.children}
                            </div>
                            <div className="footer">
                            </div>
                        </div>
                        {/* <div className="col-xs-12 col-sm-6 price-section section">
                            <div className="middle-xs">
                                <div className="price">
                                {d.price * d.quantity}
                                </div>
                                <div className="price-breakdown">
                                        <div className="price-for-one">
                                            {d.price}
                                        </div>
                                        *
                                        <div className="quantity">
                                            {d.quantity}
                                        </div>
                                </div>
                            </div>
                        </div> */}

                        {this.props.people &&
                        <div className="col-xs-12 section people row">
                            <i className="fa fa-user-circle"></i>
                            {this.props.people.map( (p,i) => {
                                var complexPerson = Object.keys(p).length <= 2;

                                return(<a 
                                key={complexPerson ? p.person.id : p.id}
                                href={"/people/"+(!complexPerson ? p.username: p.person.username)}
                                className="person">
                                    {this.props.displayPeopleAs.map( (i)=> {
                                        return (complexPerson ? (p.person[i]) + " " : (p[i]) + " ")
                                    })}
                                </a>)
                            })}
                        </div>
                        }
                        {d.documents ? 
                        <div className="col-xs-12 section people row">
                            <i className="fas fa-info-circle"></i><div className="person">Part of Document(s): 
                            {d.documents.map( (doc) => (
                            <div className="">
                                <Link key={doc.idRef} to={"/documents/"+doc.idRef}> {doc.idRef}</Link>
                                { ", "}
                            </div>
                            ))}
                            </div>
     
                        </div>
                        :
                        null
                        }
                        <div className="col-xs-12 row actions">
                                {this.addActions()}

                        </div>
                            
                    </div>
                </div>)
    }
}
export default FeedElement;
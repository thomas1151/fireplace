
import React, { Component } from 'react';

export class FeedElement extends Component{
    constructor(props) {
            super(props);
            this.state ={
            }
            this.handleButton = this.handleButton.bind(this);
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
            case 'add' : this.props.onAdd(this.props.ikey); break;
            case 'more': console.log("more"); break;
            case 'edit': console.log("edit"); break;
            case 'remove': this.props.onRemove(this.props.ikey); break;
        }
    }

    addButton(){
        return(
            <button className="col-xs-4 action" onClick={() =>this.handleButton('add')}>
                <i className="fas fa-plus"></i>
                <p>Add</p>
            </button>
            
        )
    }

    removeButton(){
        return(<button className="col-xs-4 action" onClick={() =>this.handleButton('remove')}>
            <i className="fas fa-times"></i>
            <p>Remove</p>
        </button>)   
    }

    moreButton(){
        return(
            <button className="col-xs-4 action" onClick={() =>this.handleButton('more')}>
                <i className="fas fa-angle-down"></i>
                <p>More</p>
            </button>
        )

    }

    editButton(){
        return(
            <button className="col-xs-4 action" onClick={() =>this.handleButton('edit')}>
                <i className="fas fa-edit"></i>
                <p>Edit</p>
            </button>
        )
    }

    addActions(){
        let buttons = [ this.addButton(),this.moreButton(),this.editButton()]
        if(this.props.data.selected){
            buttons[0] = this.removeButton();
        }
        if(this.props.data.job){
            buttons.shift();
        }
        return(
            buttons
        )
    }

    render(){
            const d = this.props.data;
            let dateStarted = new Date(d.dateStarted);
            let created = new Date(d.created); 
            // let inputProps = {...this.props.inputProps};
            return(<div className={"feed-element "+(d.selected ? 'selected' : '')+(d.job ? 'withJob' : '')}>
                    <div className="row">
                        <div className="col-xs-12 content">
                            <div className="row title-row">
                                    <div className="col-xs">
                                        <div className="title">{d.location.line1} on {dateStarted.toLocaleDateString()}</div>
                                        <div className="subtitle">{d.creator.name} on {created.toLocaleDateString()}</div>
                                    </div>
                                <div className="col-xs-3">
                                    <div className="id-badge">#{d.id}</div>
                                    <div className="price">£{d.price * d.quantity}.00</div>
                                </div>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 section body">
                            <div className="description">
                                {d.description}
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

                        <div className="col-xs-12 section people">
                            <i className="fa fa-user-circle"></i>
                            
                            {d.people.map( (p,i) => {
                                return(<div className="person">
                                    {p.name}
                                </div>)
                            })}
                        </div>
                        
                        {d.job ? 
                        <div className="col-xs-12 section people">
                            <i className="fas fa-info-circle"></i><div className="person">Part of job: {d.job.name}</div>
     
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
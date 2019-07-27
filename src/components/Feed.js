import React, { Component } from 'react';
import {FeedElement} from './FeedElement';
import { ActionSelection } from './ActionSelection';
import { Loading } from './Loading';
import ReactHtmlParser from 'react-html-parser';

export class Feed extends Component{
    constructor(props) {
            super(props);
            this.state ={
                items: [],
                selected: [],
                date: undefined,
                invoiceAddr: {},
                jobAddr: {},
                isLoaded: false,
            }

            this.handleNewProperty = this.handleNewProperty.bind(this);            
            this.handleRemoveProperty = this.handleRemoveProperty.bind(this);            
            this.handleChangeAllOfProperty = this.handleChangeAllOfProperty.bind(this);            
            this.handleProcessSelected = this.handleProcessSelected.bind(this);
            this.reloadItems = this.reloadItems.bind(this);

    }
    reloadItems(){
        if(this.props.onReloadItems){
            this.props.onReloadItems()
        }else{

            let self = this;
            self.props.src.rest.get(this.props.dataSrc)
                .then(function (response) {
                    let data = response.data.results;
                    // handle success
                    self.setState({
                        isLoaded: true,
                        items: (data).filter((a, b) => self.props.filterFeed ? self.props.filterFeed(a, b) : true).sort((a, b) => new Date(b.created) - new Date(a.created)),
                        response
                    });
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    self.setState({
                        isLoaded: false,
                        error
                    });
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }

    }
    componentDidMount() {
        this.reloadItems();
    }
    getSelected(){
        if(this.props.items){
            let a = this.props.items.filter(function(val,idx){
                return val.selected
            })
            return a;
        }
        if(this.state.items){
            let a = this.state.items.filter(function (val, idx) {
                return val.selected
            })
            return a;        
        }
    }
    handleNewProperty(index,property="selected",value=true){
        if (this.props.onNewProperty){
            this.props.onNewProperty(index, property, value);
        }else{
            this.setState(prevState => { // prevState?
                prevState.items[index][property] = value
                return (prevState);
            });
        }
    }
    handleRemoveProperty(index,property="selected"){
        if (this.props.onRemoveProperty){
            this.props.onRemoveProperty(index, property);
        }else{
            this.setState(prevState => { // prevState?
                prevState.items[index]['selected'] = false
                return(prevState);
            });
        }
    }
    handleChangeAllOfProperty(property="selected",value=false,prereqs=[],prereqVals=[]){
        if(this.props.onChangeAllOfProperty){
            this.props.onChangeAllOfProperty(property, value, prereqs, prereqVals);
        }else{
            this.setState(prevState => { // prevState?
                prevState.items.forEach((element, index) => {
                    let t = prereqs.length === 0;
                    prereqs.some( (prereq,j) =>{
                        if(element[prereq] === prereqVals[j]){
                            t = true;
                        }
                    })
                    if(t){
                        element[property] = value;
                    }
        
                });
                return (prevState);
            });
        }
    }
    handleProcessSelected(){
        this.getSelected();
    }
    render(){
            // let inputProps = {...this.props.inputProps};
            let selected = this.getSelected();
            if(this.state.isLoaded || (this.props.items)){
            return(<div className={"action-feed "+(selected.length >0 ? 'menu-padding' : null)}>
                    {console.log(this.state.items)}
                    {
                        (this.state.items.length > 0 || (this.props.items && this.props.items.length) > 0) ? 
                            (this.props.items ? this.props.items : this.state.items).map( (f,i) =>{
                            let dateStarted = new Date(f.startDate);
                            let created = new Date(f.created);
                            return(<FeedElement 
                                        data={f} 
                                        badge={f.idRef} 
                                        usefulData={"£"+(f.price * f.quantity).toFixed(2)} 
                                        ikey={i} 
                                        title={ (f.location && f.location.line1)+" on "+dateStarted.toLocaleDateString()} 
                                        subtitle={ (f.creator && f.creator.name)+" on "+created.toLocaleDateString()} 
                                        key={i} 
                                        onRemove={this.handleRemoveProperty} 
                                        onAdd={this.handleNewProperty}
                                        people={f.people}
                                        displayPeopleAs={['name']}
                                        onMoreUrl={"/actions/" + f.idRef}

                                        >{ReactHtmlParser(f.work)}</FeedElement>)
                            }) 
                            :
                            <p>No unselected items.</p>
                    
                    }
                    {
                        selected.length > 0 ? 
                        <ActionSelection src={this.props.src} config={this.props.config} isMobile={this.props.isMobile} onAdd={this.handleNewProperty} onSingleRemove={this.handleRemoveProperty} onRemove={this.handleChangeAllOfProperty} items={selected}/>
                        :
                        null
                    }
                </div>)
            }else{
                return( <Loading/> );
            }
    }
}
export default Feed;
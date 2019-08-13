import React, { Component } from 'react';
import {FeedElement} from './FeedElement';
import { ActionSelection } from './ActionSelection';
import { Loading } from './Loading';
const ReactMarkdown = require('react-markdown');

export class Feed extends Component{

    handleScroll = (e) => {
        // let scrollPos = (e.target.scrollHeight - e.target.scrollTop);
        // let clientHeight = parseInt(e.target.clientHeight + 1 * (e.target.clientHeight));
        // //;
        var scrollPercentage = 100 * e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight);
        const bottom = scrollPercentage < 80 && scrollPercentage > 75
        console.log(scrollPercentage);
        if (bottom) {
            console.log("Bottom!");
            if (!this.props.fetchingMore && !this.state.fetchingMore) {
                if (this.props.fetchMore) {
                    this.props.fetchMore();

                } else {
                    console.log("No props fetcHmore");

                    if (this.fetchMore) {
                        console.log("Let's fetch more");
                        this.fetchMore();
                    }
                }
                // this.setState({restFetchLoading:true})
            }

        }
    }



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
            this.handleScroll = this.handleScroll.bind(this);


    }

    fetchMore() {
        console.log("Fetching! HERE!");
        this.setState({ fetchingMore: true })
        let _this = this;
        if (this.state.next != null) {
            _this.props.src.rest.get(this.state.next, { baseUrl: '' })
                .then(function (response) {
                    _this.setState({ next: response.data.next, fetchingMore: false, items: _this.state.items.concat(response.data.results) })
                }).catch(function (error) {
                    // handle error
                    _this.setState({
                        fetchingMore: false,
                        error
                    });
                    console.log(error);
                })
        } else {
            this.setState({ fetchingMore: false })
        }
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
                        items: (data).filter((a, b) => self.props.filterFeed ? self.props.filterFeed(a, b) : true).sort((a, b) => (a.created ? (new Date(b.created) - new Date(a.created)) : 0)),
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
            if(!this.state.error){
                if (this.state.isLoaded || (this.props.items)) {
                    return (<div className={"action-feed " + (selected.length > 0 ? 'menu-padding' : null)} onScroll={this.handleScroll} >
                        {console.log(this.state.items)}
                        {
                            (this.state.items.length > 0 || (this.props.items && this.props.items.length) > 0) ?
                                (this.props.items ? this.props.items : this.state.items).map((f, i) => {
                                    let dateStarted = new Date(f.startDate);
                                    let created = new Date(f.created);
                                    return (<FeedElement
                                        data={f}
                                        badge={f.idRef}
                                        usefulData={"£" + (f.price * f.quantity).toFixed(2)}
                                        ikey={i}
                                        title={(f.location && f.location.line1) + " on " + dateStarted.toLocaleDateString()}
                                        subtitle={(f.creator && f.creator.name) + " on " + created.toLocaleDateString()}
                                        key={i}
                                        onRemove={this.handleRemoveProperty}
                                        onAdd={this.handleNewProperty}
                                        people={f.people}
                                        displayPeopleAs={['name']}
                                        onMoreUrl={"/actions/" + f.idRef}

                                    ><ReactMarkdown source={f.work} escapeHtml={false} /></FeedElement>)
                                })
                                
                                :
                                <p>No unselected items.</p>
                                
                            }
                            {(this.state.fetchingMore || this.props.fetchingMore) && <Loading />}
                        
                        {
                            selected.length > 0 ?
                                <ActionSelection src={this.props.src} config={this.props.config} isMobile={this.props.isMobile} onAdd={this.handleNewProperty} onSingleRemove={this.handleRemoveProperty} onRemove={this.handleChangeAllOfProperty} items={selected} />
                                :
                                null
                        }

                    </div>)
                } else {
                    return (<Loading />);
                }
            }else{
                return( 
                    <p>
                        {this.state.error.stack}    
                    </p>
                )
            }
            
    }
}
export default Feed;
import React, { Component } from 'react';
import { Feed } from '../../components/Feed';
import { ActionBox } from '../../components/ActionBox'; 
import {
    Switch,
    Route
} from 'react-router-dom';
import SingleAction from './Single';

export class ActionIndex extends Component {

    handleScroll = (e) => {
        // let scrollPos = (e.target.scrollHeight - e.target.scrollTop);
        // let clientHeight = parseInt(e.target.clientHeight + 1 * (e.target.clientHeight));
        // //;
        var scrollPercentage = 100 * e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight);
        const bottom = scrollPercentage < 80 && scrollPercentage > 75
        console.log(scrollPercentage);
        if (bottom) {
            console.log("Bottom!");
            if (!this.props.fetchingMore) {
                if(this.props.fetchMore){
                    this.props.fetchMore();

                }else{
                    if(this.state.fetchMore){
                        this.state.fetchMore();
                    }
                }
                // this.setState({restFetchLoading:true})
            }

        }
    }

    constructor(props) {
        super(props);
        this.state ={

        }
        this.getItemByProp = this.getItemByProp.bind(this);
        this.onReloadItems = this.onReloadItems.bind(this);
        this.fetchMore = this.fetchMore.bind(this);
        this.handleNewProperty = this.handleNewProperty.bind(this);
        this.handleRemoveProperty = this.handleRemoveProperty.bind(this);
        this.handleChangeAllOfProperty = this.handleChangeAllOfProperty.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    getItemByProp(prop, value) {
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i][prop] == value) {
                return this.state.items[i];
            }
        }
    }
    createPDF() {

    }
    onReloadItems(){
        let self = this;
        self.props.src.rest.get('actions/')
            .then(function (response) {
                let data = response.data.results;
                // handle success
                self.setState({
                    isLoaded: true,
                    items: (data).filter((a, b) => self.props.filterFeed ? self.props.filterFeed(a, b) : true).sort((a, b) => new Date(b.created) - new Date(a.created)),
                    next: response.data.next,
                    response,
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
    fetchMore() {
        if(!this.state.fetchingMore){
            console.log("Fetching from index!");
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

    }

    handleNewProperty(index, property = "selected", value = true) {

        this.setState(prevState => { // prevState?
            prevState.items[index][property] = value
            return (prevState);
        });
    }

    handleRemoveProperty(index, property = "selected") {
        this.setState(prevState => { // prevState?
            prevState.items[index]['selected'] = false
            return (prevState);
        });
    }

    handleChangeAllOfProperty(property = "selected", value = false, prereqs = [], prereqVals = []) {
        this.setState(prevState => { // prevState?
            prevState.items.forEach((element, index) => {
                let t = prereqs.length === 0;
                prereqs.some((prereq, j) => {
                    if (element[prereq] === prereqVals[j]) {
                        t = true;
                    }
                })
                if (t) {
                    element[property] = value;
                }

            });
            return (prevState);
        });
    }

    render() {
        let bg = this.props.backgroundColor;
        return (
            <Switch>
                <Route path="/actions/:id" render={routeProps => <SingleAction
                    {...routeProps} asPrint={false} createPDF={this.createPDF} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile} />} />

                <Route exact path="/actions" render={routeProps => 
                    <React.Fragment>
                        {this.props.children}
                        <ActionBox src={this.props.src} config={this.props.config} isMobile={this.props.isMobile} />
                        <Feed  onNewProperty={this.handleNewProperty} fetchMore={this.fetchMore} fetchingMore={this.state.fetchMore} onRemoveProperty={this.onRemoveProperty} onChangeAllOfProperty={this.handleChangeAllOfProperty} onReloadItems={this.onReloadItems} items={this.state.items} src={this.props.src} dataSrc={'actions/'} config={this.props.config} isMobile={this.props.isMobile} />
                    </React.Fragment>
                }/>

            </Switch>       
           
        )
    }
}
export default ActionIndex;
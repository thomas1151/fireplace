import React, { Component } from 'react';
import { Feed } from '../../components/Feed';
import { ActionBox } from '../../components/ActionBox'; 
import {
    Link,
    Switch,
    Route
} from 'react-router-dom';
import SingleAction from './Single';

export class ActionIndex extends Component {
    constructor(props) {
        super(props);
        this.state ={

        }
        this.getItemByProp = this.getItemByProp.bind(this);
        this.onReloadItems = this.onReloadItems.bind(this);
        this.fetchMore = this.fetchMore.bind(this);
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
    fetchMore() {
        console.log("Fetching!");
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
                        <Feed onReloadItems={this.onReloadItems} items={this.state.items} src={this.props.src} dataSrc={'actions/'} config={this.props.config} isMobile={this.props.isMobile} />
                    </React.Fragment>
                }/>

            </Switch>       
           
        )
    }
}
export default ActionIndex;
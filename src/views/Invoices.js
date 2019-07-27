import React, { Component } from 'react';
import { InvoiceInbox } from './InvoiceInbox';
import { Loading } from '../components/Loading';
import  titleGenerator from "../logic/titleGenerator";
import {
    Route,
    Switch,
    Link
} from 'react-router-dom';
import documentLinks from '../logic/documentLinks';
import SingleJob from './jobs/Single';

export class Invoices extends Component{



    constructor(props) {
            super(props);
            this.state ={
                settings:[
                    {
                        name: "Jobs",
                        url: '/jobs'
                    },
                    {
                        name: "Outstanding",
                        url: 'outstanding'
                    },
                    {
                        name: "Stats",
                        url: 'stats'
                    },
                    {
                        name: "Export",
                        url: 'export'
                    }
                ],
                items: [],
                isLoaded: false,
            }
            this.getItemByProp = this.getItemByProp.bind(this);
            this.fetchMore = this.fetchMore.bind(this);
    }
    componentDidMount() {

        let self = this;
        self.props.src.rest.get('jobs/?page=1&limit=20')
            .then(function (response) {
                let data = response.data.results;
                let next = response.data.next;
                // handle success
                self.setState({
                    isLoaded: true,
                    items: data,
                    next: next,
                    fetchingMore: false
                    // response
                });
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                self.setState({
                    isLoaded: true,
                    error
                });
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }
    getItemByProp(prop, value) {
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i][prop] === value) {
                return this.state.items[i];
            }
        }
    }
    createPDF(){
        
    }

    fetchMore(){
        console.log("Fetching!");
        this.setState({fetchingMore:true})
        let _this = this;
        if(this.state.next != null){
            _this.props.src.rest.get(this.state.next, {baseUrl: ''})
                .then(function(response){
                    _this.setState({next: response.data.next, fetchingMore:false,items: _this.state.items.concat(response.data.results)})
                }).catch(function (error) {
                    // handle error
                    _this.setState({
                        fetchingMore: false,
                        error
                    });
                    console.log(error);
                })
        }else{
            this.setState({fetchingMore:false})
        }
    }
    render(){
        titleGenerator("Jobs", this.props.config)

        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
        if(this.state.isLoaded){
        return(
            <React.Fragment>
            <div className="page-settings col-xs-12">
                <ul>
                    {this.state.settings.map((el) =>
                        <li key={el.name}><Link to={el.url} className={el.url === this.props.history.location.pathname && 'current'}>{el.name}</Link></li>
                    )}
                </ul>
            </div>
            {documentLinks(this.props.src.domain, this.props.config['profile-details'].name)}

            <Switch>
                {this.props.isMobile ?

                    <React.Fragment>
                        <Route path="/jobs/:id/" render={routeProps => <SingleJob
                            {...routeProps} asPrint={false} createPDF={this.createPDF} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile} />} />
                    
                        <Route exact path="/jobs" render={routeProps =>
                            <InvoiceInbox fetchingMore={this.state.fetchingMore} fetchMore={this.fetchMore} {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile} />
                        }/>

                    </React.Fragment>


                    :
                    <React.Fragment>
                        <Route path="/jobs/:id/view" render={routeProps => <SingleJob
                            {...routeProps} asPrint={false} createPDF={this.createPDF} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile} />} />


                        <Route exact path="/jobs/:id" render={routeProps =>
                            <InvoiceInbox fetchingMore={this.state.fetchingMore} fetchMore={this.fetchMore} {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>

                                <div className="invoice-inspection col-xs-8">
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css" />
                                    <SingleJob
                                            key={routeProps.match.params.id} {...routeProps} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} createPDF={this.createPDF} isMobile={this.isMobile} />
                                </div>
                            </InvoiceInbox>
                        } />

                        <Route exact path="/jobs" render={routeProps =>
                            <InvoiceInbox fetchingMore={this.state.fetchingMore} fetchMore={this.fetchMore} {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>

                                <div className="invoice-inspection col-xs-8">
                                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css" />
                                    <Route exact path="/jobs/:id" render={routeProps => <SingleJob
                                        {...routeProps} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} createPDF={this.createPDF} isMobile={this.isMobile} />} />
                                </div>
                            </InvoiceInbox>
                        } />
                    </React.Fragment>

}
            </Switch>

            </React.Fragment>
            )
        }else{
            return <Loading />;
        }
    }
}
export default Invoices;
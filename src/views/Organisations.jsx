import React, { Component } from 'react';
import { OrganisationInbox } from './OrganisationInbox';
import { Loading } from '../components/Loading';
import titleGenerator from "../logic/titleGenerator";
import {
    Route,
    Switch
} from 'react-router-dom';
import SingleOrganisation from './organisations/Single.jsx';
import documentLinks from '../logic/documentLinks';
import NewOrganisation from './organisations/New';
import {
    Link,
} from 'react-router-dom';
export class Organisations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: [
                {
                    name: "Organisations",
                    url: '/organisations'
                },
                {
                    name: "People",
                    url: '/people'
                },
                {
                    name: "New Person",
                    url: '/people/new'
                },
                {
                    name: "New Organisation",
                    url: '/organisations/new'
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
                },

            ],
            items: [],
            isLoaded: false,
        }
        this.getItemByProp = this.getItemByProp.bind(this);
    }
    componentDidMount() {
        let self = this;
        self.props.src.rest.get('organisations/')
            .then(function (response) {
                let data = response.data.results;
                // handle success
                self.setState({
                    isLoaded: true,
                    items: data,
                    response
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
        console.log(prop);
        console.log(value);
        for (let i = 0; i < this.state.items.length; i++) {
            console.log(this.state.items[i]);
            if (this.state.items[i][prop] === value) {
                return this.state.items[i];
            }
        }
    }
    createPDF() {

    }
    render() {
        titleGenerator("Organisations", this.props.config)

        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
        if (this.state.isLoaded) {
            return (
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
                        <Route path="/organisations/new/" render={routeProps => <NewOrganisation
                            {...routeProps} asPrint={false} dependent={true} createPDF={this.createPDF} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile} />} />

                        {this.props.isMobile ?

                            <React.Fragment>
                                <Route path="/organisations/:id/" render={routeProps => <SingleOrganisation
                                    {...routeProps} asPrint={true} dependent={true} createPDF={this.createPDF} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile} />} />

                                <Route exact path="/organisations" render={routeProps =>
                                    <OrganisationInbox settings={this.state.settings} {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile} />
                                } />

                            </React.Fragment>


                            :
                            <React.Fragment>
                                <Route path="/organisations/:id/view" render={routeProps =>
                                    <React.Fragment>
                                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css" />
                                        <SingleOrganisation
                                            {...routeProps} asPrint={true} createPDF={this.createPDF} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile} />
                                    </React.Fragment>
                                } />

                                <Route exact path="/organisations/:id" render={routeProps =>
                                    <OrganisationInbox settings={this.state.settings} {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>

                                        <div className="invoice-inspection col-xs-8">
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css" />
                                            <Route exact path="/organisations/:id" render={routeProps => <SingleOrganisation
                                                key={routeProps.match.params.id} {...routeProps} src={this.props.src} config={this.props.config} dependent={true} data={this.state.items} getItemByProp={this.getItemByProp} createPDF={this.createPDF} isMobile={this.isMobile} />} />
                                        </div>
                                    </OrganisationInbox>
                                } />

                                <Route exact path="/organisations" render={routeProps =>
                                    <OrganisationInbox settings={this.state.settings} {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>

                                        <div className="invoice-inspection col-xs-8">
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css" />
                                            <Route exact path="/organisations/:id" render={routeProps => <SingleOrganisation
                                                dependent={true} {...routeProps} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} createPDF={this.createPDF} isMobile={this.isMobile} />} />
                                        </div>
                                    </OrganisationInbox>
                                } />

                            </React.Fragment>

                        }
                    </Switch>

                </React.Fragment >

            )

        } else {
            return <Loading />;
        }
    }
}
export default Organisations;
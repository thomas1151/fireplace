import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import {SearchBar} from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { FeedElement } from '../components/FeedElement';
import { ActionSelection } from '../components/ActionSelection';
import { InvoiceInbox } from './InvoiceInbox';
import { ViewJob } from '../components/ViewJob';
import { Redirect } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Loading } from '../components/Loading';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import axios from "axios";

const feed = [{
        "idRef": "REW190918",
        "organisation": "Thomas Barratt Design and Development",
        "type": "invoice",
        "date": "Sun Dec 17 1995 03:24:00 GMT",
        "notes": "20% Discount if you can dance the dance in my office",

        "invoice_addr": {
            "line1": "43 Crookes Rd",
            "line2": "Sheffield",
            "line3": "",
            "line4": "",
            "postcode": "S10 5BA"
        },
        "job_addr": {
            "line1": "Various",
            "line2": "",
            "line3": "",
            "line4": "",
            "postcode": ""
        },
        "price": 3000.00,
        "creator": {
            "id": "1",
            "name": "Thomas Barratt"
        },
        "created": "Sun Dec 17 2018 03:24:00 GMT",
        "people": [{
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
                "type": "Provider"

            },
            {
                "id": "2",
                "name": "Donald Trump",
                "organisation": "Trump Hotels",
                "type": "NS",

            },
            {
                "id": "3",
                "name": "James Reynolds",
                "organisation": "Savilles",
                 "type": "Client",

            }
        ],
        "actions": [{
            "id": "A251295",
            "description": "Making thirsty pretzels",
            "dateStarted": "Sun Dec 25 1995 03:24:00 GMT",
            "location": {
                "line1": "Gill's",
                "line2": "Sheffield",
                "line3": "",
                "line4": "",
                "postcode": "A14 5BC"
            },
            "quantity": "5",
            "price": "100.00",
            "creator": {
                "id": "1",
                "name": "Jerry Seinfeld"
            },
            "created": "Sun Dec 17 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Jerry Seinfeld"
                },
                {
                    "id": "2",
                    "name": "Cosmo Kramer"
                },
            ],
            "job": {
                "id": 1,
                "name": "SEI180818",
            }

        }, {
            "id": "A150508",
            "description": "Continued work on Fireplace",
            "dateStarted": "Sun May 15 2008 03:24:00 GMT",
            "location": {
                "line1": "6 South View",
                "line2": "Kirk Merrington",
                "line2": "Spennymoor",
                "line3": "",
                "line4": "",
                "postcode": "DL167JB"
            },
            "quantity": "4",
            "price": "100",
            "creator": {
                "id": "1",
                "name": "Thomas Barratt"
            },
            "created": "Sun Aug 18 2018 03:24:00 GMT",
            "people": [{
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
                "type": "Provider"
            }, ],

        }, {
            "id": "A200818",
            "description": "Aloe Vera Management Systems",
            "dateStarted": "Mon Aug 20 2018 03:24:00 GMT",
            "location": {
                "line1": "547D Crookesmoor Road",
                "line2": "Sheffield",
                "line3": "",
                "line4": "",
                "postcode": "S10 1BJ"
            },
            "quantity": "2",
            "price": "75.00",
            "creator": {
                "id": "1",
                "name": "Thomas Barratt"
            },
            "created": "Sun Dec 17 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Thomas Barratt",
                    "organisation": "Thomas Barratt Design & Development",
                    "type": "provider",

                },
                {
                    "id": "5",
                    "name": "Jane Hayman",
                    "type": "plient",

                },
            ],

        }]

    },

    {
        "idRef": "REW250918",
        "organisation": "Thomas Barratt Design and Development",
        "type": "invoice",
        "date": "Sun Dec 17 1995 03:24:00 GMT",
        "invoice_addr": {
            "line1": "43 Crookes Rd",
            "line2": "Sheffield",
            "line3": "",
            "line4": "",
            "postcode": "S10 5BA"
        },
        "job_addr": {
            "line1": "Various",
            "line2": "",
            "line3": "",
            "line4": "",
            "postcode": ""
        },
        "price": 275.00,
        "creator": {
            "id": "1",
            "name": "Thomas Barratt"
        },
        "created": "Sun Dec 17 2018 03:24:00 GMT",
        "people": [{
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
                "type": "provider"
            },
            {
                "id": "2",
                "name": "Donald Trump",
                "organisation": "Trump Hotels",
                "type": "NS",
            },
            {
                "id": "6",
                "name": "James T. Kirk",
                "organisation": "Savilles",
                "type": "client",
            }
        ],
        "notes": "As agreed, prompt payment would be appreciated.",
        "actions": [{
            "id": "A251295",
            "description": "Making thirsty pretzels",
            "dateStarted": "Fri Aug 24 2018 03:24:00 GMT",
            "location": {
                "line1": "Gill's",
                "line2": "Sheffield",
                "line3": "",
                "line4": "",
                "postcode": "A14 5BC"
            },
            "quantity": "5",
            "price": "100.00",
            "creator": {
                "id": "1",
                "name": "Jerry Seinfeld"
            },
            "created": "Thu Aug 23 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Jerry Seinfeld"
                },
                {
                    "id": "2",
                    "name": "Cosmo Kramer"
                },
            ],
            "job": {
                "id": 1,
                "name": "SEI180818",
            }

        }, {
            "id": "A150508",
            "description": "Continued work on Fireplace",
            "dateStarted": "Sun May 15 2008 03:24:00 GMT",
            "location": {
                "line1": "6 South View",
                "line2": "Kirk Merrington",
                "line2": "Spennymoor",
                "line3": "",
                "line4": "",
                "postcode": "DL167JB"
            },
            "quantity": "4",
            "price": "100",
            "creator": {
                "id": "1",
                "name": "Thomas Barratt"
            },
            "created": "Sun Aug 18 2018 03:24:00 GMT",
            "people": [{
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
            }, ],

        }, {
            "id": "A200818",
            "description": "Aloe Vera Management Systems",
            "dateStarted": "Mon Aug 20 2018 03:24:00 GMT",
            "location": {
                "line1": "547D Crookesmoor Road",
                "line2": "Sheffield",
                "line3": "",
                "line4": "",
                "postcode": "S10 1BJ"
            },
            "quantity": "2",
            "price": "75.00",
            "creator": {
                "id": "1",
                "name": "Thomas Barratt"
            },
            "created": "Sun Dec 17 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Thomas Barratt",
                    "organisation": "Thomas Barratt Design & Development",
                },
                {
                    "id": "5",
                    "name": "Jane Hayman"
                },
            ],

        }]

    },
    {
        "idRef": "REW280818",
        "organisation": "Thomas Barratt Design and Development",
        "type": "invoice",
        "date": "Sun Dec 17 1995 03:24:00 GMT",
        "invoice_addr": {
            "line1": "43 Crookes Rd",
            "line2": "Sheffield",
            "line3": "",
            "line4": "",
            "postcode": "S10 5BA"
        },
        "job_addr": {
            "line1": "Various",
            "line2": "",
            "line3": "",
            "line4": "",
            "postcode": ""
        },
        "price": 575.00,
        "vat": 0.20,
        "creator": {
            "id": "1",
            "name": "Thomas Barratt"
        },
        "created": "Sun Dec 17 2018 03:24:00 GMT",
        "people": [{
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
                "type": "provider",
            },
            {
                "id": "2",
                "name": "Donald Trump",
                "organisation": "Trump Hotels",
                "type": "provider",
            },
            {
                "id": "3",
                "name": "James Reynolds",
                "organisation": "Savilles",
                "type":"client",
            }
        ],
        "actions": [{
            "id": "A251295",
            "description": "Making thirsty pretzels",
            "dateStarted": "Sun Dec 25 1995 03:24:00 GMT",
            "location": {
                "line1": "Gill's",
                "line2": "Sheffield",
                "line3": "",
                "line4": "",
                "postcode": "A14 5BC"
            },
            "quantity": "5",
            "price": "100.00",
            "creator": {
                "id": "1",
                "name": "Jerry Seinfeld"
            },
            "created": "Sun Dec 17 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Jerry Seinfeld"
                },
                {
                    "id": "2",
                    "name": "Cosmo Kramer"
                },
            ],
            "job": {
                "id": 1,
                "name": "SEI180818",
            }

        }, {
            "id": "A150508",
            "description": "Continued work on Fireplace 2.0",
            "dateStarted": "Sun May 15 2008 03:24:00 GMT",
            "location": {
                "line1": "6 South View",
                "line2": "Kirk Merrington",
                "line2": "Spennymoor",
                "line3": "",
                "line4": "",
                "postcode": "DL167JB"
            },
            "quantity": "4",
            "price": "400",
            "creator": {
                "id": "1",
                "name": "Thomas Barratt"
            },
            "created": "Sun Aug 18 2018 03:24:00 GMT",
            "people": [{
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
            }, ],

        }, {
            "id": "A200818",
            "description": "Something Completely Different",
            "dateStarted": "Mon Aug 20 2018 03:24:00 GMT",
            "location": {
                "line1": "547D Crookesmoor Road",
                "line2": "Sheffield",
                "line3": "",
                "line4": "",
                "postcode": "S10 1BJ"
            },
            "quantity": "2",
            "price": "75.00",
            "creator": {
                "id": "1",
                "name": "Thomas Barratt"
            },
            "created": "Sun Dec 17 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Thomas Barratt",
                    "organisation": "Thomas Barratt Design & Development",
                },
                {
                    "id": "5",
                    "name": "Jane Hayman"
                },
            ],

        }]

    },

    {
        "idRef": "REW250918",
        "organisation": "Thomas Barratt Design and Development",
        "type": "invoice",
        "date": "Sun Dec 17 1995 03:24:00 GMT",
        "invoice_addr": {
            "line1": "43 Crookes Rd",
            "line2": "Sheffield",
            "line3": "",
            "line4": "",
            "postcode": "S10 5BA"
        },
        "job_addr": {
            "line1": "Various",
            "line2": "",
            "line3": "",
            "line4": "",
            "postcode": ""
        },
        "price": 275.00,
        "creator": {
            "id": "1",
            "name": "Thomas Barratt"
        },
        "created": "Sun Dec 17 2018 03:24:00 GMT",
        "people": [{
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
            },
            {
                "id": "2",
                "name": "Donald Trump",
                "organisation": "Trump Hotels",
            },
            {
                "id": "6",
                "name": "James T. Kirk",
                "organisation": "Savilles",
            }
        ],
        "actions": [{
            "id": "A251295",
            "description": "Making thirsty pretzels",
            "dateStarted": "Sun Dec 25 1995 03:24:00 GMT",
            "location": {
                "line1": "Gill's",
                "line2": "Sheffield",
                "line3": "",
                "line4": "",
                "postcode": "A14 5BC"
            },
            "quantity": "5",
            "price": "100.00",
            "creator": {
                "id": "1",
                "name": "Jerry Seinfeld"
            },
            "created": "Sun Dec 17 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Jerry Seinfeld"
                },
                {
                    "id": "2",
                    "name": "Cosmo Kramer"
                },
            ],
            "job": {
                "id": 1,
                "name": "SEI180818",
            }

        }, {
            "id": "A155508",
            "description": "Continued work on Fireplace",
            "dateStarted": "Sun May 15 2008 03:24:00 GMT",
            "location": {
                "line1": "6 South View",
                "line2": "Kirk Merrington",
                "line2": "Spennymoor",
                "line3": "",
                "line4": "",
                "postcode": "DL167JB"
            },
            "quantity": "4",
            "price": "100",
            "creator": {
                "id": "1",
                "name": "Thomas Barratt"
            },
            "created": "Sun Aug 18 2018 03:24:00 GMT",
            "people": [{
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
            }, ],

        }, {
            "id": "A2100818",
            "description": "Aloe Vera Management Systems",
            "dateStarted": "Mon Aug 20 2018 03:24:00 GMT",
            "location": {
                "line1": "547D Crookesmoor Road",
                "line2": "Sheffield",
                "line3": "",
                "line4": "",
                "postcode": "S10 1BJ"
            },
            "quantity": "2",
            "price": "75.00",
            "creator": {
                "id": "1",
                "name": "Thomas Barratt"
            },
            "created": "Sun Dec 17 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Thomas Barratt",
                    "organisation": "Thomas Barratt Design & Development",
                },
                {
                    "id": "5",
                    "name": "Jane Hayman"
                },
            ],

        }]

    },
    {
        "idRef": "1SAW100918",
        "organisation": "Thomas Barratt Design and Development",
        "type": "invoice",
        "date": "Mon Sep 10 2018 11:20:00 GMT",
        "notes": "Any additional notes regarding work or payment here.",
        "invoice_addr": {
            "line1": "Sample Street",
            "line2": "Sheffield",
            "line3": "",
            "line4": "",
            "postcode": "S1A MPL"
        },
        "job_addr": {
            "line1": "http://thomasbarratt.co.uk",
            "line2": "",
            "line3": "",
            "line4": "",
            "postcode": ""
        },
        "price": 200,
        "creator": {
            "id": "1",
            "name": "Thomas Barratt"
        },
        "created": "Mon Sep 10 2018 11:20:00 GMT",
        "people": [
            {
                "id": "1",
                "name": "Thomas Barratt",
                "organisation": "Thomas Barratt Design & Development",
                "type": "provider"
            },
            {
                "id": "2",
                "name": "Donald Trump",
                "organisation": "Trump Hotels",
                "type": "NS"
            },
            {
                "id": "50",
                "name": "Sample Client",
                "organisation": "Sampletons",
                "type": "client"
            }
        ],
        "actions": [
            {
                "id": "A251295",
                "description": "Order form rewrite as requested.",
                "dateStarted": "Mon Sep 10 2018 10:24:00 GMT",
                "location": {
                    "line1": "Sample",
                    "line2": "Sheffield",
                    "line3": "",
                    "line4": "",
                    "postcode": "S1A MPL"
                },
                "quantity": "5",
                "price": "20",
                "creator": {
                    "id": "1",
                    "name": "Thomas Barratt"
                },
                "created": "Sun Dec 17 2018 03:24:00 GMT",
                "people": [
                    {
                        "id": "1",
                        "name": "Thomas Barratt"
                    },
                    {
                        "\n": "",
                        "name": "Cosmo Kramer"
                    }
                ],
                "job": {
                    "id": 1,
                    "name": "1SAW100918"
                }
            }
        ]
    }
]

export class Invoices extends Component{
    constructor(props) {
            super(props);
            this.state ={
                settings:[
                    {
                        name: "Home",
                        url: '/'
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
                items: feed,
                isLoaded: false,
            }
            this.getItemByProp = this.getItemByProp.bind(this);
    }
    componentDidMount() {
        let self = this;
        axios.get(this.props.src.url + 'jobs/')
            .then(function (response) {
                let data = response.data;
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
        for (let i = 0; i < this.state.items.length; i++) {
            if (this.state.items[i][prop] == value) {
                return this.state.items[i];
            }
        }
    }
    createPDF(){
        
    }
    render(){
        let bg =this.props.backgroundColor;
        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
        if(this.state.isLoaded){
        return(
            <React.Fragment>
            { this.props.isMobile ?  <ShortcutsBar isMobile={this.props.isMobile}/>:null}

            {this.props.isMobile ?
                <Route exact path="/invoices/:id" render={routeProps => <ViewJob 
                                                            {...routeProps} createPDF={this.createPDF} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile}/>} />
                : null
            }
            {this.props.isMobile &&
            <Route exact path="/invoices" render={routeProps => 
            <InvoiceInbox {...routeProps} getItemByProp={this.getItemByProp} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>
            </InvoiceInbox>
            }/>
            }

            <Route path="/invoices/:id/view" render={routeProps => <ViewJob 
                                                            {...routeProps} asPrint={true} createPDF={this.createPDF} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile}/>} />
                
            {!this.props.isMobile &&
            <Route exact path="/invoices/:id" render={routeProps => 
            <InvoiceInbox {...routeProps} getItemByProp={this.getItemByProp} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>

                    <div className="invoice-inspection col-xs-8">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css"/>
                        <Route exact path="/invoices/:id" render={routeProps => <ViewJob 
                                                            {...routeProps} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} createPDF={this.createPDF} isMobile={this.isMobile}/>} />
                    </div>
            </InvoiceInbox>
            }/>
            }
            {!this.props.isMobile &&
            <Route exact path="/invoices" render={routeProps => 
            <InvoiceInbox {...routeProps} getItemByProp={this.getItemByProp} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>

                    <div className="invoice-inspection col-xs-8">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css"/>
                        <Route exact path="/invoices/:id" render={routeProps => <ViewJob 
                                                            {...routeProps} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} createPDF={this.createPDF} isMobile={this.isMobile}/>} />
                    </div>
            </InvoiceInbox>
            }/>


            }
            </React.Fragment>
            )
        }else{
            return <Loading />;
        }
    }
}
export default Invoices;
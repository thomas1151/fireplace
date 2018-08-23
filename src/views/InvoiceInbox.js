import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import {SearchBar} from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { FeedElement } from '../components/FeedElement';
import { ActionSelection } from '../components/ActionSelection';
import { ViewJob } from '../components/ViewJob';
import { Redirect } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
const feed = [{
        "id": "REW190918",
        "organisation": "Thomas Barratt Design and Development",
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
                "id": "3",
                "name": "James Reynolds",
                "organisation": "Savilles",
            }
        ],
        "items": [{"id": "A251295",
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
        "id": "REW250918",
        "organisation": "Thomas Barratt Design and Development",
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
        "items": [{
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
    "id": "REW190918",
    "organisation": "Thomas Barratt Design and Development",
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
            "id": "3",
            "name": "James Reynolds",
            "organisation": "Savilles",
        }
    ],
    "items": [{
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
    "id": "REW250918",
    "organisation": "Thomas Barratt Design and Development",
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
    "items": [{
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
]


export class InvoiceInbox extends Component{
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
                items: feed
            }
    }
    render(){
        let bg =this.props.backgroundColor;
        const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
        
        return(
            <main className="col-xs row app-format">
                <div className="page-settings col-xs-12">
                    <ul>
                        <li><a className="current">Invoices</a></li>
                        {this.state.settings.map((el,i)=>
                            <li><a href={el.url}>{el.name}</a></li>
                        )}
                    </ul>
                </div>
                
                <div className="app-wrapper row">
                    <div className="invoice-feed action-feed col-xs">
                        {this.state.items.map( (f,i) =>{
                            let date = new Date(f.date).toLocaleDateString();
                            let created = new Date(f.created).toLocaleDateString();
                            return(<FeedElement 
                                        usefulData={"£"+f.price.toFixed(2)} 
                                        subtitle={f.creator.name+" on "+created} 
                                        title={f.id} 
                                        ikey={i} 
                                        data={f} 
                                        key={i} 
                                        onRemove={this.handleRemoveProperty} 
                                        onAdd={this.handleNewProperty}
                                        onMoreUrl={"/invoices/"+f.id}
                                    />)

                        }) }

                    </div>
                {!this.props.isMobile ? 
                        
                    <div className="invoice-inspection col-xs-8">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css"/>
                        <Route path="/invoices/:id"  render={routeProps => <ViewJob 
                                                            {...routeProps} header={jobHeader}isMobile={this.props.isMobile}/>} />
                    </div>
                    :
                    null}
                </div>
            {/* <Route path='/' render={routeProps => <ActionBox isMobile={this.props.isMobile}/>} />
            <Feed isMobile={this.props.isMobile}/> */}
            </main>
        )
    }
}
export default InvoiceInbox;
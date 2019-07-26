// import React, { Component } from 'react';
// import { SearchBar } from '../components/SearchBar.js';
// import { Feed } from '../components/Feed';
// import { ActionBox } from '../components/ActionBox';
// import { ShortcutsBar } from '../components/ShortcutsBar';
// import { FeedElement } from '../components/FeedElement';
// import { ActionSelection } from '../components/ActionSelection';
// import { InvoiceInbox } from './InvoiceInbox';
// import { SingleDocument } from '../views/documents/Single';
// import { Redirect } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import { Loading } from '../components/Loading';
// import titleGenerator from "../logic/titleGenerator";
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Switch
// } from 'react-router-dom';
// import axios from "axios";


// export class Invoices extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             settings: [
//                 {
//                     name: "Home",
//                     url: '/'
//                 },
//                 {
//                     name: "Outstanding",
//                     url: 'outstanding'
//                 },
//                 {
//                     name: "Stats",
//                     url: 'stats'
//                 },
//                 {
//                     name: "Export",
//                     url: 'export'
//                 }
//             ],
//             items: [],
//             isLoaded: false,
//         }
//         this.getItemByProp = this.getItemByProp.bind(this);
//     }

//     getItemByProp(prop, value) {
//         for (let i = 0; i < this.state.items.length; i++) {
//             if (this.state.items[i][prop] == value) {
//                 return this.state.items[i];
//             }
//         }
//     }
//     createPDF() {

//     }
//     render() {
//         titleGenerator(this.props.sectionTitle, this.props.config)

//         let bg = this.props.backgroundColor;
//         // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={{"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
//         if (this.state.isLoaded) {
//             return (
//                 <React.Fragment>

//                     <Switch>
//                         {this.props.isMobile ?

//                             <React.Fragment>
//                                 <Route path={"/"+this.props.sectionUrl+"/:id/"} render={routeProps => <ViewJob
//                                     {...routeProps} asPrint={true} createPDF={this.createPDF} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile} />} />

//                                 <Route exact path={"/"+this.props.sectionUrl+"/"} render={routeProps =>
//                                     <InvoiceInbox {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile} />
//                                 } />

//                             </React.Fragment>


//                             :
//                             <React.Fragment>
//                                 <Route path={"/"+this.props.sectionUrl+"/:id/view"} render={routeProps => <ViewJob
//                                     {...routeProps} asPrint={true} createPDF={this.createPDF} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} isMobile={this.props.isMobile} />} />


//                                 <Route exact path={"/"+this.props.sectionUrl+"/:id"} render={routeProps =>
//                                     <InvoiceInbox {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>

//                                         <div className="invoice-inspection col-xs-8/">
//                                             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css" />
//                                             <ViewJob
//                                                 {...routeProps} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} createPDF={this.createPDF} isMobile={this.isMobile} />
//                                         </div>
//                                     </InvoiceInbox>
//                                 } />

//                                 <Route exact path={"/"+this.props.sectionUrl+"/"} render={routeProps =>
//                                     <InvoiceInbox {...routeProps} getItemByProp={this.getItemByProp} src={this.props.src} config={this.props.config} items={this.state.items} isMobile={this.props.isMobile}>

//                                         <div className="invoice-inspection col-xs-8">
//                                             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css" />
//                                             <Route exact path={"/"+this.props.sectionUrl+"/:id"} render={routeProps => <ViewJob
//                                                 {...routeProps} src={this.props.src} config={this.props.config} data={this.state.items} getItemByProp={this.getItemByProp} createPDF={this.createPDF} isMobile={this.isMobile} />} />
//                                         </div>
//                                     </InvoiceInbox>
//                                 } />
//                             </React.Fragment>

//                         }
//                     </Switch>

//                 </React.Fragment>
//             )
//         } else {
//             return <Loading />;
//         }
//     }
// }
// export default Invoices;
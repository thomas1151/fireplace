import React, { Component } from 'react';
import { State, Route } from 'react-router';
import moment from 'moment';
import { JobInfoBar } from '../../components/JobInfoBar';
import documentLinks from '../../logic/documentLinks';
import titleGenerator from '../../logic/titleGenerator.js';
import Loading from '../../components/Loading.js';

import {
    Link,
} from 'react-router-dom';
import NotFound from '../../components/NotFound';
const ReactMarkdown = require('react-markdown');

const toSentenceCase = (el) => {
    return el.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) {
        return key.toUpperCase()
    })

}

export class SingleJob extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentDidMount() {
        this.setState({ time: new Date().toLocaleString() })
        let d = this.props.items && this.props.getItemByProp('idRef', this.props.match.params.id);
        let _this = this;

        if (d) {
            this.setState({
                d: d
            })
            titleGenerator(d.idRef, this.props.config);
        } else {
            _this.props.src.rest.get('jobs/?idRef=' + this.props.match.params.id)
                .then(function (response) {
                    d = response.data.results;
                    console.log(d);
                    if (d.length == 1) {
                        _this.setState({ d: d[0] })
                    } else {
                        _this.setState({ notFound: true })

                    }
                }).catch(function (error) {
                    console.log(error)
                    let e = {};
                    if (error.status == 404) {
                        e['notFound'] = true;
                    }
                    _this.setState({ ...error, ...e });
                })
        }


        // let d = this.props.getItemByProp('idRef', this.props.match.params.id)
        // this.setState({
        //     d: d
        // })
        // titleGenerator(d.idRef, this.props.config);
    }
    render() {
        // let d = this.props.getItemByProp('idRef', this.props.match.params.id)
        // titleGenerator(d.idRef, this.props.config);
        {
            !this.props.dependent &&
                documentLinks(this.props.src.domain, this.props.config['profile-details'].name)
        } 
        if (!this.state.notFound) {
            if (this.state.d) {
                let d = this.state.d;
                console.log(d);
                let dateToday = new Date();
                let total = 0;
                d.latestDocument && d.latestDocument.actions.sort(function (a, b) { return Date.parse(a.startDate) - Date.parse(b.startDate) });


                return (
                    <React.Fragment>
                        {!this.props.asPrint && <JobInfoBar match={this.props.match} item={d} src={this.props.src} history={this.props.history} onJobDownload={this.props.createPDF} viewURL={this.props.location.pathname + '/view'} />}
                        <div className="document noa4 toPrint fireplaceDoc" style={{ "fontFamily": this.props.config['application-font']['family'] }}>

                            <div className="header">
                                <div class="header-content-wrapper">
                                    <div className="logo-wrapper">
                                        <img src={this.props.src.domain + "config/" + this.props.config.organisation.logo} />
                                    </div>
                                    <div className="address-wrapper">
                                        <h2>{this.props.config.organisation.name}</h2>
                                        <div className="details">
                                            <div className="left-details row">
                                                <div className="job-detail job-date col-xs-6"><div className="job-label">Date</div><h3>{new Date(d.date).toLocaleDateString()}</h3></div>
                                                <div className="job-detail job-type col-xs-6"><div className="job-label">Type</div>{d.latestDocument ? <h3>Latest: {d.latestDocument.status.name}</h3> : <h3>No status</h3>}</div>
                                                <div className="job-detail job-amount col-xs-6"><div className="job-label">Amount</div><h3>£{d.totalPrice ? d.totalPrice.toFixed(2) : (0).toFixed(2)}</h3></div>
                                                <div className="job-detail job-id col-xs-6"><div className="job-label">Type</div><h3>#{d.idRef}</h3></div>
                                                {d.order_number.length > 1 &&
                                                    <React.Fragment>
                                                        <div className="job-detail job-blank col-xs-6"></div>
                                                        <div className="job-detail job-order_number col-xs-6"><div className="job-label">Order No:</div><h3>#{d.order_number}</h3></div>
                                                    </React.Fragment>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="job-details-wrap row">
                                <div className="col-xs-6 row">
                                    <div className="addresses col-xs-12 row">
                                        <div className="invoice-address job-address-section  col-xs-12">
                                            <div className="job-section-title">
                                                Job Properties
                                            </div>
                                            <div className="line">{d.noOfDocuments} document{d.noOfDocuments != 1 && 's'} belong{d.noOfDocuments == 1 && 's'} to this job.</div>
                                            <div className="line">Organisation: {d.organisation.name}</div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xs-6 row">
                                    <div className="addresses col-xs-12 row">
                                        <div className="job-address job-address-section  col-xs-12">
                                            <div className="job-section-title">
                                                Documents
                                            </div>
                                            {d.documents.map(d => <div className="line"><Link to={"/documents/" + d.idRef}>{d.idRef}</Link></div>)}
                                        </div>

                                    </div>
                                </div>                     
                                <div className="addresses col-xs-4 row">
                                    <div className="providers job-address-section  col-xs-12">
                                        <div className="job-section-title">
                                            Your Ref
                                        </div>
                                        {d.people.map((p, i) => {
                                            if (p.refType.id == 2) {
                                                return (
                                                    <React.Fragment>
                                                        <div><a href={"/people/" + p.person.username} className="line noPrint">{p.person.name}</a></div>
                                                        <div className="line printOnly">{p.person.name}</div>
                                                    </React.Fragment>
                                                )

                                            }
                                        })}
                                    </div>
                                    <div className="clients job-address-section col-xs-12">
                                        <div className="job-section-title">
                                            Our Ref
                                        </div>
                                        {d.people.map((p, i) => {
                                            if (p.refType.id == 1) {
                                                return (
                                                    <React.Fragment>
                                                        <div><a href={"/people/" + p.person.username} className="line noPrint">{p.person.name}</a></div>
                                                        <div className="line printOnly">{p.person.name}</div>
                                                    </React.Fragment>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>

                                <div className="col-xs row">
                                    <div className="addresses col-xs-12 row">
                                        <div className="invoice-address job-address-section  col-xs-6 col-sm-6">
                                            <div className="job-section-title">
                                                Invoice address
                                            </div>
                                            {Object.values(d.invoiceAddr).map((el, i) => {
                                                if (Object.keys(d.invoiceAddr)[i] != 'url' && Object.keys(d.invoiceAddr)[i] != 'id') {
                                                    return (<div className="line">{el}</div>)
                                                }
                                            })}
                                        </div>
                                        <div className="job-address job-address-section col-xs-6 col-sm-6">
                                            <div className="job-section-title">
                                                Job address
                                            </div>
                                            {Object.values(d.jobAddr).map((el, i) => {
                                                if (Object.keys(d.invoiceAddr)[i] != 'url' && Object.keys(d.invoiceAddr)[i] != 'id') {
                                                    return (<div className="line">{el}</div>)
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
                                {d.latestDocument && 
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>£</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {d.latestDocument.actions.map((el, i) => {
                                            let endDate = false
                                            let startDate = el.startDate ? new Date(el.startDate).toLocaleDateString() : '-';
                                            let date = startDate;
                                            // let endDate = null;
                                            console.log(el);
                                            if (el.dateEnded) {
                                                console.log(el.endDate);
                                                endDate = new Date(el.endDate).toLocaleDateString();
                                            }
                                            return (
                                                <tr>
                                                    <td>
                                                        {date}
                                                        {endDate ? '- ' + endDate : null}

                                                    </td>
                                                    <td>
                                                        <ReactMarkdown source={el.work} escapeHtml={false} />
                                                    </td>
                                                    <td className="right-align">
                                                        {parseFloat(el.price).toFixed(2)}
                                                    </td>
                                                    <td className="right-align">
                                                        {parseFloat(el.quantity).toFixed(2)}
                                                    </td>
                                                    <td className="right-align">
                                                        {(el.quantity * el.price).toFixed(2)}
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot className="job-table-footer-section">
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="right-align"><strong>{d.totalPrice.toFixed(2)}</strong></td>
                                        </tr>
                                        {d.vat ?
                                            <React.Fragment>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="right-align">VAT at</td>
                                                    <td className="right-align">{d.vat * 100}%</td>
                                                    <td className="right-align">{(d.vat * d.totalPrice).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="right-align">Total</td>
                                                    <td className="right-align"><strong>{((d.totalPrice * d.vat) + d.totalPrice).toFixed(2)}</strong></td>
                                                </tr>
                                            </React.Fragment>
                                            :
                                            null

                                        }
                                    </tfoot>
                                </table>
                                }
                                <div>
                                    <div className="notes col-xs">
                                        {d.latestDocument && d.latestDocument.notes && d.latestDocument.notes !== d.notes &&
                                            <React.Fragment>
                                                <h4>{d.latestDocument.idRef} Notes</h4>
                                                    <ReactMarkdown source={d.latestDocument.notes} escapeHtml={false} />
                                            </React.Fragment>
                                        }
                                        <h4>Job Notes</h4>
                                        <ReactMarkdown source={d.notes} escapeHtml={false} />
                                    </div>
                                </div>
                            </div>

                            <div className="footer">
                                <div className="footer-content-wrapper">
                                    <div className="footer-section-group">
                                        <div className="footer-section location left-align">
                                            {/* <h4 className="footerTitle">Address</h4> */}
                                            {Object.values(this.props.config.organisation.address).map((el, i) => el + (i < Object.keys(this.props.config.organisation.address).length - 1 ? ', ' : ''))}
                                        </div>
                                        <div className="times right-align">
                                            <div class="line">Modified: {new Date(Date.parse(d.date)).toLocaleString()}</div>
                                            <div class="line">Generated: {this.state.time}</div>
                                            <div class="line">Created: {new Date(Date.parse(d.date)).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="footer-section-group">
                                        <div className="footer-section finances left-align">
                                            <h4 className="footerTitle">Finances</h4>
                                            {Object.keys(this.props.config.organisation.financial).map((el) => <div className="location_line"><span className="footerLabel">{toSentenceCase(el)} </span>: {this.props.config.organisation.financial[el]} </div>)}
                                        </div>
                                        {Object.keys(this.props.config.organisation.online).length > 0 &&
                                            <div className="footer-section social-media right-align">
                                                <h4 className="footerTitle">Media</h4>
                                                {Object.keys(this.props.config.organisation.online).map((el) => <div className="social_line"><span className="footerLabel">{toSentenceCase(el.slice(0, 3))}</span>: {this.props.config.organisation.online[el]}</div>)}
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>


                        </div>
                    </React.Fragment>
                )
                // retun(template())
            } else {
                return (
                    <Loading />
                )
            }
        }else{
            return NotFound("Job "+this.props.match.params.id);
        }
        
    }
}
export default SingleJob;
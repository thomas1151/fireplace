import React, { Component } from 'react';

import axios from 'axios';
import { Loading } from '../../components/Loading';
import documentLinks from '../../logic/documentLinks';
import {
    Link,
} from 'react-router-dom';
import titleGenerator from '../../logic/titleGenerator';
import ReactHtmlParser from 'react-html-parser';
import { JobInfoBar } from '../../components/JobInfoBar';

const toSentenceCase = (el) => {
    return el.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) {
        return key.toUpperCase()
    })

}
export class SingleAction extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentDidMount() {
        let d = this.props.items && this.props.getItemByProp('id', this.props.match.params.id);
        let _this = this;

        if (d) {
            this.setState({
                d: d
            })
            titleGenerator(d.idRef, this.props.config);
        } else {
            _this.props.src.rest.get('actions/?idRef=' + this.props.match.params.id)
                .then(function (response) {
                    d = response.data.results;
                    if (d.length == 1) {
                        _this.setState({ d: d[0] })
                    } else {
                        _this.setState({ notFound: true })

                    }
                })
        }

        if (d) {
            // _this.props.src.rest.get('documents/?actions__contains=' + d.id)
            //     .then(function (response) {
            //         let data = response.data.results;
            //         // handle success
            //         _this.setState({
            //             jobsLoaded: true,
            //             jobs: data,
            //             response
            //         });
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         // handle error
            //         _this.setState({
            //             jobsLoaded: false,
            //             error
            //         });
            //         console.log(error);
            //     })
            //     .then(function () {
            //         // always executed
            //     });

        }


    }

    render() {
        if (!this.state.notFound) {
            if (this.state.d) {
                let d = this.state.d;
                document.title = d.name + " |  " + this.props.config.organisation.name;
                console.log(this.state.d);
                let dateToday = new Date();
                let total = 0;
                let dateStarted = new Date(d.startDate);
                let created = new Date(d.created);
                // let inputProps = {...this.props.inputProps};
                return (
                    <React.Fragment>
                        {!this.props.dependent &&
                            documentLinks(this.props.src.domain, this.props.config['profile-details'].name)
                        }
                        {!this.props.asPrint && <JobInfoBar history={this.props.history} onJobDownload={this.props.createPDF} viewURL={this.props.location.pathname + '/view'} />}

                        <div className="document fireplaceDoc toPrint" style={{ "fontFamily": this.props.config['application-font']['family'] }}>
                            <div className="header">
                                <div class="header-content-wrapper">
                                    <div className="address-wrapper">
                                        <h2>{(d.location && d.location.line1)+" on "+dateStarted.toLocaleDateString()}</h2>
                                        <div className="details">
                                            <div className="left-details row">
                                                <div className="job-detail job-date col-xs-6"><div className="job-label">Date</div><h3>{new Date(d.startDate).toLocaleDateString()}</h3></div>
                                                {/* <div className="job-detail job-type col-xs-6"><div className="job-label">Type</div>{d.latestDocument ? <h3>Latest: {d.latestDocument.status.name}</h3> : <h3>No status</h3>}</div> */}
                                                <div className="job-detail job-id col-xs-6"><div className="job-label">Type</div><h3>#{d.idRef}</h3></div>
                                                <div className="job-detail job-amount col-xs-6"><div className="job-label">Amount</div><h3>£{d.price ? (parseInt(d.quantity) * parseInt(d.price)).toFixed(2) : (0).toFixed(2)}</h3></div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="job-details-wrap row">
                                <div className="col-xs-12 row">
                                    {ReactHtmlParser(d.work)}
                                </div>
                                <div className="col-xs row">
                                    <div className="addresses col-xs-12 row">
                                        <div className="invoice-address job-address-section  col-xs-12">
                                            <div className="job-section-title">
                                                Jobs
                                            </div>

                                            {this.state.jobsLoaded ?
                                                (this.state.jobs.length > 0 ?
                                                    <div class="body">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>Date</th>
                                                                    <th>Latest Status</th>
                                                                    <th>£</th>
                                                                    <th>Paid</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.jobs.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map((j, i) => {
                                                                    // let endDate = false
                                                                    // let startDate = el.startDate ? new Date(el.startDate).toLocaleDateString() : '-';
                                                                    // let date = startDate;
                                                                    // if (el.dateEnded) {
                                                                    //     let endDate = new Date(el.dateStarted).toLocaleDateString();
                                                                    // }
                                                                    return (
                                                                        <tr key={j.idRef}>
                                                                            <td>
                                                                                <Link to={'/jobs/' + j.idRef + '/view'}>
                                                                                    {j.idRef}
                                                                                </Link>

                                                                            </td>
                                                                            <td className="right-align">
                                                                                {new Date(Date.parse(j.created ? j.created : j.date)).toLocaleDateString()}
                                                                            </td>
                                                                            <td>
                                                                                {j.latestDocument && (j.latestDocument.status.name)}
                                                                            </td>
                                                                            <td className="right-align">
                                                                                {j.latestDocument && "£" + (j.latestDocument.totalPrice.toFixed(2))}
                                                                            </td>
                                                                            <td className="right-align">
                                                                                {j.paid ? "Paid on " + new Date(Date(j.paid)).toLocaleDateString() : 'Not Paid'}
                                                                            </td>

                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    :
                                                    <p>There are no jobs to display.</p>
                                                )
                                                :
                                                <Loading />
                                            }
                                            {/* {Object.values(d.address).map((el, i) => {
                                                if (Object.keys(d.address)[i] != 'url' && Object.keys(d.address)[i] != 'id') {
                                                    return (<div className="line">{el}</div>)
                                                }
                                            })} */}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </React.Fragment>
                )
            } else {
                return (
                    <Loading />
                )
            }
        }
        else {
            return <h1>Not found :(</h1>
        }
    }
}
export default SingleAction;
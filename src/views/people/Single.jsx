import React, { Component } from 'react';

import { Loading } from '../../components/Loading';
import documentLinks from '../../logic/documentLinks';
import {
    Link,
} from 'react-router-dom';
import titleGenerator from '../../logic/titleGenerator';
import { JobInfoBar } from '../../components/JobInfoBar';
import NotFound from '../../components/NotFound';


export class SinglePerson extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentDidMount() {
        let d = this.props.getItemByProp('username', this.props.match.params.id);        
        let _this = this;

        if (d) {
            this.setState({
                d: d
            })
            titleGenerator(d.idRef, this.props.config);
        } else {
            _this.props.src.rest.get('users/?username=' + this.props.match.params.id)
                .then(function (response) {
                    d = response.data;
                    if (d.length === 1) {
                        _this.setState({ d: d[0] })
                    } else {
                        _this.setState({ notFound: true })

                    }
                })
        }

        if (d) {
            _this.props.src.rest.get('jobs/?people__username=' + d.username)
                .then(function (response) {
                    let data = response.data.results;
                    // handle success
                    _this.setState({
                        jobsLoaded: true,
                        jobs: data,
                        response
                    });
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    _this.setState({
                        jobsLoaded: false,
                        error
                    });
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });

        }


    }
    render() {
        if (!this.state.notFound) {
            if (this.state.d) {
                let d = this.state.d;
                document.title = d.name + " |  " + this.props.config.organisation.name;
                console.log(this.state.d);


                // let inputProps = {...this.props.inputProps};
                return (
                    <React.Fragment>
                        {!this.props.dependent &&
                            documentLinks(this.props.src.domain, this.props.config['profile-details'].name)
                        }
                        <JobInfoBar src={this.props.src} item={d} match={this.props.match} history={this.props.history} onJobDownload={this.props.createPDF} viewURL={this.props.location.pathname + '/view'} />

                        <div className="document fireplaceDoc toPrint" style={{ "fontFamily": this.props.config['application-font']['family'] }}>
                            <div className="header">
                                <div class="header-content-wrapper">
                                    <div className="address-wrapper">
                                        <div><h2>{d.name}</h2><span>({d.contactable ? 'Contactable' : 'Do not contact'}, {d.peristent ? 'Persistent' : 'Temporary'})</span></div>
                                        <h3>{d.position} at {d.organisation.name} ({d.id})</h3>
                                        <div className="details">
                                            <div className="left-details row">
                                                <div className="job-detail job-email col-xs-12 col-sm"><div className="job-label">Amount</div><h4>{ (d.email && d.email.length > 1) ? d.email : "No email supplied."}</h4></div>
                                                <div className="job-detail job-added col-xs-6"><div className="job-label">Date</div><h3>Added: {new Date(d.date).toLocaleDateString()}</h3></div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="job-details-wrap row">
                                <div className="col-xs row">
                                    <div className="addresses col-xs-12 row">
                                        <div className="invoice-address job-address-section  col-xs-6">
                                            <div className="job-section-title">
                                                Address
                                                </div>
                                            {Object.values(d.address).map((el, i) => {
                                                if (Object.keys(d.address)[i] !== 'url' && Object.keys(d.address)[i] !== 'id') {
                                                    return (<div className="line">{el}</div>)
                                                }
                                            })}
                                        </div>
                                        <div className="invoice-address job-address-section col-xs-6">
                                            <div className="job-section-title">
                                                Other Details
                                            </div>
                                            <div className="line">Username:  <span>{d.username}</span></div>
                                            {d.phone_number > 0 && <div className="line">Phone Number: <span>{d.phone_number}</span></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="job-details-wrap row">
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
                                                    <Loading/>
                                                }

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </React.Fragment>
                )
            } else {
                return (
                    <Loading/>
                )
            }
        }
        else{
            return NotFound("People: "+this.props.match.params.id);
        }
    }
}
export default SinglePerson;
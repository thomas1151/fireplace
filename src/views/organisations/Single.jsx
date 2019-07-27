import React, { Component } from 'react';

import { Loading } from '../../components/Loading';
import documentLinks from '../../logic/documentLinks';

import titleGenerator from '../../logic/titleGenerator';
import { JobInfoBar } from '../../components/JobInfoBar';
import NotFound from '../../components/NotFound';

export class SingleOrganisation extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentDidMount() {
        let d = this.props.getItemByProp('id', this.props.match.params.id);        
        let _this = this;

        if (d) {
            this.setState({
                d: d
            })
            titleGenerator(d.idRef, this.props.config);
        } else {
            _this.props.src.rest.get('organisations/?id=' + this.props.match.params.name)
                .then(function (response) {
                    d = response.data;
                    if (d.length == 1) {
                        _this.setState({ d: d[0] })
                    } else {
                        _this.setState({ notFound: true })

                    }
                })
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

                // let inputProps = {...this.props.inputProps};
                return (
                    <React.Fragment>
                        {!this.props.dependent &&
                            documentLinks(this.props.src.domain, this.props.config['profile-details'].name)
                        }
                        {!this.props.asPrint && <JobInfoBar item={d} src={this.props.src} history={this.props.history} onJobDownload={this.props.createPDF} viewURL={this.props.location.pathname + '/view'} />}

                        <div className="document fireplaceDoc toPrint" style={{ "fontFamily": this.props.config['application-font']['family'] }}>
                            <div className="header">
                                <div class="header-content-wrapper">
                                    <div className="address-wrapper">
                                        <h2>{d.name}</h2>
                                        <div className="details">
                                            <div className="left-details row">
                                                {/* <div className="job-detail job-email col-xs-12 col-sm"><div className="job-label">Amount</div><h4>{ (d.email && d.email.length > 1) ? d.email : "No email supplied."}</h4></div> */}
                                                <div className="job-detail job-added col-xs-6"><div className="job-label">Date</div><h3>Added: {new Date(d.date).toLocaleDateString()}</h3></div>
                                                {/* <div className="job-detail job-id col-xs-6"><div className="job-label">Type</div><h4>{d.peristent ? 'Persistent' : 'This person is not persistent'}</h4></div>
                                                <div className="job-detail job-type col-xs-12 col-sm"><div className="job-label">Type</div><h3>{d.contactable ? 'Contactable' : 'Do not contact'}</h3></div> */}
                                                
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
                                                Location
                                                </div>
                                            {Object.values(d.location).map((el, i) => {
                                                if (Object.keys(d.location)[i] != 'url' && Object.keys(d.location)[i] != 'id') {
                                                    return (<div className="line">{el}</div>)
                                                }
                                            })}
                                        </div>
                                        <div className="invoice-address job-address-section col-xs-6">
                                            <div className="job-section-title">
                                                Other Details
                                            </div>
                                            <div className="line">Notes:  <span>{d.notes}</span></div>
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
            return NotFound("Organisation " + this.props.match.params.id)
        }
    }
}
export default SingleOrganisation;
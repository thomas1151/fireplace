import React, { Component } from 'react';
import { JobInfoBar } from '../../components/JobInfoBar';
import documentLinks from '../../logic/documentLinks';
import titleGenerator from '../../logic/titleGenerator.js';
import Loading from '../../components/Loading.js';
import NotFound from '../../components/NotFound';
const ReactMarkdown = require('react-markdown');

const toSentenceCase = (el) => {
    return el.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, function (key) {
        return key.toUpperCase()})

}

export class SingleDocument extends Component{
    constructor(props) {
            super(props);
            this.state = {
                jobLoaded: false,
            };
            
    }
    componentDidMount(){
        this.setState({ time: new Date().toLocaleString()})
        let d = this.props.getItemByProp('idRef', this.props.match.params.id)
        let _this = this;

        if(d){
            this.setState({
                d:d
            })
            titleGenerator(d.idRef, this.props.config);
        }else{
            _this.props.src.rest.get('documents/?idRef=' + this.props.match.params.id)
                .then(function (response) {
                    console.log(response);
                    d = response.data;
                    if(d.results.length == 1){
                        _this.setState({ d: d.results[0] })
                    }else{
                        _this.setState({ notFound: true})
                        
                    }
                }).catch(function (error) {
                    let e = {};
                    if (error.response && error.response.status == 404) {
                        e['notFound'] = true;
                    }
                    _this.setState({ ...error, ...e });
                })
        }

    }
    fetchAdditional() {
        let _this = this;
        if (this.state.d && !this.state.jobLoaded) {
            _this.props.src.rest.get(this.state.d.job.url, { baseUrl: '' })
                .then(function (response) {
                    _this.setState({ job: response.data, jobLoaded: true })
            })

        }
    }
    render(){
        if(!this.state.notFound){
            if(this.state.d){
                    this.fetchAdditional();
                    // let d = this.props.getItemByProp('idRef', this.props.match.params.id)
                    let d = this.state.d;
                    titleGenerator(d.idRef, this.props.config);
                    {
                    !this.props.dependent &&
                        documentLinks(this.props.src.domain, this.props.config['profile-details'].name)
                    }
                    // console.log(d);
                    d.actions.sort(function (a, b) { return Date.parse(a.startDate) - Date.parse(b.startDate) });
                    

                    return(
                    <React.Fragment>
                            <JobInfoBar className="noPrint" item={d} match={this.props.match} src={this.props.src} history={this.props.history} onJobDownload={this.props.createPDF} viewURL={this.props.location.pathname+'/view'}/>
                            <div className="document a4 toPrint fireplaceDoc" style={{ "fontFamily": this.props.config['application-font']['family'] }}>
        
                                <div className="header">
                                    <div class="header-content-wrapper">
                                        <div className="logo-wrapper">
                                            <img src={this.props.src.domain+"config/"+this.props.config.organisation.logo}/>
                                        </div>
                                        <div className="address-wrapper">
                                            <h2>{this.props.config.organisation.name}</h2>
                                            <div className="details">
                                                <div className="left-details row">
                                                    <div className="job-detail job-date col-xs-6"><div className="job-label">Date</div><h3>{ new Date(d.date).toLocaleDateString() }</h3></div>
                                                    <div className="job-detail job-type col-xs-6"><div className="job-label">Type</div><h3>{d.status.name}</h3></div>
                                                    <div className="job-detail job-amount col-xs-6"><div className="job-label">Amount</div><h3>£{d.totalPrice.toFixed(2)}</h3></div>
                                                        <div className="job-detail job-id col-xs-6"><div className="job-label">Type</div><h3>#{d.idRef}</h3></div>
                                                    { this.state.job ? (this.state.job.order_number.length > 1 || d.order_number && d.order_number.length > 1) && 
                                                        <React.Fragment>
                                                            <div className="job-detail job-blank col-xs-6"></div>
                                                            <div className="job-detail job-order_number col-xs-6"><div className="job-label">Order No:</div><h3>#{d.order_number && d.order_number.length > 1 ? d.order_number : this.state.job.order_number}</h3></div>
                                                        </React.Fragment>
                                                    :
                                                    <Loading/>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                            <div className="job-details-wrap row">
                                <div className="addresses col-xs-4 row">
                                    <div className="providers job-address-section  col-xs-12">
                                        <div className="job-section-title">
                                            Your Ref
                                        </div>
                                        {this.state.job ? this.state.job.people.map( (p)=>{
                                            if(p.refType.id == 2){
                                                return (
                                                    <React.Fragment>
                                                        <div><a href={"/people/" + p.person.username} className="line noPrint">{p.person.name}</a></div>
                                                        <div className="line printOnly">{p.person.name}</div>
                                                    </React.Fragment>
                                                )

                                            }
                                        })
                                        :
                                        <Loading/>
                                        }
                                    </div>
                                    <div className="clients job-address-section col-xs-12">
                                        <div className="job-section-title">
                                            Our Ref
                                        </div>
                                        {this.state.job ? this.state.job.people.map( (p)=>{
                                            if(p.refType.id == 1){
                                                return(
                                                <React.Fragment>
                                                    <div><a href={"/people/" + p.person.username} className="line noPrint">{p.person.name}</a></div>
                                                    <div className="line printOnly">{p.person.name} ({p.person.organisation.name})</div>
                                                </React.Fragment>      
                                                )
                                            }                              
                                        })
                                        :
                                        <Loading/>
                                        }
                                    </div>
                                </div>
                                <div className="col-xs row">
                                    <div className="addresses col-xs-12 row">
                                        <div className="invoice-address job-address-section  col-xs-6 col-sm-6">
                                            <div className="job-section-title">
                                                Invoice address
                                            </div>

                                            {
                                                this.state.job ?
                                                <React.Fragment>

                                                <div className="line">{this.state.job.organisation.name}</div>
                                                    {Object.values(this.state.job.invoiceAddr).map( (el,i)=>{
                                                        if (Object.keys(this.state.job.invoiceAddr)[i] != 'url' && Object.keys(this.state.job.invoiceAddr)[i] != 'id') {
                                                            return(<div className="line">{el}</div>)
                                                        }
                                                    })}
                                                </React.Fragment>

                                                :
                                                <Loading/>
                                            }
                                        </div>
                                        <div className="job-address job-address-section col-xs-6 col-sm-6">
                                            <div className="job-section-title">
                                                Job address
                                            </div>
                                            {
                                                this.state.job ? 
                                                Object.values(this.state.job.jobAddr).map( (el,i)=>{
                                                if (Object.keys(this.state.job.invoiceAddr)[i] != 'url' && Object.keys(this.state.job.invoiceAddr)[i] != 'id') {
                                                    return(<div className="line">{el}</div>)
                                                }
                                                })
                                            :
                                            <Loading/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
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
                                {d.actions.map( (el)=>{
                                    // console.log(el);
                                    let endDate = false
                                    let startDate = el.startDate ? new Date(el.startDate).toLocaleDateString(): '-';
                                        let date = startDate;
                                    if(el.dateEnded){
                                    }
                                    return(
                                        <tr>
                                            <td>
                                                {date}
                                                {endDate? '- '+endDate : null}
                                                
                                            </td>
                                            <td>
                                                {<ReactMarkdown source={el.work} escapeHtml={false} />}
                                            </td>
                                            <td className="right-align">
                                                {parseFloat(el.price).toFixed(2)}
                                            </td>
                                            <td className="right-align">
                                                {parseFloat(el.quantity).toFixed(2)} 
                                            </td>
                                            <td className="right-align">
                                                { (el.quantity * el.price).toFixed(2) }
                                            </td>
                                            
                                        </tr>
                                    )
                                })}
                                </tbody>
            
                                </table>
                                <table>
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
                                    <div>
                                        <div className="notes col-xs">
                                        {<ReactMarkdown source={d.notes} escapeHtml={false} />}
                                        </div>
                                    </div>
                                </div>
        
        
                            <div className="footer">
                                <div className="footer-content-wrapper">
                                    <div className="footer-section-group">
                                        <div className="footer-section location left-align"> 
                                            {/* <h4 className="footerTitle">Address</h4> */}
                                            {Object.values(this.props.config.organisation.address).map( (el,i) => el+(i <  Object.keys(this.props.config.organisation.address).length-1 ? ', ' : '' )) }
                                        </div>
                                        <div className="times right-align">
                                            <div class="line">Modified: {new Date(Date.parse(d.modified)).toLocaleString()}</div>
                                            <div class="line">Generated: {this.state.time}</div>
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
                                            {Object.keys(this.props.config.organisation.online).map((el) => <div className="social_line"><span className="footerLabel">{toSentenceCase(el.slice(0,3))}</span>: {this.props.config.organisation.online[el]}</div>)}
                                        </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        
                        
                    </div>
                    </React.Fragment>
                    )
                    // retun(template())
                }else{
                    return(
                        <Loading/>
                    )
                }
            }else{
                return(
                    NotFound("Document "+this.props.match.params.id)
  
                )
            }

    }
}
export default SingleDocument;
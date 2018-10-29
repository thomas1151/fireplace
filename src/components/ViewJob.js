import React, { Component } from 'react';
import {Link,State, Route} from 'react-router';
import moment from 'moment';
import { JobInfoBar } from './JobInfoBar';
import ReactHtmlParser from 'react-html-parser';

export class ViewJob extends Component{
    constructor(props) {
            super(props);
            
    }
   
    render(){
            let d = this.props.getItemByProp('idRef',this.props.match.params.id);
            console.log(d);
            let dateToday = new Date();
            let total = 0;
            d.actions.forEach(function(el,i){
                                      total += el.price * el.quantity
                                })
            // let inputProps = {...this.props.inputProps};
            return(
            <React.Fragment>

            {!this.props.asPrint && <JobInfoBar onJobDownload={this.props.createPDF} viewURL={this.props.location.pathname+'/view'}/>}
            <style type="text/css" media="print" href="/styles/css/print.css"/>
            <link rel="stylesheet" type="text/css" href="/styles/css/document.css"/>
            <div className="document a4 toPrint"  style={{size: 'A4'}}>

                    <div className="header">
                        <div class="header-content-wrapper">
                            <div className="logo-wrapper">
                                <img src={"/"+this.props.config.organisation.logo}/>
                            </div>
                            <div className="address-wrapper">
                                <h2>{this.props.config.organisation.name}</h2>
                                <div className="details">
                                    <div className="left-details row">
                                        <div className="job-detail job-date col-xs-6"><div className="job-label">Date</div><h3>{ new Date(d.date).toLocaleDateString() }</h3></div>
                                        <div className="job-detail job-type col-xs-6"><div className="job-label">Type</div><h3>{d.status.name}</h3></div>
                                        <div className="job-detail job-amount col-xs-6"><div className="job-label">Amount</div><h3>£{total.toFixed(2)}</h3></div>
                                        <div className="job-detail job-id col-xs-6"><div className="job-label">Type</div><h3>#{d.idRef}</h3></div>
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
                                <div className="line">Thomas Barratt</div>
                                {d.people.map( (el,i)=>{
                                    if(el.type=="provider"){
                                        return(<div className="line">{el.name}</div>)
                                    }
                                })}
                            </div>
                            <div className="clients job-address-section col-xs-12">
                                <div className="job-section-title">
                                    Our Ref
                                </div>
                                <div className="line">Lee Mellor</div>

                                {d.people.map( (el,i)=>{
                                    if(el.type=="client"){
                                        return(<div className="line">{el.name}</div>)
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
                                    {Object.values(d.invoiceAddr).map( (el,i)=>{
                                        if (Object.keys(d.invoiceAddr)[i] != 'url') {
                                            return(<div className="line">{el}</div>)
                                        }
                                    })}
                                </div>
                                <div className="job-address job-address-section col-xs-6 col-sm-6">
                                    <div className="job-section-title">
                                        Job address
                                    </div>
                                    {Object.values(d.jobAddr).map( (el,i)=>{
                                        if(Object.keys(d.jobAddr)[i] != 'url'){
                                            return(<div className="line">{el}</div>)
                                        }
                                    })}
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
                        {d.actions.map( (el,i)=>{
                            let endDate = false
                            let startDate = new Date(el.startDate);
                                let date = startDate.toLocaleDateString();
                            if(el.dateEnded){
                                let endDate = new Date(el.dateStarted).toLocaleDateString(); 
                            }
                            return(
                            <tr>
                                <td>
                                    {date}
                                    {endDate? '- '+endDate : null}
                                    
                                </td>
                                <td>
                                    { ReactHtmlParser(el.work)}
                                </td>
                                 <td className="right-align">
                                    {parseInt(el.price).toFixed(2)}
                                </td>
                                <td className="right-align">
                                    {parseInt(el.quantity).toFixed(2)} 
                                </td>
                                <td className="right-align">
                                    { (el.quantity * el.price).toFixed(2) }
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
                                <td className="right-align"><strong>{total.toFixed(2)}</strong></td>
                            </tr>
                            { d.vat ? 
                                <React.Fragment>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className="right-align">VAT at</td>
                                    <td className="right-align">{d.vat*100}%</td>
                                    <td className="right-align">{(d.vat * total).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="right-align">Total</td>
                                    <td className="right-align"><strong>{ ( (total * d.vat) + total  ).toFixed(2)  }</strong></td>
                                </tr>
                                </React.Fragment>
                                :
                                null
                            }

                        </tfoot>
                        </table>
                            <div>
                                <div className="notes col-xs">
                                {ReactHtmlParser(d.notes)}
                                </div>
                            </div>
                        </div>


                    <div className="footer">
                        <div class="footer-content-wrapper">
                            <div class="footer-section location left-align">
                            {Object.values(this.props.config.organisation.financial).map((el, i) => <div className="location_line">{el[0]}: {el[1]} </div>)}
                            </div>
                            <div class="footer-section location left-align"> 
                                {Object.values(this.props.config.organisation.address).map( (el,i) => <div className="location_line">{(el)} </div> )}
                            </div>
                            <div class="footer-section social-media right-align row">
                                {Object.entries(this.props.config.organisation.online).map((el, i) => <div className="social_line"><div >{(el[1])}</div></div>)}
                            </div>
                        </div>
                    </div>
                 
                
            </div>
            </React.Fragment>
            )
            // return(template())

    }
}
export default ViewJob;
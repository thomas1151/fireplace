import React, { Component } from 'react';
import { FeedElement } from '../components/FeedElement';
import { Loading } from '../components/Loading';
const ReactMarkdown = require('react-markdown');

// const getScrollPercent = (h,b) => {
//     var st = 'scrollTop',
//         sh = 'scrollHeight';
//     return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
// }
export class InvoiceInbox extends Component{

    handleScroll = (e) => {
        // let scrollPos = (e.target.scrollHeight - e.target.scrollTop);
        // let clientHeight = parseInt(e.target.clientHeight + 1 * (e.target.clientHeight));
        // //;
        var scrollPercentage = 100 * e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight); 
        const bottom = scrollPercentage < 80 && scrollPercentage > 75 
        // console.log(scrollPercentage);
        if (bottom) {
            console.log("Bottom!");
            if(!this.props.fetchingMore){
                this.props.fetchMore();
                // this.setState({restFetchLoading:true})
            }
            
        }
    }


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
            }
            this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount(){
    }
    render(){
        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2></div></div>;
        return(
            <React.Fragment>
               
                <div className="app-wrapper row">
                    <div className="invoice-feed action-feed col-xs" onScroll={this.handleScroll}>
                        {this.props.items.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map( (f) =>{
                            let created = new Date(Date.parse(f.date)).toLocaleDateString();

                            

                            return(<FeedElement 
                                        usefulData={"£"+f.totalPrice.toFixed(2)} 
                                        subtitle={ (f.creator ? f.creator.fname+' '+f.creator.lname : 'Unknown')+" on "+created} 
                                        title={f.idRef} 
                                        ikey={f.idRef} 
                                        data={f} 
                                        key={f.idRef} 
                                        badge={"#"+f.id}
                                        onRemove={this.handleRemoveProperty} 
                                        onAdd={this.handleNewProperty}
                                        onMoreUrl={"/jobs/"+f.idRef}
                                        people={f.people && f.people}
                                        displayPeopleAs={ ['name']}
                            >
                                {f.latestDocument ? <p>Latest: {f.latestDocument.idRef} ({f.latestDocument.status.name})</p> : <p>No documents on this job</p>}
                                <p>{f.noOfDocuments} document{f.noOfDocuments !==1 && 's'} belong{f.noOfDocuments === 1 && 's'} to this job.</p>
                                <p><ReactMarkdown source={f.notes} escapeHtml={false} /></p>
                            
                            </FeedElement>)
                        }) }
                        {this.props.fetchingMore && <Loading/>}
                    </div>
                    {this.props.children}

                </div>

            </React.Fragment>
        )
    }
}
export default InvoiceInbox;
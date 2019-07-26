import React, { Component } from 'react';
import { FeedElement } from '../components/FeedElement';
import { Loading } from '../components/Loading';
import axios from 'axios';
import {
    Link,
} from 'react-router-dom';
const subtitle = (f) => {
    let created = new Date(Date.parse(f.date)).toLocaleDateString();
    return (
    ( f.position ? f.position + ' at ': '' )
    + f.organisation.name
    + " added on " + created
    )
}


export class ContactsInbox extends Component {
    constructor(props) {
        super(props);
        let useProps = true;
        let loaded = true;
        if(!(this.props.items)){
            useProps = false;
            loaded = false;
        }
        this.state = {

            useProps: useProps,
            loaded: loaded
        }
    }
    componentDidMount(){
        if(!this.state.useProps){
            var _this = this;
            _this.props.src.rest.get('users/')
                .then(function (response) {

                    _this.setState({ items: response.data.results, loaded: true });
                    console.log(response.data);
            })
        }

    }
    render() {
        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2></div></div>;
        return (
            <React.Fragment>


                <div className="app-wrapper row">
                    <div className="invoice-feed action-feed col-xs">
                        {this.state.loaded ? 
                         (this.state.useProps ? this.props.items : this.state.items ).sort( (a,b) => a.lname.toLowerCase().localeCompare(b.lname.toLowerCase()) ).map((f) => {
                            // let date = new Date(Date.parse(f.date)).toLocaleDateString();
                            {/* let totalPrice = f.actions.map(item => item.total).reduce((prev, next) => prev + next);  */ }

                            return (<FeedElement
                                usefulData={f.username}
                                subtitle={subtitle(f)}
                                title={f.name}
                                ikey={f.id}
                                data={f}
                                key={f.username}
                                badge={"#" + f.id}
                                onRemove={this.handleRemoveProperty}
                                onAdd={this.handleNewProperty}
                                onMoreUrl={"/people/" + f.username}
                                // people={f.people && f.people}
                                // displayPeopleAs={['name']}
                            >{f.notes}</FeedElement>)
                        })

                        :

                        <Loading/>
                    }


                    </div>
                    {this.props.children}

                </div>
            </React.Fragment>
        )
    }
}
export default ContactsInbox;
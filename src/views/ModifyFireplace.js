import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import CONFIGLABELS from '../ConfigLabels.json';
import {SearchBar} from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { FeedElement } from '../components/FeedElement';
import { ActionSelection } from '../components/ActionSelection';
import { InvoiceInbox } from './InvoiceInbox';
import { Checkbox } from '../components/Checkbox';
import { ViewJob } from '../components/ViewJob';
import { Redirect } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Loading } from '../components/Loading';



export class ModifyFireplace extends Component{
       constructor(props) {
            super(props);
            this.onSave = this.onSave.bind(this);
            this.onSettingChange = this.onSettingChange.bind(this);
            this.state = {
                isLoaded: false,
                properties: {}
            }
            // this.loadInputs();
    }
    componentDidMount() {
        
    }
    resolve(path, obj = this, separator = '.') {
        var properties = Array.isArray(path) ? path : path.split(separator)
        return properties.reduce((prev, curr) => prev && prev[curr], obj)
    }
    keyify(obj,prefix=""){
        return Object.keys(obj).reduce((res, el) => {
            if (Array.isArray(obj[el])) {
                return res;
            } else if (typeof obj[el] === 'object' && obj[el] !== null) {
                return [...res, ...this.keyify(obj[el], prefix + el + '.')];
            } else {
                return [...res, prefix + el];
            }
        }, []);
    }
    keyifyToJSON(keys){
        let obj = {};
        keys.map( el => {
            console.log(el);
            let segs = el.split(".");
            segs.forEach( (seg,i) => {
                console.log(seg);
                console.log(i);
            });
        } );
    }
    loadInputs(){
        const keyify = (obj, prefix = '') => 
        Object.keys(obj).reduce((res, el) => {
            if( Array.isArray(obj[el]) ) {
            return res;
            } else if( typeof obj[el] === 'object' && obj[el] !== null ) {
            return [...res, ...keyify(obj[el], prefix + el + '.')];
            } else {
            return [...res, prefix + el];
            }
        }, []);

        var keys = keyify(CONFIG);
        var properties = {}                     
        for (var key in keys) { 
            let val = this.resolve(keys[key], CONFIG);
            properties[keys[key]] = val
        }
        console.log(properties)
        this.setState(prevState => (
            { properties: Object.assign({}, prevState.properties, properties) }
        ))
        this.setState({isLoaded:true});
    }

    onSettingChange(setting,e){
        var s = setting;
        var value   = e.target.value;

        this.setState(prevState => {
            let prevProperties = prevState.properties;
            prevProperties[s] = value;
            return({properties: prevProperties})
        })
    }
    setObject(name, value, context) {
        var parts = name.split("."),
            p = parts.pop();
        for (var i = 0, j; context && (j = parts[i]); i++) {
            context = (j in context ? context[j] : context[j] = {});
        }
        return context && p ? (context[p] = value) : undefined; // Object
    }
    onSave(){
        console.log(this.resolve("keys[key]", CONFIG) )
        let properties = this.state.properties;
        let properties_keys = Object.keys(properties);
        let output = {};
        properties_keys.forEach( key =>{
            this.setObject(key, properties[key], output);
        })

        // (async () => {
        //     await writeJsonFile('TestConfig.json', output);
        // })();

        console.log(output);
        console.log("SAVE INNIT");
    }
    render(){
        let bg =this.props.backgroundColor;
        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
        return (

        <div class="login-wrapper row center-xs middle-xs">
            <div class="login-outer col-xs-10 col-md-10">
                <div class="box">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-4 intro-section">
                            <div class="titles-wrap">
                                <div class="site-title">Edit Fireplace Settings</div>
                                {/* <div class="site-subtitle">Finger Friendly Finances</div> */}
                                <div class="site-description">Use the form to the right to change your configuration details.</div>
                                {/* <div class="site-logo">Fireplace 2019</div> */}
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-6 col-md-8 login-section">

                            <div class="titles-wrap">

                                {/* <div class="login-title">
                                    Your Fireplace 
                                </div> */}
                                <div class="login-form">
                                    { (!this.state.isLoaded) ? this.loadInputs() : 
                                    
                                        Object.keys(this.state.properties).map( key => {
                                            let l = key;
                                            if( (key in CONFIGLABELS)){
                                             l = CONFIGLABELS[key]
                                            }
                                            return(<div class="input-group">
                                                <div class="input-label">{l}</div>
                                                <input type="text" onChange={(e) => this.onSettingChange(key,e)} value={this.state.properties[key]} />
                                            </div>)
                                          }  )

                                    } 
                                    <div class="">
                                        <button type="submit" onClick={this.onSave} class="sign-in-button">Save Configuration Files</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        )
    }
}
// export default Invoices;

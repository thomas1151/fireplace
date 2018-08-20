import React, { Component } from 'react';
import {FeedElement} from './FeedElement';
import { ActionSelection } from './ActionSelection';
const feed = [
    {
        "id": "A171295",
        "description": "Taking care of business, you know, TCB",
        "dateStarted": "Sun Dec 17 1995 03:24:00 GMT",
        "dateEnded": "Sun Dec 18 1995 03:24:00 GMT",
        "location": {
            "line1": "43 Crookes Rd",
            "line2": "Sheffield",
            "postcode": "S10 5BA"
        },
        "quantity": "2",
        "price": "75.00",
        "creator": {
            "id": "1",
            "name": "Thomas Barratt"
        },
        "created": "Sun Dec 17 2018 03:24:00 GMT",
        "people": [
            {
                "id": "1",
                "name": "Thomas Barratt"
            },
            {
                "id": "2",
                "name": "Donald Trump"
            },
            {
                "id": "3",
                "name": "James Reynolds"
            }
        ],

    },
        {
            "id":"A251295",
            "description": "Making thirsty pretzels",
            "dateStarted": "Sun Dec 25 1995 03:24:00 GMT",
            "location": {
                "line1": "Gill's",
                "line2": "Sheffield",
                "postcode": "A14 5BC"
            },
            "quantity": "5",
            "price": "100.00",
            "creator": {
                "id": "1",
                "name": "Jerry Seinfeld"
            },
            "created": "Sun Dec 17 2018 03:24:00 GMT",
            "people": [{
                    "id": "1",
                    "name": "Jerry Seinfeld"
                },
                {
                    "id": "2",
                    "name": "Cosmo Kramer"
                },
            ],
            "job":{
                "id":1,
                "name": "SEI180818",
            }

        },
          {
              "id": "A150508",
              "description": "Continued work on Fireplace",
              "dateStarted": "Sun May 15 2008 03:24:00 GMT",
              "location": {
                  "line1": "6 South View",
                  "line2": "Kirk Merrington",
                  "line2": "Spennymoor",
                  "postcode": "DL167JB"
              },
              "quantity": "4",
              "price": "100",
              "creator": {
                  "id": "1",
                  "name": "Thomas Barratt"
              },
              "created": "Sun Aug 18 2018 03:24:00 GMT",
              "people": [{
                      "id": "1",
                      "name": "Thomas Barratt"
                  },
              ],

          }, 
]

export class Feed extends Component{
    constructor(props) {
            super(props);
            this.state ={
                items: feed,
                selected: []
            }

            this.handleNewProperty = this.handleNewProperty.bind(this);            
            this.handleRemoveProperty = this.handleRemoveProperty.bind(this);            
            this.handleChangeAllOfProperty = this.handleChangeAllOfProperty.bind(this);            
            this.handleProcessSelected = this.handleProcessSelected.bind(this);



    }
    getSelected(){
        let a = this.state.items.filter(function(val,idx){
            return val.selected
        })
        console.log(a);
        return a;
    }
    handleNewProperty(index,property="selected",value=true){
        console.log(index);
        console.log(this.state.items);

        this.setState(prevState => { // prevState?
            prevState.items[index][property] = value
            return (prevState);
        });
    }
    handleRemoveProperty(index,property="selected"){
        this.setState(prevState => { // prevState?
            prevState.items[index]['selected'] = false
            return(prevState);
        });
    }
    handleChangeAllOfProperty(property="selected",value=false,prereqs=[],prereqVals=[]){
        this.setState(prevState => { // prevState?
            prevState.items.forEach((element, index) => {
                console.log(element);
                let t = prereqs.length == 0;
                prereqs.some( (prereq,j) =>{
                    if(element[prereq] == prereqVals[j]){
                        t = true;
                    }
                })
                if(t){
                    element[property] = value;
                }
    
            });
            return (prevState);
        });
    }
    handleProcessSelected(){
        console.log(this.getSelected());
    }
    render(){
            // let inputProps = {...this.props.inputProps};
            return(<div class="action-feed">
                    {this.state.items.map( (f,i) =>{
                        return(<FeedElement ikey={i} data={f} key={i} onRemove={this.handleRemoveProperty} onAdd={this.handleNewProperty}/>)
                    }) }
                    {
                        this.getSelected().length > 0 ? 
                    <ActionSelection onAdd={this.handleNewProperty} onSingleRemove={this.handleRemoveProperty} onRemove={this.handleChangeAllOfProperty} items={this.getSelected()}/>
                        :
                        null
                    }
                </div>)
    }
}
export default Feed;
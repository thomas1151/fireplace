import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


// Imagine you have a list of languages that you'd like to autosuggest.
const src_languages = [
    {
        data: [
            ["name", "Thomas Barratt"],
            ["organisation", "Thomas Barratt Design & Development"],
        ],
        id: 2,
        other: '',
    }, {
        data: [
            ["name", "James Reynolds"],
            ["organisation", "Savilles"],
        ],
        id: 3,
        other: '',
    },
    {
        data: [
            ["name", "Donald Trump"],
            ["organisation", "Trump Hotels"],
        ],
        id: 3,
        other: '',
    },
];

const src_jobs = [{
        data: [
            ["name", "REW180916"],
            ["organisation", "Ray Estate"],
        ],
        id: 2,
        other: '',
    }, {
        data: [
            ["name", "TBW190918"],
            ["organisation", "Thomas Barratt Design & Development"],
        ],
        id: 3,
        other: '',
    },
    {
        data: [
            ["name", "DTW180918"],
            ["organisation", "Trump Hotels"],
        ],
        id: 3,
        other: '',
    },
];



const src_address = [{
    data:[
        ["line1","Ray Estate"],
        ["line2", "Ray Demense Office"],
        ["line3", "Kirkwhelpting"],
        ["line4", "NOrthumberland"],
        ["postcode", "NE19 2RG"]
    ],
    id: 1,
    // sub: "Ray Demense Office, Kirkwhelpington, Northumberland, NE19 2 RG",
    other: '',
},
{
    data: [
        ["line1", "43 Crookes Rd"],
        ["line2", "Sheffield"],
        ["line3", ""],
        ["line4", ""],
        ["postcode", "S10 5BA"]
    ],
    id: 2,
    other: '',
},
]

const src_autocomplete = [
    {
        data: [
            ["description_fragment", "Continued work over fencelines"],
        ],
        id: 2,
        other: 5,
    }, 
    {
        data: [
            ["description_fragment", "TCB - you know, taking care of business."],
        ],
        id: 3,
        other: 5,
    }, 
    
]
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value,src) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : src.filter(lang => {
    return(lang['data'][0][1].toLowerCase().slice(0, inputLength) === inputValue)
  });
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.data[0][1];

const renderSuggestion = function(suggestion){

    return(
          <div>

            <div className={"suggestion-content-wrapper"}>
                <p className="title">{suggestion['data'][0][1] }   {suggestion["other"].length== 0 ? null:<span>{suggestion["other"]}</span>}</p>
                <p>  {suggestion['data'].hasOwnProperty(1) ? suggestion['data'][1][1]:null}</p>
            </div>
            </div>
    )
}



export class ActionPerson extends Component{
    constructor(props) {
        super(props);

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.state = {
            value: '',
            suggestions: [],
            src: this.selectSrc(),
        };

    }

    renderInputComponent = inputProps => {
        const TagName = this.props.renderComponent;
        return(<TagName {...inputProps}>
        </TagName>)
        
    };
    // renderComponent(inputProps){
    //     if(this.props.renderComponent){
    //         return 
    //     }else{
    //         return this.renderInputComponent(inputProps)
    //     }
    // }
    selectSrc(){
        if (this.props.debug) {
            var a = eval(("src_" + this.props.src))
        }else{
        }
        return a;
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.props.onChangeForParent(this.props.id,newValue);
    };
    scrollToDomRef = () => {
        const domNode = ReactDOM.findDOMNode(this.domRef.current)
        domNode.scrollIntoView()
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
        suggestions: getSuggestions(value,this.state.src)
        });
    };

    onSuggestionSelected(e,s){
        if(this.props.onSelectedForParent){
            this.props.onSelectedForParent(s);
        }
    }
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };
    componentDidUpdate(){
        // console.log(this.refs);
        // this.refs.nameInput.getDOMNode().focus();
    }

    render(){
        let { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        let placeholder = "Search";

        if(this.props.placeholder){
            placeholder = this.props.placeholder
        }
        if(this.props.assigned){
            value = this.props.assigned;
        }
        const inputProps = {
        placeholder: placeholder,
        value,
        onChange: this.onChange
        };
        function storeInputReference(autosuggest) {
            function storeInputReference(autosuggest) {
                if (autosuggest !== null) {
                    autosuggest.input.focus();
                }
            }

        }

        const { selectedOption } = this.state;
        if (this.props.renderComponent) {
                return(
                    <div className={"searchBox row "+this.props.className}>   
                        <div className="col-xs-12">
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                onSuggestionSelected={this.onSuggestionSelected}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                                id={this.props.id.toString()}
                                renderInputComponent={this.renderInputComponent}
                                ref={storeInputReference}
                                // ref={(input) => { this.nameInput = input; }} 
                            />
                        </div>
                    </div>                     
                )}else{
                return(
                    <div className={"searchBox row "+this.props.className}>   
                        <div className="col-xs-12">
                            <Autosuggest
                                suggestions={suggestions}
                                ref={storeInputReference}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                onSuggestionSelected={this.onSuggestionSelected}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                                id={this.props.id.toString()}
                                // ref={(input) => { this.nameInput = input; }} 
                            />
                        </div>
                    </div>    
                )
            }
    }
}
export default ActionPerson;
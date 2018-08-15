import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


// Imagine you have a list of languages that you'd like to autosuggest.
const src_languages = [{
        title: 'Thomas Barratt',
        id: 1,
        sub: 'Thomas Barratt Design and Development',
        other: '',
    },
    {
        title: 'James Reynolds',
        id: 1,
        sub: 'Savilles',
        other: '',
    },
    {
        title: 'Donald Trump',
        id: 1,
        sub: 'Trump Hotels',
        other: '',
    },

];


const src_address = [{
    title: "Ray Estate",
    id: 1,
    sub: "Ray Demense Office, Kirkwhelpington, Northumberland, NE19 2 RG",
    other: '',
},
{
    title: "43 Crookes Road",
    id: 1,
    sub: "Sheffield, S10 5BA",
    other: '',
},
]

const src_autocomplete = [{
        title: "Continued work over fencelines",
        id: 1,
        sub: "",
        other: "5"
    },
    {
        title: "Various",
        id: 1,
        sub: "Sheffield, S10 5BA",
        other: "3"
    },
]
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value,src) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : src.filter(lang =>
    lang.title.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = function(suggestion){

    return(
          <div>

            <div className={"suggestion-content-wrapper"}>
                <p className="title">{suggestion.title }   {suggestion.other.length== 0 ? null:<span>{suggestion.other}</span>}</p>
                <p> {suggestion.sub}</p>
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
            console.log(this.props.src);
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

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
        suggestions: getSuggestions(value,this.state.src)
        });
    };

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
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        let placeholder = "Search";

        if(this.props.placeholder){
            placeholder = this.props.placeholder
        }
        
        const inputProps = {
        placeholder: placeholder,
        value,
        onChange: this.onChange
        };


        const { selectedOption } = this.state;
        if (this.props.renderComponent) {
                return(
                    <div className={"searchBox row "+this.props.className}>   
                        <div className="col-xs-12">
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={inputProps}
                                id={this.props.id.toString()}
                                renderInputComponent={this.renderInputComponent}
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
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
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
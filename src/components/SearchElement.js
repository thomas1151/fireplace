import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const typesToUrl = function(type){
    switch(type){
        case 'invoice' : return "invoices";
        case 'person'  : return "people";
        case 'location': return "locations";
        case 'quotes'  : return "quotes";
    }
}
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [{
        title: 'REW2901318',
        id: 1,
        sub: '£300.00 for James Reynolds, 2x Man Days',
        other: '29/03/18',
        type: "invoice",
        icon: 'fas fa-file-invoice',
        // search_string:"REW2901318 James Reynolds £300 29/03/18 invoice"
    },
    {
        title: 'Raymond Dobbins',
        id: 1,
        sub: 'First officer at Ray Estate',
        other: '',
        type: "person",
        icon: 'fas fa-user',
        // search_string:"Raymond Dobbins First Officer at Ray Estate person"


    },
    {
        title: 'Ray Estate',
        id: 1,
        sub: '',
        other: '',
        type: "location",
        icon: 'fas fa-map-marker-alt',
        // search_string: "Ray Estate location"

    },

];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.title.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = function(suggestion){

    return(
          <Link to={typesToUrl(suggestion.type)+"/"+suggestion.id.toString()}>
            <div className="type icon middle-xs">
                <i className={suggestion.icon}></i>
            </div>
            <div className={"suggestion-content-wrapper"}>
                <p className="title">{suggestion.title} <span>{suggestion.type}</span></p>
                <p> {suggestion.sub} {suggestion.other.length== 0 ? null:<span className="unimportant">{suggestion.other}</span>  } </p>
            </div>
            </Link>
    )
}



export class SearchElement extends Component{
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
        value: '',
        suggestions: []
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
        value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
        suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
        suggestions: []
        });
    };
   
    render(){
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
        placeholder: 'Search',
        value,
        onChange: this.onChange
        };


        const { selectedOption } = this.state;

        return(
            <div className="searchBox row">   
                <div className="col-xs-11">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
                <button className="icon-holder for-input col-xs-1">
                    <div className="middle-xs center-xs icon"><i class="fas fa-search"></i></div>
                </button>
            </div>    
        )
    }
}
export default SearchElement;
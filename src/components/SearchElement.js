import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {
    Link
} from 'react-router-dom';


const renderSuggestion = function(suggestion){

    return(
          <Link to={suggestion.url}>
            <div className="type icon middle-xs">
                <i className={suggestion.icon && suggestion.icon}></i>
            </div>
            <div className={"suggestion-content-wrapper"}>
                <p className="title">{suggestion.title} <span>{suggestion.type}</span></p>
                <p> {suggestion.sub} {suggestion.other.length === 0 ? null:<span className="unimportant">{suggestion.other}</span>  } </p>
            </div>
            </Link>
    )
}

function getSuggestions(value, _this){


    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    // let _this = this;
    if (inputLength === 0) {
        return _this.setState({ suggestions: [] })
    } else {
        _this.props.src.rest.get("search/?limit=5&query=" + inputValue)
            .then(function (response) {

                _this.setState({
                    suggestions: response.data.results.map(res => {
                        console.log(res);
                        let newSug = res;
                        newSug.icon = res.name ? 'fas fa-user' : 'fas fa-briefcase'
                        newSug.type = res.name ? 'person' : 'job'
                        newSug.title = res.name ? res.name : res.id + res.organisation.name.slice(0, 3).toUpperCase()
                        newSug.sub = new Date(Date.parse(res.date)).toLocaleDateString()
                        newSug.url = newSug.type === 'person' ? '/people/' + newSug.username : '/jobs/' + newSug.title
                        newSug.other = ''
                        return (
                            newSug
                        )
                    })
                })
            })
    }


};

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
        getSuggestions(value, this);
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        console.log("Clear");
        this.setState({
        suggestions: []
        });
    };
    componentDidMount(){
    //     {
    //     title: 'REW2901318',
    //     id: 1,
    //     sub: '£300.00 for James Reynolds, 2x Man Days',
    //     other: '29/03/18',
    //     type: "invoice",
    //     icon: 'fas fa-file-invoice',
    //     // search_string:"REW2901318 James Reynolds £300 29/03/18 invoice"
    // },
    }
    render(){
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
        placeholder: 'Search',
        value,
        onChange: this.onChange
        };


        return(
            <div className="searchBox row">   
                <div className="col-xs-11">
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={this.onSuggestionsClearRequested}
                    />
                </div>
                <button className="icon-holder for-input col-xs-1">
                    <div className="middle-xs center-xs icon"><i className="fas fa-search"></i></div>
                </button>
            </div>    
        )
    }
}
export default SearchElement;
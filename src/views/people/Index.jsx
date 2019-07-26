import React, { Component } from 'react';
import axios from "axios";

export class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
    }

    componentDidMount(){
        let self = this;
        self.props.src.rest.get('users/')
            .then(function (response) {
                let data = response.data.results;
                // handle success
                self.setState({
                    isLoaded: true,
                    items: data,
                    response
                });
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                self.setState({
                    isLoaded: true,
                    error
                });
                console.log(error);
            })
            .then(function () {
                // always executed
        });
    }

    render(){
        let bg = this.props.backgroundColor;
        return (  
            <div>          
                <h1>Contacts</h1>
                <div>
                    { this.state.isLoaded && 
                    
                    <div>
                        <div class="custom-table">
                            <div class="table-head">
                                <div class="table-row">
                                    <div class="table-data short-field">Id</div>
                                    <div class="table-data">Name</div>
                                    <div class="table-data">Organisation</div>
                                    <div class="table-data">Position</div>
                                </div>
                            </div>
                            <div class="table-body">
                                {this.state.items.map( (el,i) => (
                                    <div class="table-row">
                                        <div class="table-data short-field">{el.id}</div>
                                        <div class="table-data">{el.name}</div>
                                        <div class="table-data">{el.organisation.name}</div>
                                        <div class="table-data">{el.position}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
            // <table>
            // </table>
        );
    }
}
// export default Index;
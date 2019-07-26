import React, { Component } from 'react';
// import { ActionDate } from './ActionDate';
import { ActionPerson } from '../../components/ActionPerson';
import { ActionLocation } from '../../components/ActionLocation';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import { SingleDateInput } from '../../components/SingleDateInput';
import { RangeDateInput } from '../../components/RangeDateInput';
import { RemovableSuggestable } from '../../components/RemovableSuggestable';
import axios from "axios";
import titleGenerator from '../../logic/titleGenerator';
import fetchSuggestions from '../../logic/fetchSuggestions';
import { Checkbox } from '../../components/Checkbox';

// <div>
//   <button onClick={this.notify}>Notify !</button>
//   <ToastContainer />
// </div>
export class NewOrganisation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            items: [],
            suggestData: [],
            location: {
                ['line1']: undefined,
                ['line2']: undefined,
                ['line3']: undefined,
                ['line4']: undefined,
                ['postcode']: undefined,
            },
            contactable: true,
            persistent: false,
            orgLoaded: true,
            orgSuggestData: [],

        };
        this.handleAddUser = this.handleAddUser.bind(this);
        // this.newPerson = this.newPerson.bind(this);
        this.createUserForm = this.createUserForm.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.removeNewPerson = this.removeNewPerson.bind(this);
        this.handleAddLocation = this.handleAddLocation.bind(this);
        // this.addLocation = this.addLocation.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSingleChange = this.handleSingleChange.bind(this);
        this.handleSingleDate = this.handleSingleDate.bind(this);
        this.handleRangeDate = this.handleRangeDate.bind(this);
        this.handleAddRangeDate = this.handleAddRangeDate.bind(this);
        this.handleAddSingleDate = this.handleAddSingleDate.bind(this);
        this.createRangeForm = this.createRangeForm.bind(this);
        this.createSingleForm = this.createSingleForm.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleRangeDateChange = this.handleRangeDateChange.bind(this);
        this.handleRemoveLocation = this.handleRemoveLocation.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
        this.handleOrgChange = this.handleOrgChange.bind(this);

    }

    componentDidMount() {

    }



    notify = (content) => toast(content);

    handleAddUser() {
        if (!this.state.newUserForm) {
            this.setState({ newUserForm: true });
        }
        this.addPerson();

    }
    handleAddLocation() {
        if (!this.state.newLocationForm) {
            this.setState({
                newLocationForm: true,
            });
        }
        this.addLocation();

    }
    handleSingleDate() {

    }
    handleRangeDate() {

    }
    handleAddSingleDate() {
        this.setState({ newRangeDateForm: false, newSingleDateForm: true, start_date: new Date(), end_date: undefined });
    }
    handleAddRangeDate() {
        this.setState({ end_date: new Date() })
        this.setState({ newRangeDateForm: true, newSingleDateForm: false });
        // this.addRangeDate();
    }
    createRangeForm() {
        return (
            <div className="date-wrapper col-xs-12 col-md-6">
                <RangeDateInput isMobile={this.props.isMobile} onChangeForParent={this.handleRangeDateChange} start_date={this.state.start_date} end_date={this.state.end_date} />
                <button className="button-remove col-xs-2" onClick={() => this.handleRemoveDate('end')}><i className="fas fa-times"></i></button>
            </div>
        )
    }
    createSingleForm() {
        return (
            <div className="date-wrapper col-xs-12 col-md-6">
                <SingleDateInput isMobile={this.props.isMobile} onChangeForParent={this.handleStartDateChange} start_date={this.state.start_date} />
                <button className="button-remove col-xs" onClick={() => this.handleRemoveDate('start')}><i className="fas fa-times"></i></button>
            </div>
        )
    }

    createUserForm() {
        return this.state.people.map((el, i) => {
            return (
                <RemovableSuggestable
                    key={i}
                    assigned={el}
                    id={i}
                    src={this.props.src}
                    onChangeForParent={this.handlePersonChange.bind(this)}
                    onSelectedForParent={this.handlePersonSelected.bind(this)}
                    debug={false}
                    propName={""}
                    keyPositions={{ 'name': 0 }}
                    endpoint={"users/?lname__icontains="}
                    existingPeopleLength={this.state.people.length}
                    onRemove={this.removeNewPerson}
                    inputProps={{ button: 'button-remove col-xs', suggestable: 'col-xs-6' }}
                />
            )
        })
    }
    //         return(<div key={i} className="row">
    //             <ActionPerson assigned={el} className="col-xs-6" id={i} src={'languages'} onChangeForParent={this.handlePersonChange.bind(this)} debug={true}/>
    //             {/* <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} /> */}
    //             {this.state.people.length < 1 ? <div><p>Add a new person</p></div> : null}
    //             <button className="button-remove col-xs" onClick={() => this.removeNewPerson(i)}><i className="fas fa-times"></i></button>
    //         </div> );         
    //         })
    // }




    createDateForm() {

    }
    handlePersonChange(i, value) {
        let people = [...this.state.people];

        people[i] = value;
        this.setState({ people });
    }
    handlePersonSelected(person, i) {
        let existing_people = [...this.state.existing_people];
        existing_people[i] = person;

        this.setState({ existing_people });
    }

    handleStartDateChange(value) {
        this.setState({ start_date: value })
    }
    handleRangeDateChange(type, value) {
        this.setState({ [type + '_date']: value })
    }
    addPerson() {
        this.setState(prevState => ({ people: [...prevState.people, ''] }))
    }

    handleLocationChange(values, i) {
        let locations = this.state.location
        if (i === undefined) {

            locations.line1 = values.line1
            locations.line2 = values.line2
            locations.line3 = values.line3
            locations.line4 = values.line4
            locations.postcode = values.postcode
            locations.id = values.id
            this.setState({ location: locations })
        } else {
            locations[[i]] = values;
            this.setState({ location: locations })
        }

    }
    handleRemoveLocation() {
        this.setState({ newLocationForm: false, location: undefined })

    }

    handleDescriptionChange(i, value) {
        this.setState({ description: value, formActive: true });
    }
    handleSingleChange(property, value) {
        if (property != "organisation") {
            this.setState({ [property]: value })
        }
    }
    removeNewPerson(i) {
        let people = [...this.state.people];
        let existing_people = [...this.state.existing_people];
        existing_people.splice(i, 1);
        people.splice(i, 1);
        this.setState({ people, existing_people });
        if (people.length < 1) {
            this.setState({ newUserForm: false });
        }
    }
    handleRemoveDate(date_type) {
        let form = ""
        // newState[(date_type)+'_date'] =undefined
        if (date_type == 'start') {
            form = "newSingleDateForm"
        } else {
            form = "newRangeDateForm";
        }
        this.setState({ start_date: undefined, end_date: undefined, [form]: false })
    }
    constructFormJSON() {
        let data = {}
        // data['manual_entrance_people'] = this.state.people;
        // data['existing_people'] = this.state.existing_people;
        data['notes'] = this.state.notes;
        data['name'] = this.state.name;
        data['location'] = this.state.location;

        return data;
    }
    handleRemove() {
        this.notify("New Action cancelled");
        this.setState({ formActive: false });
    }
    handleSubmit(event) {
        var _this = this;
        let toPost = this.constructFormJSON();
        console.log(toPost);
        event.preventDefault();
        this.props.src.rest.post(this.props.src.domain + 'organisations/', toPost)
            .then(function (response) {
                return response.data;

            })
            .then(function (d) {
                if (d['created']) {
                    _this.setState({ formActive: false })
                }
            })
            .catch(function (error) {
            })
            .then(function (d) {

                // always executed
            });

    }
    handleOrgChange(s) {
        this.setState({
            organisation: s.suggestion.data[4][1]
        })
    }




    fetchSuggestions(value, src, endpoint, keyPositions, propName, idField = 'id', other = "1") {
        fetchSuggestions(value, src, endpoint, keyPositions, propName, this, idField = idField, other = other);
    }

    render() {
        let bg = this.props.backgroundColor;
        titleGenerator('New Person', this.props.config)
        if (this.props.isMobile) {
            // return(
            //     <div className="actionBox isMobile row">
            //     </div>
            // )
        }
        // console.log("renrender triggered");
        return (
            <div className="actionBox col-md-12">
                <div className="row">
                    {/* <div className="col-xs-12 profile-icon middle-xs">
                            <i className="fas fa-fire"></i> <p>New Action</p>
                        </div> */}

                    <div className="new-action col-xs">
                        <div className="row inputs">
                            <div className=" col-xs">
                                <div className="section-title">
                                    <p>Name</p>
                                </div>
                                <input placeholder='Starfleet' onChange={(e) => this.handleSingleChange('name', e.target.value)} name="name" />
                            </div>

                        </div>
                        
                        
                       
                        <div className="row inputs">


                        </div>

                        <div className="remainingForm">
                            <div className="row inputs">
                                <div className="newUserForm">
                                    <div className="section-title">
                                        <p>Location</p>
                                    </div>
                                    <ActionLocation src={this.props.src} onChangeForParent={this.handleLocationChange.bind(this)}>
                                    </ActionLocation>
                                </div>

                                <div className="newUserForm">
                                    <div className="section-title">
                                        <p>Notes</p>
                                    </div>
                                    <textarea placeholder='Invoice on wednesdays and get 10% off!' onChange={(e) => this.handleSingleChange('notes', e.target.value)} name={"notes"} className={"notes searchBox"} />
                                </div>

                            </div>
                            <div className="new-action-tools row end-xs">
                                <div className="for-save col-xs-12">
                                    {/* <button onClick={this.handleRemove} className="button-content-wrap light">
                                        <i className="fas fa-times"></i><p>Clear</p>
                                    </button> */}
                                    <button onClick={this.handleSubmit} className="button-content-wrap success">
                                        <i className="fas fa-plus"></i><p>Create</p>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        )
    }
}
export default NewOrganisation;
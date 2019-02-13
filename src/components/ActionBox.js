import React, { Component } from 'react';
// import { ActionDate } from './ActionDate';
import { ActionPerson } from './ActionPerson';
import { ActionLocation } from './ActionLocation';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import { SingleDateInput } from './SingleDateInput';
import { RangeDateInput } from './RangeDateInput';
import { RemovableSuggestable } from './RemovableSuggestable';
import axios from "axios";

            // <div>
            //   <button onClick={this.notify}>Notify !</button>
            //   <ToastContainer />
            // </div>
export class ActionBox extends Component{
    constructor(props) {
        super(props);
            this.state ={
                newUserForm:false,
                newLocationForm: false,
                newSingleDateForm: false,
                newRangeDateForm:false,
                formActive: false,
                userForms: [],
                people: [],
                existing_people: [],
                description: '',
                quantity: '',
                price: '',
                start_date: new Date(),
                end_date: undefined,
                isLoaded: false,
                items: [],
                suggestData: []

            };
            this.handleAddUser = this.handleAddUser.bind(this);
            // this.newPerson = this.newPerson.bind(this);
            this.createUserForm = this.createUserForm.bind(this);
            // this.handleChange = this.handleChange.bind(this);
            this.addPerson = this.addPerson.bind(this);
            this.removeNewPerson = this.removeNewPerson.bind(this);
            this.handleAddLocation = this.handleAddLocation.bind(this);
            this.addLocation = this.addLocation.bind(this);
            this.createLocationForm = this.createLocationForm.bind(this);
            this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleSingleChange = this.handleSingleChange.bind(this);
            this.handleSingleDate = this.handleSingleDate.bind(this);
            this.handleRangeDate = this.handleRangeDate.bind(this);
            this.handleAddRangeDate = this.handleAddRangeDate.bind(this);
            this.handleAddSingleDate = this.handleAddSingleDate.bind(this);
            this.createRangeForm = this.createRangeForm.bind(this);
            this.createForm = this.createForm.bind(this);
            this.createSingleForm = this.createSingleForm.bind(this);
            this.handleStartDateChange = this.handleStartDateChange.bind(this);
            this.handleRangeDateChange = this.handleRangeDateChange.bind(this);
            this.handleRemoveLocation = this.handleRemoveLocation.bind(this);
            this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        let self = this;

        axios.get(this.props.src.url + 'actions/')
            .then(function (response) {
                let data = response.data;

                let suggestData = []


                data.map((option, i) => {
                    suggestData.push({
                        id: option.idRef,
                        data: [],
                        other: '1'
                    })
                    for (var key in option) {
                        if (option.hasOwnProperty(key)) {
                            switch (key) {
                                case 'work':
                                    suggestData[suggestData.length - 1]['data'].unshift([key, option[key]]);
                                    break;
                                case 'location':
                                    suggestData[suggestData.length - 1]['data'].unshift([key, option[key].line1]);
                                    break;
                                default:
                                    suggestData[suggestData.length - 1]['data'].push([key, option[key]]);
                            }
                        }
                    }
                })

                self.setState({
                    isLoaded: true,
                    items: data,
                    suggestData: suggestData,
                    response
                });
            })
            .catch(function (error) {
                // handle error
                self.setState({
                    isLoaded: false,
                    error
                });
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }



    notify = (content) => toast(content);

    handleAddUser(){
        if(!this.state.newUserForm){
            this.setState({newUserForm:true});
        }
        this.addPerson();

    }
    handleAddLocation(){
        if (!this.state.newLocationForm) {
            this.setState({
                newLocationForm: true
            });
        }
        this.addLocation();

    }
    handleSingleDate() {

    }
    handleRangeDate() {

    } 
    handleAddSingleDate(){
        this.setState({newRangeDateForm: false,newSingleDateForm: true,start_date:new Date(),end_date:undefined});
    }
    handleAddRangeDate(){
        this.setState({end_date:new Date()})
        this.setState({newRangeDateForm: true,newSingleDateForm: false});
        // this.addRangeDate();
    }
    createRangeForm(){
        return(
            <div className="date-wrapper col-xs-12 col-md-6">
            <RangeDateInput isMobile={this.props.isMobile} onChangeForParent={this.handleRangeDateChange} start_date={this.state.start_date} end_date={this.state.end_date}/>
            <button className="button-remove col-xs-2" onClick={() => this.handleRemoveDate('end')}><i className="fas fa-times"></i></button>
            </div>
        )
    }
    createSingleForm(){
        return(
            <div className="date-wrapper col-xs-12 col-md-6">
            <SingleDateInput isMobile={this.props.isMobile} onChangeForParent={this.handleStartDateChange} start_date={this.state.start_date}/>
            <button className="button-remove col-xs"  onClick={() => this.handleRemoveDate('start')}><i className="fas fa-times"></i></button>
            </div>
        )
    }

    createUserForm(){
        return this.state.people.map((el, i) =>  {
            return(
                <RemovableSuggestable
                    key={i} 
                    assigned={el} 
                    id={i} 
                    src={this.props.src} 
                    onChangeForParent={this.handlePersonChange.bind(this)} 
                    onSelectedForParent={this.handlePersonSelected.bind(this)} 
                    debug={false} 
                    existingPeopleLength={this.state.people.length} 
                    onRemove={this.removeNewPerson}
                    inputProps={{button:'button-remove col-xs',suggestable:'col-xs-6'}}
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

    
    createLocationForm(){
        return ( <ActionLocation src={this.props.src} onChangeForParent={this.handleLocationChange.bind(this)}>
                    <button className="button-remove col-xs" onClick={this.handleRemoveLocation}><i className="fas fa-times"></i></button>
                </ActionLocation>    
            )
    }

    createForm()  {
        return( <div className="remainingForm">
                            <div className="row inputs">
                                <div className="days-input col-xs">
                                    <input type="number" placeholder="2"  onChange={(e)=> this.handleSingleChange('quantity', e.target.value)}/>
                                    <div className="label middle-xs">
                                        days
                                    </div>
                                </div>
                                <div className="at">
                                    at
                                </div>
                                <div className="currency-input col-xs">
                                    <div className="label middle-xs">
                                        £
                                    </div>
                                    <input type="number" placeholder="150.00" onChange={(e)=> this.handleSingleChange('price', e.target.value)}/>
                                </div>
                                {/* <ActionDate isMobile={this.props.isMobile} onChangeForParent={this.handleSingleChange}/> */}

                                    {/* <input onClick={this.addClick} className="new new-person" type="button"/> */}
                                    {/* {this.state.userForms} */}
                                    {this.state.newUserForm ?
                                        <div className="newUserForm">
                                            <div className="section-title">
                                               <p>People</p>
                                            </div>
                                            {this.createUserForm()} 
                                        </div>
                                        :

                                        null
                                    }

                                    {this.state.newLocationForm ?
                                        <div className="newUserForm">
                                            <div className="section-title">
                                               <p>Location</p>
                                            </div>
                                            {this.createLocationForm()} 

                                        </div>
                                        :

                                        null
                                    }
                                    {this.state.newSingleDateForm ?
                                        <div className="newUserForm">
                                            <div className="section-title">
                                               <p>Date</p>
                                            </div>
                                            {this.createSingleForm()} 

                                        </div>
                                        :

                                        null
                                    }
                                

                                    {this.state.newRangeDateForm ?
                                        <div className="newUserForm">
                                            <div className="section-title">
                                               <p>Date Range</p>
                                            </div>
                                            {this.createRangeForm()} 

                                        </div>
                                        :

                                        null
                                    }
                                

                            </div>
                                <div className="new-action-tools row">

                                <button onClick={this.handleAddUser} className="add add-user for-input col-xs">
                                    <i className="fas fa-user">+</i><p>Add User</p>
                                </button>
                                
                                <button className="add add-location for-input col-xs" onClick={this.handleAddLocation}>
                                    <i className="fas fa-map-marker-alt"></i><p>Add Location</p>
                                </button>

                                <button className="add add-date-start for-input col-xs" onClick={this.handleAddSingleDate}>
                                    <i className="fas fa-calendar"></i><p>Add Start</p>
                                </button>
                                <button className="add add-date-end for-input col-xs" onClick={this.handleAddRangeDate}>
                                    <i className="fas fa-calendar-alt"></i><p>Add End</p>
                                </button>
                                <div className="for-save col-xs-12">
                                    <div className="total-price">
                                        £{ (this.state.price * this.state.quantity).toFixed(2)}
                                    </div>
                                    <button onClick={this.handleRemove} className="button-content-wrap light">
                                        <i className="fas fa-times"></i><p>Remove</p> 
                                    </button>   
                                    <button onClick={this.handleSubmit} className="button-content-wrap success">
                                        <i className="fas fa-plus"></i><p>Create</p> 
                                    </button>   
                                </div>                             
                            </div>
                            </div>);
    }
    createDateForm(){
        
    }
    handlePersonChange(i, value) {
        let people = [...this.state.people];

        people[i] = value;
        this.setState({ people });
    }
    handlePersonSelected(person,i){
        let existing_people = [...this.state.existing_people];
        existing_people[i] = person;

        this.setState({existing_people});
    }

    handleStartDateChange(value){
        this.setState({start_date:value})
    }
    handleRangeDateChange(type,value){
        this.setState({[type+'_date']:value})
    }
    addPerson(){
        this.setState(prevState => ({ people: [...prevState.people, '']}))
    }
    addLocation(){
        this.setState({'location':{
            ['line1']:undefined,
            ['line2']: undefined,
            ['line3']: undefined,
            ['line4']: undefined,
            ['postcode']: undefined,

        }});
    }
    handleLocationChange(values,i){
        let locations = this.state.location
        if(i === undefined){

            locations.line1 = values.line1
            locations.line2 = values.line2
            locations.line3 = values.line3
            locations.line4 = values.line4
            locations.postcode = values.postcode
            locations.id    = values.id
            this.setState({location:locations})
        }else{
            locations[[i]] = values;
            this.setState({location:locations})
        }

    }
    handleRemoveLocation(){
        this.setState({newLocationForm:false,location:undefined})
        
    }

    handleDescriptionChange(i,value){
        this.setState({description:value,formActive:true});
    }
    handleSingleChange(property,value){
        this.setState({ [property]:value})
    }
    removeNewPerson(i){
        let people = [...this.state.people];
        let existing_people = [...this.state.existing_people];
        existing_people.splice(i,1);
        people.splice(i,1);
        this.setState({ people, existing_people });
        if(people.length < 1){
            this.setState({newUserForm:false});
        }
    }
    handleRemoveDate(date_type){
        let form = ""
        // newState[(date_type)+'_date'] =undefined
        if(date_type=='start'){
            form = "newSingleDateForm"
        }else{
            form = "newRangeDateForm";
        }
        this.setState({start_date:undefined,end_date:undefined,[form]:false})
    }
    constructFormJSON(){
        let data = {}
            data['manual_entrance_people'] = this.state.people;
            data['existing_people'] = this.state.existing_people;
            data['description'] = this.state.description;
            data['quantity'] = this.state.quantity;
            data['price'] = this.state.price;
            data['start_date'] = this.state.start_date
            data['end_date'] = this.state.end_date
            data['location'] = this.state.location

        return data;
    }
    handleRemove(){
        this.notify("New Action cancelled");
        this.setState({formActive:false});
    }
    handleSubmit(event) {

        event.preventDefault();
         axios.post(this.props.src.url + 'actions/', this.constructFormJSON())
             .then(function (response) {
                 let data = response.data;
                 console.log(data);
             })
             .catch(function (error) {
             })
             .then(function () {
                 // always executed
             });

    }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//           {this.createUI()}        
//           <input type='button' value='add more' />
//           <input type="submit" value="Submit" />
//       </form>
//     );
//   }
    render(){
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){
            // return(
            //     <div className="actionBox isMobile row">
            //     </div>
            // )
        }
        // console.log("renrender triggered");
        return(
                <div className="actionBox col-md-12">
                    <div className="row">
                        {/* <div className="col-xs-12 profile-icon middle-xs">
                            <i className="fas fa-fire"></i> <p>New Action</p>
                        </div> */}
                        <div className="new-action col-xs">

                            {this.state.isLoaded && <ActionPerson 
                                                        className="description-box" 
                                                        renderComponent={'textarea'} 
                                                        value={1}  
                                                        id={1} 
                                                        src={this.state.suggestData}
                                                        debug={false} 
                                                        onChangeForParent={this.handleDescriptionChange} 
                                                        placeholder="Raising crowns over stonewalls and fencelines"/>}
                            {this.state.formActive ?
                                
                                this.createForm() 

                                :

                                null
                            }

                           
                        </div>
                    </div>
                </div>

        )
    }
}
export default ActionBox;
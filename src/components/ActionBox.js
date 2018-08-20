import React, { Component } from 'react';
// import { ActionDate } from './ActionDate';
import { ActionPerson } from './ActionPerson';
import { ActionLocation } from './ActionLocation';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import { SingleDateInput } from './SingleDateInput';
import { RangeDateInput } from './RangeDateInput';

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
                description: '',
                quantity: '',
                price: '',
                start_date: new Date(),
                end_date: undefined,

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

            return(<div key={i} className="row">
                <ActionPerson assigned={el} className="col-xs-6" id={i} src={'languages'} onChangeForParent={this.handlePersonChange.bind(this)} debug={true}/>
                {/* <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} /> */}
                {this.state.people.length < 1 ? <div><p>Add a new person</p></div> : null}
                <button className="button-remove col-xs" onClick={() => this.removeNewPerson(i)}><i className="fas fa-times"></i></button>
            </div> );         
            })
    }

    createLocationForm(){
        return(<ActionLocation onChangeForParent={this.handleLocationChange.bind(this)} values={this.state.location}>
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

            locations.line1 = values[0]
            locations.line2 = values[1]
            locations.line3 = values[2]
            locations.line4 = values[3]
            locations.postcode = values[4]
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

        people.splice(i,1);
        this.setState({ people });
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
            data['people'] = this.state.people;
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
        console.log(this.constructFormJSON());
        event.preventDefault();
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

                            <ActionPerson className="description-box" renderComponent={'textarea'} value={1}  id={1} src={'autocomplete'} debug={true} onChangeForParent={this.handleDescriptionChange} placeholder="Raising crowns over stonewalls and fencelines"/>
                            {this.state.formActive ?
                                
                                this.createForm() 

                                :

                                null
                            }
                            {/* </textarea> */}
                           
                        </div>
                    </div>
                </div>

        )
    }
}
export default ActionBox;
import React, { Component } from 'react';
import { ActionDate } from './ActionDate';
import { ActionPerson } from './ActionPerson';
import { ActionLocation } from './ActionLocation';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';

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
                userForms: [],
                people: [],
                description: '',
                quantity: '',
                price: '',
                date: moment(),


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

    createUserForm(){
        return this.state.people.map((el, i) =>  {
            return(<div key={i} className="row">
                <ActionPerson value={el} className="col-xs-6" id={i} src={'languages'} onChangeForParent={this.handlePersonChange.bind(this)} debug={true}/>
                {/* <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} /> */}
                {this.state.people.length < 1 ? <div><p>Add a new person</p></div> : null}
                <button className="button-remove col-xs" onClick={() => this.removeNewPerson(i)}><i className="fas fa-times"></i></button>
            </div> );         
            })
    }

    createLocationForm(){
        return(<ActionLocation onChangeForParent={this.handleLocationChange.bind(this)} values={this.state.location}/>)
    }
    handlePersonChange(i, value) {
        let people = [...this.state.people];
        people[i] = value;
        this.setState({ people });
    }
    
    addPerson(){
        this.setState(prevState => ({ people: [...prevState.people, '']}))
    }
    addLocation(){
        this.setState({'location':Array(4)});
    }
    handleLocationChange(i,value){
        let locations = [...this.state.location]
        locations[i] = value;
        this.setState({location:locations})
    }
    handleDescriptionChange(i,value){
        this.setState({description:value});
    }
    handleSingleChange(property,value){
        this.setState({ [property]:value})
    }
    removeNewPerson(i){
        console.log(i)
        let people = [...this.state.people];
        console.log(people);
        people.splice(i,1);
        console.log(people);        
        this.setState({ people });
    }

    constructFormJSON(){
        let data = {}
            data['people'] = this.state.people;
            data['description'] = this.state.description;
            data['quantity'] = this.state.quantity;
            data['price'] = this.state.price;
            data['date'] = this.state.date.format("YYYY-MM-DD HH:mm:ss");
        return data;
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
                        <div className="col-xs-12 profile-icon middle-xs">
                            <i className="fas fa-fire"></i> <p>New Action</p>
                        </div>
                        <div className="new-action col-xs">

                            <ActionPerson renderComponent={'textarea'} value={1}  id={1} src={'autocomplete'} debug={true} onChangeForParent={this.handleDescriptionChange} placeholder="Raising crowns over stonewalls and fencelines"/>

                            {/* </textarea> */}
                            <div className="row inputs">
                                <ActionDate isMobile={this.props.isMobile} onChangeForParent={this.handleSingleChange}/>
                                <div className="days-input col-xs">
                                    <input type="number" placeholder="2"  onChange={(e)=> this.handleSingleChange('quantity', e.target.value)}/>
                                    <div className="label middle-xs">
                                        days
                                    </div>
                                </div>
                                <div class="at">
                                    at
                                </div>
                                <div className="currency-input col-xs">
                                    <div className="label middle-xs">
                                        £
                                    </div>
                                    <input type="number" placeholder="150.00" onChange={(e)=> this.handleSingleChange('price', e.target.value)}/>
                                </div>

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
                                

                            </div>
                                <div className="new-action-tools">

                                <button onClick={this.handleAddUser} className="add add-user for-input">
                                    <i className="fas fa-user">+</i>     
                                </button>
                                
                                <button className="add add-location for-input" onClick={this.handleAddLocation}>
                                    <i className="fas fa-map-marker"></i>
                                </button>
                                <button className="for-save">
                                    <div className="total-price">
                                        £{ (this.state.price * this.state.quantity).toFixed(2)}
                                    </div>
                                    <div onClick={this.handleSubmit}className="button-content-wrap">
                                        <i className="fas fa-plus"></i><p>Create</p> 
                                    </div>   
                                </button>                             

                            </div>
                        </div>
                    </div>
                </div>

        )
    }
}
export default ActionBox;
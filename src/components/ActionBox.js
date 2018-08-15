import React, { Component } from 'react';
import { ActionDate } from './ActionDate';
import { ActionPerson } from './ActionPerson';
import { ActionLocation } from './ActionLocation';

export class ActionBox extends Component{
    constructor(props) {
        super(props);
            this.state ={
                newUserForm:false,
                newLocationForm: false,
                userForms: [],
                values: [],
                description: '',
                quantity: '',
                price: '',
                date: '',


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
            this.handleSingleChange = this.handleSingleChange.bind(this);
    }

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
        return this.state.values.map((el, i) =>  {
            return(<div key={i} className="row">
                <ActionPerson value={el} className="col-xs-6" id={i} src={'languages'} onChangeForParent={this.handlePersonChange.bind(this)} debug={true}/>
                {/* <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} /> */}
                {this.state.values.length < 1 ? <div><p>Add a new person</p></div> : null}
                <button className="button-remove col-xs" onClick={() => this.removeNewPerson(i)}><i className="fas fa-times"></i></button>
            </div> );         
            })
    }

    createLocationForm(){
        return(<ActionLocation onChangeForParent={this.handleLocationChange.bind(this)} values={this.state.location}/>)
    }
    handlePersonChange(i, value) {
        let values = [...this.state.values];
        values[i] = value;
        this.setState({ values });
    }
    
    addPerson(){
        this.setState(prevState => ({ values: [...prevState.values, '']}))
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
        console.log("Property, value");
        console.log(property);
        console.log(value);
        this.setState({ [property]:value})
    }
    removeNewPerson(i){
        console.log(i)
        let values = [...this.state.values];
        console.log(values);
        values.splice(i,1);
        console.log(values);        
        this.setState({ values });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.values.join(', '));
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
                                    <div className="button-content-wrap">
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
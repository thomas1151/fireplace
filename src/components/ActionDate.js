import 'react-dates/initialize';

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export class ActionDate extends Component{
    constructor(props) {
        super(props);

            this.state = {
                startDate: moment()
            };
        this.handleChange = this.handleChange.bind(this);
        }

        handleChange(date) {
            this.setState({
                startDate: date
            });
            this.props.onChangeForParent('date',this.state.startDate);
        }
    render(){
        const { focused, date } = this.state;

        // autoFocus and initialDate are helper props for the example wrapper but are not
        // props on the SingleDatePicker itself and thus, have to be omitted.
        const props = this.props;
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){
            return(
                <input type="date"/>
            )
        }
        return(

            <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    dateFormat = "DD/MM/YY"
                    className="datePickerWrapper"
                    />
            

        )
    }
}





export default ActionDate;
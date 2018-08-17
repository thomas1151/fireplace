import 'react-dates/initialize';

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {RangeDateInput} from './RangeDateInput';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox } from './Checkbox';

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
        // if(this.props.)
        // autoFocus and initialDate are helper props for the example wrapper but are not
        // props on the SingleDatePicker itself and thus, have to be omitted.
        const props = this.props;
        let bg =this.props.backgroundColor;
        if(this.props.isMobile){
            return(
                <div className="dates col-xs-6 row">
                    <div className="from col-xs">
                        <label>From</label>
                        <div className="datePicker-wrapper">
                            {/* <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    dateFormat = "DD/MM/YY"
                                    className="datePickerWrapper"
                                    /> */}
                                    <RangeDateInput/>
                        </div>
                    </div>
                    <div className="to col-xs">
                        <label>To</label>
                        <div className="datePicker-wrapper">
                            <Checkbox className="left-curve-border"/>
                            {/* <input type="checkbox" className="custom-checkbox"/> */}
                            <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            dateFormat = "DD/MM/YY"
                            className="datePickerWrapper"
                            />
                        </div>
                    </div>
                </div>            
            )
        }

        return(

            <div className="dates col-xs-6 row">
                <div className="from col-xs">
                    <label>From</label>
                    <div className="datePicker-wrapper">
                        {/* <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                dateFormat = "DD/MM/YY"
                                className="datePickerWrapper"
                                /> */}
                        {/* <DayPickerInput/> */}
                                    <RangeDateInput/>

                    </div>
                </div>

            </div>

        )
    }
}





export default ActionDate;
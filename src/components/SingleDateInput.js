import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate } from 'react-day-picker/moment';

export class SingleDateInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: this.handleStartPredefined(),
    };
  }
  handleStartPredefined(){
    let d = undefined;
    if (this.props.start_date) {
      d = this.props.start_date;
    }
    return d;
  }
  handleDayChange(day) {
    this.setState({ selectedDay: day });
    this.props.onChangeForParent(day);
  }
  render() {
    let inputProps  = {}
    if(this.props.isMobile){
          inputProps={ readOnly: true }
    }
    return (
      <div>
        <DayPickerInput value={this.state.selectedDay} onDayChange={this.handleDayChange} 
            inputProps={inputProps}
            formatDate={formatDate}
            format={"DD/MM/YY"}
            dayPickerProps={{
              selectedDays: this.state.selectedDay,
              numberOfMonths: 1,
            }}/>
      </div>
    );
  }
}
export default SingleDateInput
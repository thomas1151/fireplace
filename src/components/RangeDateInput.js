import React from 'react';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


import { formatDate, parseDate } from 'react-day-picker/moment';

export class RangeDateInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    
    this.state = {
      from: this.handleStartPredefined(),
      to: this.handleEndPredefined(),
    };
  }
  handleStartPredefined(){
    let d = undefined;
    if (this.props.start_date) {
      d = this.props.start_date;
    }
    return d;
  }
  handleEndPredefined(){
    let d = undefined;
      if (this.props.end_date) {
        d = this.props.end_date;
      }
    return d;
  }
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    this.props.onChangeForParent('start', from)
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    this.props.onChangeForParent('end',to)
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    let inputProps={ readOnly: true }
    // let inputProps  = {}
    // if(this.props.isMobile){
    // }
    return (
      <div className="InputFromTo col-xs-10 row">
        <DayPickerInput
          value={from}
          inputProps={inputProps}

          placeholder="From"
          classNames={ {container:"col-xs-12 col-sm-5",overlayWrapper:"DayPickerInput-OverlayWrapper",overlay:"DayPickerInput-Overlay"} }
          format="DD/MM/YY"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 1,
            onDayClick: () => this.to.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
        />
        <span className="InputFromTo-to col-xs middle-xs">
        {' '}
        —{' '}
        </span>
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            inputProps={inputProps}

            placeholder="To"
            classNames={ {container:"col-xs-12 col-sm-5",overlayWrapper:"DayPickerInput-OverlayWrapper",overlay:"DayPickerInput-Overlay"} }
            format="DD/MM/YY"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{

              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
            }}
            onDayChange={this.handleToChange}
          />
      </div>
    );
  }
}
export default RangeDateInput;  
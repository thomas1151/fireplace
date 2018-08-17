
import React, {
    Component
} from 'react';
import moment from 'moment';
import {ActionPerson} from './ActionPerson';

export class ActionLocation extends Component {
    constructor(props) {
        super(props);
        this.handleLocationAutofill = this.handleLocationAutofill.bind(this);
        this.onChangeForParent = this.onChangeForParent.bind(this);
        this.state ={
            line1:undefined,
            line2:undefined,
            line3:undefined,
            line4:undefined,
            postcode:undefined,
        }
    }
    handleLocationAutofill(s){
        let a = []
        s.suggestion.data.map((d, i) => { 
            a[[d[0]]] = d[1];
        })
        this.setState({...a});
        this.props.onChangeForParent(Object.values(a))
    }
    onChangeForParent(i, value) {
        const { l1,l2,l3,l4,postcode } = this.state;
        this.setState({[i]:value})

        this.props.onChangeForParent(value, i);

    }

    render() {

        // autoFocus and initialDate are helper props for the example wrapper but are not
        // props on the SingleDatePicker itself and thus, have to be omitted.
        const props = this.props;
        let bg = this.props.backgroundColor;
        if (this.props.isMobile) {

        }
        return (
            <div className="address row">
                <div className="col-xs-6 address-1 input-wrap ">
                    <ActionPerson value={'line1'}  id={'line1'} src={'address'} debug={true} onSelectedForParent={this.handleLocationAutofill} onChangeForParent={this.onChangeForParent} placeholder="Line 1"/>
                </div>

                <div className="col-xs-6 address-2 input-wrap">
                    <ActionPerson assigned={this.state.line2}   value={'line2'}   id={'line2'}  src={'address'} debug={true} onChangeForParent={this.onChangeForParent} placeholder="Line 2"/>
                </div>
                
                <div className="col-xs-6 address-3 input-wrap">
                    <ActionPerson assigned={this.state.line3}  value={'line3'}   id={'line3'}  src={'address'} debug={true} onChangeForParent={this.onChangeForParent} placeholder="Line 3"/>
                </div>
                
                <div className="col-xs-6 address-4 input-wrap">
                    <ActionPerson assigned={this.state.line4}  value={'line4'}   id={'line4'}  src={'address'} debug={true} onChangeForParent={this.onChangeForParent} placeholder="Line 4"/>
                </div>
                
                <div className="col-xs-6 address-postcode input-wrap">
                    <ActionPerson assigned={this.state.postcode}  value={'postcode'}id={'postcode'}  src={'address'} debug={true} onChangeForParent={this.onChangeForParent} placeholder="Postcode"/>
                </div>
                {this.props.children}
            </div>
        )
    }
}





export default ActionLocation;
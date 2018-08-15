
import React, {
    Component
} from 'react';
import moment from 'moment';
import {ActionPerson} from './ActionPerson';

export class ActionLocation extends Component {
    constructor(props) {
        super(props);

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
                    <ActionPerson value={0}  id={0} src={'address'} debug={true} onChangeForParent={this.props.onChangeForParent} placeholder="Line 1"/>
                </div>

                <div className="col-xs-6 address-2 input-wrap">
                    <ActionPerson value={1}  id={1} src={'address'} debug={true} onChangeForParent={this.props.onChangeForParent} placeholder="Line 2"/>
                </div>
                
                <div className="col-xs-6 address-3 input-wrap">
                    <ActionPerson value={2}  id={2} src={'address'} debug={true} onChangeForParent={this.props.onChangeForParent} placeholder="Line 3"/>
                </div>
                
                <div className="col-xs-6 address-4 input-wrap">
                    <ActionPerson value={3}  id={3} src={'address'} debug={true} onChangeForParent={this.props.onChangeForParent} placeholder="Line 4"/>
                </div>
                
                <div className="col-xs-6 address-postcode input-wrap">
                    <ActionPerson value={4}  id={4} src={'address'} debug={true} onChangeForParent={this.props.onChangeForParent} placeholder="Postcode"/>
                </div>
                
            </div>
        )
    }
}





export default ActionLocation;
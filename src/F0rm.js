import React from 'react';

import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
// form control
import { FormControl } from 'react-bootstrap';

export default React.createClass({
  propTypes: {
    fieldsModel: React.PropTypes.array.isRequired,
    defaultData: React.PropTypes.object,
    onChange: React.PropTypes.func
  },
  getInitialState() {
    return {
      formData: this.props.defaultData
    };
  },

  getValidationState(id) {
    const length = this.state.formData[id].length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange(id, e) {
    const newState = {
      formData: this.state.formData
    };
    newState.formData[id] = e.target.value;
    this.setState(newState);
    this.props.onChange(e, id);
  },

  render() {
    return (
      <form>
      {
        this.props.fieldsModel.map((fieldModel, index) => {
          return (
            <FormGroup
              key={index}
              controlId="formBasicText"
              validationState={this.getValidationState(fieldModel.id)}
            >
              <ControlLabel>Working example with validation</ControlLabel>
              <FormControl
                type="text"
                value={this.state.formData[fieldModel.id]}
                placeholder="Enter text"
                onChange={this.handleChange.bind(this, fieldModel.id)}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
          );
        })
      }
      </form>
    );
  }
});

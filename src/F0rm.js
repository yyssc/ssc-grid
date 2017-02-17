import classNames from 'classnames';
import React, { PropTypes } from 'react';

import { Button, FormGroup, ControlLabel } from 'react-bootstrap';

// form control
import { FormControl } from 'react-bootstrap';

export default React.createClass({
  propTypes: {
    fieldsModel: PropTypes.array.isRequired,
    defaultData: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func
  },
  getInitialState() {
    return {
      formData: {...this.props.defaultData}
    };
  },

  handleChange(id, e) {
    const newState = {
      formData: this.state.formData
    };
    newState.formData[id] = e.target.value;
    this.setState(newState);
    this.props.onChange(e, id);
  },

  handleSubmit(event) {
    if (this.props.onSubmit) {
      this.props.onSubmit(event, this.state.formData);
    }
  },

  handleReset(event) {
    if (this.props.onReset) {
      this.props.onReset(event);
    }
  },

  render() {
    const { fieldsModel, className } = this.props;
    return (
      <form className={classNames(className)}>
        {
          fieldsModel.map((fieldModel, index) => {
            let formCtrl;
            switch(fieldModel.type) {
              default:
              case 'string': // 0
              case 'double': // 2
              case 'ref': // 5
              case 'enum': // 6
                formCtrl = (
                  <FormControl
                    type="text"
                    value={this.state.formData[fieldModel.id]}
                    placeholder={fieldModel.placeholder}
                    onChange={this.handleChange.bind(this, fieldModel.id)}
                  />
                );
                break;
              // case 'date': // 3
              //   formCtrl = (
              //     <DatePicker
              //       id={id}
              //       value={this.state.datePickerValue}
              //       onChange={this.handleDatePickerChange.bind(this)}
              //     />
              //   );
              //   break;
              case 'boolean': // 4
                formCtrl = (
                  <Checkbox checked={this.state.formData[fieldModel.id]}
                    onChange={this.handleChange.bind(this, fieldModel.id)}
                  />
                );
                break;
            }
            return (
              <FormGroup
                key={index}
                controlId={`formBasicText-${fieldModel.id}`}
              >
                <ControlLabel>{fieldModel.label}</ControlLabel>
                {formCtrl}
                <FormControl.Feedback />
              </FormGroup>
            );
          })
        }
        <Button onClick={this.handleSubmit} type="submit">保存</Button>
        <Button onClick={this.handleReset} type="reset">清空</Button>
      </form>
    );
  }
});

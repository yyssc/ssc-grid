import classNames from 'classnames';
import React, { PropTypes } from 'react';

import { Button, FormGroup, ControlLabel } from 'react-bootstrap';

/**
 * 控件(control/widget)分类
 * Command input: Button, Drop-down list, ...
 * Data input-output: Checkbox Color picker Combo box Cycle button Date Picker Grid view List box List builder Radio button Scrollbar Search box Slider Spinner Text box
 * 来源：https://en.wikipedia.org/wiki/Widget_(GUI)
 */

// 表单(form)控件(control/widget)
import { FormControl, Checkbox } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

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

  handleChange(fieldId, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    const newState = {
      formData: this.state.formData
    };
    newState.formData[fieldId] = value;
    this.setState(newState);

    this.props.onChange(event, fieldId);
  },

  handleDatePickerChange(/* fieldId, value, formattedValue */) {
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
            const { id, type, label, placeholder } = fieldModel;
            let formCtrl;
            switch (type) {
              default:
              case 'string': // 0
              case 'double': // 2
              case 'ref': // 5
              case 'enum': // 6
                formCtrl = (
                  <FormControl
                    type="text"
                    value={this.state.formData[id]}
                    placeholder={placeholder}
                    onChange={this.handleChange.bind(this, id)}
                  />
                );
                break;
              case 'date': // 3
                formCtrl = (
                  <DatePicker
                    value={this.state.formData[id]}
                    onChange={this.handleDatePickerChange.bind(this, id)}
                  />
                );
                break;
              case 'boolean': // 4
                formCtrl = (
                  <Checkbox checked={this.state.formData[id]}
                    onChange={this.handleChange.bind(this, id)}
                  />
                );
                break;
            }
            return (
              <FormGroup
                key={index}
                controlId={`formControl-${id}`}
              >
                <ControlLabel>{label}</ControlLabel>
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

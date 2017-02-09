import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

export default class Form extends Component {
  static propTypes = {
    /**
     * 表单中的数据
     */
    formDefaultData: PropTypes.array.isRequired,
    /**
     * 光标离开文本框时候调用该函数
     */
    onBlur: PropTypes.func,
    /**
     * 点击提交时候调用该函数
     */
    onSubmit: PropTypes.func
  };

  state = {
    datePickerValue: '',
    datePickerFormattedValue: ''
  };

  constructor(props) {
    super(props);
  }

  getValidationState() {
    // return 'error';
    // return 'warning';
    return 'success';
  }

  // Performance issue?
  // http://stackoverflow.com/questions/33266156/react-redux-input-onchange-is-very-slow-when-typing-in-when-the-input-have-a
  handleBlur(label, event) {
    if (this.props.onBlur) {
      this.props.onBlur(label, event.target.value);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  handleReset() {
  }

  // TODO: 支持多DatePicker
  handleDatePickerChange(value, formattedValue) {
    this.setState({
      datePickerValue: value,
      detePickerFormattedValue: formattedValue
    });
  }

  render() {
    const { formDefaultData, className } = this.props;

    const FieldGroup = ({ key, id, type, label, help, fieldModel, ...props }) => {
      let field, formCtrl;

      // 根据字段类型，生成不同的UI组件
      switch (type) {
        // string为默认字段类型
        default:
        case 'string':
          formCtrl = (<FormControl {...props} />);
          break;
        case 'date':
          formCtrl = (
            <DatePicker
              id={id}
              value={this.state.datePickerValue}
              onChange={this.handleDatePickerChange.bind(this)}
            />
          );
          break;
        case 'money':
          formCtrl = (<FormControl {...props} />);
          break;
        case 'combo':
          const { cols, placeholder } = fieldModel;
          formCtrl = (
            <FormControl componentClass="select" placeholder={placeholder && '请选择'}>
              {cols.map(opt => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
            </FormControl>
          );
          break;
      }

      field = (
        <FormGroup key={key} controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          {formCtrl}
          {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      );
      return field;
    };

    return (
      <div className={classNames(className)}>
        <form>
          {formDefaultData.map(col =>
            <FieldGroup
              key={col.label}
              id={`formControls-${col.label}`}
              type={col.type}
              label={col.label}
              placeholder="Enter text"
              defaultValue={col.value}
              fieldModel={col}
              onBlur={this.handleBlur.bind(this, col.label)}
            />
          )}
          <Button onClick={this.handleSubmit.bind(this)} type="submit">保存</Button>
          <Button onClick={this.handleReset.bind(this)} type="reset">清空</Button>
        </form>
      </div>
    );
  }
}

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
    datePickerFormattedValue: '',
    formData: this.props.formDefaultData
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
  handleBlur(idx, event) {
    if (this.props.onBlur) {
      const { formData } = this.state;
      formData[idx].value = event.target.value;
      this.setState({ formData });
      this.props.onBlur(idx, event.target.value);
    }
  }

  handleSelectChange(fieldIdx, event) {
    const { formData } = this.state;
    formData[fieldIdx].value = event.target.value;
    this.setState({ formData });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(event, this.state.formData);
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

    // idx是field index，从0开始
    const FieldGroup = ({ id, idx, label, help, fieldModel, ...props }) => {
      let field, formCtrl;
      const { key } = fieldModel;

      // 根据字段类型，生成不同的UI组件
      switch (key) {
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
        case 'double':
          formCtrl = (<FormControl {...props} />);
          break;
        case 'enum':
          const { data, placeholder } = fieldModel;
          formCtrl = (
            <FormControl componentClass="select" placeholder={placeholder && '请选择'}
              value={this.state.formData[idx].value}
              onChange={this.handleSelectChange.bind(this, idx)}
            >
              {data.map(opt => <option key={opt.key} value={opt.key}>{opt.value}</option>)}
            </FormControl>
          );
          break;
      }

      field = (
        <FormGroup key={label} controlId={id}>
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
          {formDefaultData.map((col, idx) =>
            <FieldGroup
              key={col.label}
              idx={idx}
              id={`formControls-${col.label}`}
              label={col.label}
              placeholder="请输入"
              defaultValue={col.value}
              fieldModel={col}
              onBlur={this.handleBlur.bind(this, idx)}
            />
          )}
          <Button onClick={this.handleSubmit.bind(this)} type="submit">保存</Button>
          <Button onClick={this.handleReset.bind(this)} type="reset">清空</Button>
        </form>
      </div>
    );
  }
}

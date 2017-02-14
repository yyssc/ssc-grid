import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';

import { Button, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
// form control
import { FormControl, Checkbox } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

export default class Form extends Component {
  static propTypes = {
    /**
     * 表单中的数据
     */
    fieldsModel: PropTypes.array.isRequired,
    /**
     * 填充表单值
     */
    defaultData: PropTypes.object,
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
    formData: this.props.defaultData
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
  handleBlur(idx, fieldModel, event) {
    if (this.props.onBlur) {
      const { formData } = this.state;
      formData[this.props.fieldsModel[idx].id] = event.target.value;
      this.setState({ formData });
      this.props.onBlur(idx, fieldModel, event.target.value);
    }
  }

  // simple form control包括：input, select, checkbox
  handleSimpleFormCtrlChange(fieldIdx, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    // 根据字段的index，只更新指定字段的值
    const newState = update(this.state, {
      formData: {
        [this.props.fieldsModel[fieldIdx].id]: {
          $set: value
        }
      }
    });
    this.setState(newState);
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
    const { fieldsModel, className } = this.props;

    // idx是field index，从0开始
    const FieldGroup = ({ id, idx, label, help, fieldModel, ...props }) => {
      let field, formCtrl;
      const { type } = fieldModel;

      // 根据字段类型，生成不同的UI组件
      // 每个类型后面跟着的数字是后端传过来的datatype
      switch (type) {
        // string为默认字段类型
        default:
        case 'string': // 0
          formCtrl = (<FormControl {...props} />);
          break;
        case 'double': // 2
          formCtrl = (<FormControl {...props} />);
          break;
        case 'date': // 3
          formCtrl = (
            <DatePicker
              id={id}
              value={this.state.datePickerValue}
              onChange={this.handleDatePickerChange.bind(this)}
            />
          );
          break;
        case 'boolean': // 4
          formCtrl = (
            <Checkbox checked={this.state.formData[fieldModel.id]}
              onChange={this.handleSimpleFormCtrlChange.bind(this, idx)}
            />
          );
          break;
        case 'ref': // 5
          formCtrl = (<FormControl {...props} />);
          break;
        case 'enum': // 6
          const { data, placeholder } = fieldModel;
          formCtrl = (
            <FormControl componentClass="select" placeholder={placeholder && '请选择'}
              value={this.state.formData[fieldModel.id] || null}
              onChange={this.handleSimpleFormCtrlChange.bind(this, idx)}
            >
              {data.map(opt => <option key={opt.key} value={opt.key}>{opt.value}</option>)}
            </FormControl>
          );
          break;
      }

      field = (
        <FormGroup key={idx} controlId={id}>
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
          {fieldsModel.map((fieldModel, idx) =>
            <FieldGroup
              key={idx}
              idx={idx}
              id={`formControls-${fieldModel.id}`}
              label={fieldModel.label}
              placeholder="请输入"
              defaultValue={this.state.formData[fieldModel.id]}
              fieldModel={fieldModel}
              onBlur={this.handleBlur.bind(this, idx, fieldModel)}
            />
          )}
          <Button onClick={this.handleSubmit.bind(this)} type="submit">保存</Button>
          <Button onClick={this.handleReset.bind(this)} type="reset">清空</Button>
        </form>
      </div>
    );
  }
}

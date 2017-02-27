import React, { Component, PropTypes } from 'react';

// 表单(form)控件(control/widget)
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

import validator from 'validator';

/**
 * 控件(control/widget)分类
 * Command input: Button, Drop-down list, ...
 * Data input-output: Checkbox Color picker Combo box Cycle button Date Picker Grid view List box List builder Radio button Scrollbar Search box Slider Spinner Text box
 * 来源：https://en.wikipedia.org/wiki/Widget_(GUI)
 * 第二来源：https://docs.joomla.org/Standard_form_field_types
 * Joomla的名称和Web更贴切，wikipedia不区分Web还是Client
 */

/**
 * 文本框控件
 */
export default class TextField extends Component {
  static propTypes = {
    /**
     * 文本框中显示的值
     */
    value: PropTypes.string,
    /**
     * 文本框占位字符
     */
    placeholder: PropTypes.string,
    /**
     * 校验类型，比如<code>email</code>
     */
    validationType: PropTypes.string,
    /**
     * 当文本框内容被修改时候调用
     */
    onChange: PropTypes.func
  };

  state = {
    value: this.props.value || ''
  };

  constructor(props) {
    super(props);
  }

  // 返回值应该是'success', 'warning'或者'error'
  getValidationState() {
    const { validationType } = this.props;
    const { value } = this.state;
    if (validationType === 'email') {
      return validator.isEmail(value) ? 'success' : 'error';
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const { validationType } = this.props;
    let textField;
    if (validationType) {
      textField = (
        <FormGroup validationState={this.getValidationState()}>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
          <HelpBlock>Help text with validation state.</HelpBlock>
        </FormGroup>
      );
    } else {
      textField = (
        <FormControl
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.handleChange.bind(this)}
        />
      );
    }
    return textField;
  }
}

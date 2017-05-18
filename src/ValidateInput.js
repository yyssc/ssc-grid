import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

import * as validationUtils from './utils/validation';

/**
 * 控件(control/widget)分类
 * Command input: Button, Drop-down list, ...
 * Data input-output: Checkbox Color picker Combo box Cycle button Date Picker Grid view List box List builder Radio button Scrollbar Search box Slider Spinner Text box
 * 来源：https://en.wikipedia.org/wiki/Widget_(GUI)
 * 第二来源：https://docs.joomla.org/Standard_form_field_types
 * Joomla的名称和Web更贴切，wikipedia不区分Web还是Client
 */

import TextField from './TextField';

/**
 * 带有校验功能的文本框控件
 */
export default class ValidateInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      /**
       * 帮助信息文本
       * @type {String}
       */
      helpText: '',
      /**
       * Set validationState to one of 'success', 'warning' or 'error' to show
       * validation state. Set validationState to null (or undefined) to hide
       * validation state
       * @type {String}
       */
      validationState: null,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  /**
   * @param {Object} nextProps
   */
  componentWillReceiveProps() {
  }

  // 提供父组件可以清空校验状态
  reset() {
    this.setState({
      helpText: '',
      validationState: null,
    });
  }

  /**
   * 父级组件主动校验
   * @return {booean} 校验成功还是失败
   */
  doValidate() {
    return this.setValidationState(this.textFieldRef.state.value);
  }

  /**
   * 校验状态并设置组件状态
   * @param {String} value 文本框内的值
   * @return {boolean} 校验成功还是失败
   */
  setValidationState(value) {
    const {
      validationState,
      helpText
    } = validationUtils.calcValidationState(value, this.props.validators);
    this.setState({ helpText, validationState });
    return validationState === 'success';
  }

  handleBlur(event) {
    const { value } = event.target;
    this.setValidationState(value);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleChange(event) {
    const { value } = event.target;

    // this.setState({ value });
    this.setValidationState(value);

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleFocus(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  render() {
    return (
      <FormGroup
        controlId={this.props.controlId}
        validationState={this.state.validationState}
      >
        <TextField
          ref={(c) => this.textFieldRef = c}
          value={this.props.value}
          disabled={this.props.disabled}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        <FormControl.Feedback />
        <HelpBlock>{this.state.helpText}</HelpBlock>
      </FormGroup>
    );
  }
}

ValidateInput.propTypes = {
  /**
   *  To ensure accessibility, set controlId on <FormGroup>
   *  https://react-bootstrap.github.io/components.html#forms
   */
  controlId: PropTypes.string,
  /**
   * 是否禁用输入框
   */
  disabled: PropTypes.bool,
  /**
   * 当光标离开输入框
   */
  onBlur: PropTypes.func,
  /**
   * 当文本框内容被修改时候调用
   */
  onChange: PropTypes.func,
  /**
   * 当文本框被聚焦
   */
  onFocus: PropTypes.func,
  /**
   * 文本框占位字符
   */
  placeholder: PropTypes.string,
  /**
   * 带有校验功能的输入框
   */
  validators: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
  })).isRequired,
  /**
   * 文本框中显示的值
   */
  value: PropTypes.string,
};

ValidateInput.defaultProps = {
  value: ''
};

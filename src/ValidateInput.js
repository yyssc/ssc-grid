import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

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

const propTypes = {
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
   * 场景1：使用内置校验（定义在`src/utils/validation.js`）
   * 比如`email`为校验邮件地址格式
   * ```js
   * {
   *   type: 'email'
   * }
   * ```
   * `type`可以是：
   * - `currency` 货币金额格式
   * - `decimal` 十进制数字格式
   * - `email` 电子邮件格式
   * - `int` 整数类型
   * - `length` 输入文本的长度
   * - `mobilePhone` 手机号码格式，比如18911112222
   * - `required` 必输字段
   * 场景2：使用自定义校验
   * 比如校验用户输入数字的范围
   * ```js
   * {
   *   type: 'custom',
   *   matchFunc: (value, validator) => parseInt(value, 10) <= 100 && parseInt(value, 10) >= 0,
   *   helpText: (value, validator) => '残值率不能大于100%，小于0%'
   * }
   * ```
   * 回调函数`matchFunc(string, Object) => boolean`用于对文本框中的文字进行校验，返回false则校验失败，显示`helpText`定义的错误信息
   * 回调函数`helpText(string, Object) => string`用于显示校验错误时候的错误提示信息
   */
  validators: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        type: PropTypes.oneOf(['currency', 'decimal', 'email', 'int', 'mobilePhone', 'required']).isRequired,
      }),
      PropTypes.shape({
        type: PropTypes.oneOf(['length']).isRequired,
        options: PropTypes.shape({
          min: PropTypes.number.isRequired,
          max: PropTypes.number.isRequired,
        }),
      }),
      PropTypes.shape({
        type: PropTypes.oneOf(['custom']),
        matchFunc: PropTypes.func.isRequired,
        helpText: PropTypes.func.isRequired,
      })
    ])
  ).isRequired,
  /**
   * 文本框中显示的值
   * 注意：由于文本框是完全自由输入的，所以value的类型，以及在matchFunc回调函数的value参数的类型
   * 都是string，具体参照https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement
   * 文档中关于`value`属性的定义
   */
  value: PropTypes.string,
};

const defaultProps = {
  validators: [],
  value: '',
};

/**
 * 带有校验功能的文本框控件
 */
export default class ValidateInput extends Component {
  static displayName = 'ValidateInput'

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

ValidateInput.propTypes = propTypes;
ValidateInput.defaultProps = defaultProps;

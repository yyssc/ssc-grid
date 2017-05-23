import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, HelpBlock } from 'react-bootstrap';

import * as validationUtils from './utils/validation';

/**
 * 控件(control/widget)分类
 * Command input: Button, Drop-down list, ...
 * Data input-output: Checkbox Color picker Combo box Cycle button Date Picker Grid view List box List builder Radio button Scrollbar Search box Slider Spinner Text box
 * 来源：https://en.wikipedia.org/wiki/Widget_(GUI)
 * 第二来源：https://docs.joomla.org/Standard_form_field_types
 * Joomla的名称和Web更贴切，wikipedia不区分Web还是Client
 */

import { Refers } from 'ssc-refer';

/**
 * 带有校验功能的文本框控件
 */
export default class ValidateRefers extends Component {

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
   * 重置参照组件，重置校验状态
   * @public
   */
  reset() {
    this.refers.getInstance().clear();
    this.setState({
      helpText: '',
      validationState: null,
    });
  }

  /**
   * 父级组件主动校验
   * @public
   * @return {booean} 校验成功还是失败
   */
  doValidate() {
    return this.setValidationState(this.getRefersDisplayValue());
  }

  /**
   * 获取参照的值，这里只处理第一个被选中的值
   * @return {Object} 比如
   * ```js
   * {
   *   id: '',
   *   code: '',
   *   name: '',
   * }
   * ```
   * 如果没有一个被选中，则返回null
   */
  getRefersValue(selected) {
    if (!selected) {
      selected = this.refers.getInstance().getData();
    }
    return selected.length > 0
      ? selected[0]
      : null;
  }

  /**
   * 获取参照的值，这里只处理第一个被选中的值
   * @return {Object} 比如
   * ```js
   * {
   *   id: '',
   *   code: '',
   *   name: '',
   * }
   * ```
   */
  getRefersDisplayValue(selected) {
    const value = this.getRefersValue(selected);
    // 这里假设参照值的结构中`name`字段是用于显示的值
    return value ? value.name : '';
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
    this.setValidationState(this.getRefersDisplayValue());

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleChange(selected) {
    this.setState({ selected });
    this.setValidationState(this.getRefersDisplayValue(selected));

    if (this.props.onChange) {
      this.props.onChange(selected);
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
        <Refers
          ref={c => this.refers = c}
          {...this.props}
          labelKey={this.props.labelKey || 'name'}
          disabled={this.props.disabled === true}
          minLength={0}
          align="justify"
          emptyLabel=""
          multiple={false}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          placeholder={ this.props.placeholder || '请选择...' }
          referType="list"
          selected={this.props.selected}
        />
        <HelpBlock>{this.state.helpText}</HelpBlock>
      </FormGroup>
    );
  }
}

ValidateRefers.propTypes = {
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
   * 请参照参照文档https://ssc-refer.github.io/
   */
  labelKey: PropTypes.string,
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
   * 参照配置参数
   * ```js
   * referConfig = {
   *   referConditions: {"refCode":"dept","refType":"tree","rootName":"部门"};
   * }
   * ```
   */
  referConditions: PropTypes.shape({
    refCode: PropTypes.string,
    refType: PropTypes.string,
    rootName: PropTypes.string,
  }).isRequired,
  /**
   * referDataUrl: "http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON";
   */
  referDataUrl: PropTypes.string.isRequired,
  /**
   * 参照初始值
   */
  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  /**
   * 带有校验功能的输入框
   */
  validators: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
  })),
};

ValidateRefers.defaultProps = {
  selected: [],
  validators: [],
};

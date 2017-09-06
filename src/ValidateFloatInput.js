/* eslint-disable no-var, curly, vars-on-top, func-names, one-var, no-unused-vars, guard-for-in */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import * as validationUtils from './utils/validation';
import u from './utils/u.biz';

/**
 * 控件(control/widget)分类
 * Command input: Button, Drop-down list, ...
 * Data input-output: Checkbox Color picker Combo box Cycle button Date Picker Grid view List box List builder Radio button Scrollbar Search box Slider Spinner Text box
 * 来源：https://en.wikipedia.org/wiki/Widget_(GUI)
 * 第二来源：https://docs.joomla.org/Standard_form_field_types
 * Joomla的名称和Web更贴切，wikipedia不区分Web还是Client
 */

import TextField from './TextField';

// // Support: Android<4.1, IE<9
// // Make sure we trim BOM and NBSP
// const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// // Support: Android<4.1, IE<9
// function $trim( text ) {
//   return text == null ?
//     '' :
//     ( text + '' ).replace( rtrim, '' );
// }

// u.js::Validate.fn.isEmpty
function isEmpty(val) {
  // return val === '' || val === undefined || val === null || val === $trim(this.$element.attr('tip'));
  return val === '' || val === undefined || val === null;
}

const regExp = /^-?\d+(\.\d+)?$/;

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
   * 校验错误时候提示信息
   */
  errorMsg: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  /**
   * 当文本框为空的显示的提示信息
   */
  nullMsg: PropTypes.string,
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
   * Required field
   */
  required: PropTypes.bool,
  /**
   * 文本框中显示的值
   * 注意：由于文本框是完全自由输入的，所以value的类型，以及在matchFunc回调函数的value参数的类型
   * 都是string，具体参照https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement
   * 文档中关于`value`属性的定义
   */
  value: PropTypes.string,
};

const defaultProps = {
  errorMsg: '请填写数字！',
  max: null,
  min: null,
  nullMsg: '不能为空！',
  required: false,
  value: '',
};

/**
 * 带有校验功能的文本框控件
 */
export default class ValidateFloatInput extends Component {
  static displayName = 'ValidateFloatInput'

  constructor(props) {
    super(props);
    this.state = {
      helpText: '',
      showValue: props.value,
      trueValue: '',
      /**
       * one of 'success', 'warning', 'error', null
       */
      validationState: null,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    this.maskerMeta = {
      precision: 2
    };
    this.formater = new u.NumberFormater(this.maskerMeta.precision);
    this.masker = new u.NumberMasker(this.maskerMeta);
  }

  /**
   * @param {Object} nextProps
   */
  componentWillReceiveProps() {
  }

  setValue(val) {
    const value = parseFloat(val);
    // this.maskerMeta.precision = this.dataModel.getRowMeta(this.field, 'precision') || this.maskerMeta.precision;
    // this.formater.precision = this.maskerMeta.precision;
    // if (this.dataModel.getCurrentRow() == null) {
    //   return;
    // }
    // const mvalue = this.dataModel.getCurrentRow().getValue(this.field);
    const mvalue = this.state.trueValue;
    if (value === mvalue) {
      this.setState({
        showValue: this.masker.format(this.state.trueValue).value
      });
    } else {
      const trueValue = this.formater.format(value);
      this.setState({
        trueValue,
        showValue: this.masker.format(trueValue).value,
      });
    }
  }

  // u.js::Validate.fn.showMsg()
  showMsg(msg) {
    this.setState({
      validationState: 'error',
      helpText: msg,
    });
  }

  // u.js::Validate.fn.hideMsg()
  hideMsg() {
    this.setState({
      validationState: null,
      helpText: '',
    });
  }

  /**
   * 提供给组件外面直接调用
   * @param {any} [pValue] 当没有传递该值的时候，默认使用状态中的showValue来进行校验
   * @returns
   * @memberof ValidateFloatInput
   */
  doValid(pValue) {
    this.setState({
      needClean: false
    });
		// if (this.$element.attr("readonly")) return true
    var value = null;
    if (typeof pValue !== 'undefined') {
      value = pValue;
    } else {
      value = this.state.showValue;
    }

    if (isEmpty(value) && this.props.required) {
      this.showMsg(this.props.nullMsg);
      return false;
    } else if (isEmpty(value) && !this.props.required) {
      return true;
    }
    if (regExp) {
      const reg = new RegExp(regExp);
      if (typeof value === 'number') {
        value = value + '';
      }
      const r = value.match(reg);
      if (r === null || r === false) {
        this.showMsg(this.props.errorMsg);
        this.setState({
          needClean: true
        });
        return false;
      }
    }
    if (this.props.max !== undefined && this.props.max != null) {
      if (parseFloat(value) > this.props.max) {
        this.showMsg(`输入值不能大于${this.props.max}`);
        return false;
      }
    }
    if (this.props.min !== undefined && this.props.min != null) {
      if (parseFloat(value) < this.props.min) {
        this.showMsg(`输入值不能小于${this.props.min}`);
        return false;
      }
    }
    return true;
  }

  /**
   * 是否需要清除数据
   *
   * @returns {boolean}
   * @memberof ValidateFloatInput
   */
  _needClean() {
    return true;
  }

  handleBlur(event) {
    if (!this.doValid(event.target.value) && this._needClean()) {
      if (this.props.required && (event.target.value === null || event.target.value === undefined || event.target.value === '')) {
        // 因必输项清空导致检验没通过的情况
        this.setValue('');
      } else {
        this.setState({
          showValue: this.state.showValue
        });
      }
    } else {
      this.setValue(event.target.value);
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleChange(event) {
    const { value } = event.target;

    this.hideMsg();

    this.setState({
      showValue: value,
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleFocus(event) {
    this.hideMsg();

    var v = this.state.trueValue, vstr = v + '', focusValue = v;
    if (u.isNumber(v) && u.isNumber(this.maskerMeta.precision)) {
      if (vstr.indexOf('.') >= 0) {
        var sub = vstr.substr(vstr.indexOf('.') + 1);
        if (sub.length < this.maskerMeta.precision || parseInt(sub.substr(this.maskerMeta.precision), 10) === 0 || this.maskerMeta.precision === 0) {
          focusValue = this.formater.format(v);
        }
      } else if (this.maskerMeta.precision > 0) {
        focusValue = this.formater.format(v);
      }
    }
    focusValue = parseFloat(focusValue) || '';
    this.setState({
      showValue: focusValue
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  /**
   * event.keyCode:
   * - 48~57 数字0~9
   * - 190 小数点
   *
   * @param {any} event
   * @returns
   * @memberof ValidateFloatInput
   */
  handleKeyDown(event) {
    // copy from u.js
    let tmp = event.target.value;
    if (event.shiftKey) {
      // event.returnValue = false;
      event.preventDefault();
      return false;
    } else if (event.keyCode === 9 || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 46) {
      // tab键 左箭头 右箭头 delete键
      return true;
    } else if (event.ctrlKey && (event.keyCode === 67 || event.keyCode === 86)) {
      // 复制粘贴
      return true;
    } else if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || ([8, 110, 190, 189, 109].indexOf(event.keyCode) > -1))) {
      // event.returnValue = false;
      event.preventDefault();
      return false;
    } else if ((!tmp || tmp.indexOf('.') > -1) && (event.keyCode === 190 || event.keyCode === 110 )) {
      // event.returnValue = false;
      event.preventDefault();
      return false;
    }

    if (tmp && (tmp + '').split('.')[0].length >= 25) {
      return false;
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
          value={this.state.showValue}
          disabled={this.props.disabled}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
        />
        <FormControl.Feedback />
        <HelpBlock>{this.state.helpText}</HelpBlock>
      </FormGroup>
    );
  }
}

ValidateFloatInput.propTypes = propTypes;
ValidateFloatInput.defaultProps = defaultProps;

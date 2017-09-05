/* eslint-disable no-var, curly, vars-on-top, func-names, one-var, no-unused-vars, guard-for-in */

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

// // Support: Android<4.1, IE<9
// // Make sure we trim BOM and NBSP
// const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// // Support: Android<4.1, IE<9
// function $trim( text ) {
//   return text == null ?
//     '' :
//     ( text + '' ).replace( rtrim, '' );
// }

function isEmpty(val) {
  // return val === '' || val === undefined || val === null || val === $trim(this.$element.attr('tip'));
  return val === '' || val === undefined || val === null;
}

var enumerables = true;
var enumerablesTest = {toString: 1};

for (var I in enumerablesTest) {
  enumerables = null;
}
if (enumerables) {
  enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
    'toLocaleString', 'toString', 'constructor'];
}

// u.biz.js
const u = {
  isNumber: (obj) => {
    // return obj === +obj
    return (obj - parseFloat( obj ) + 1) >= 0;
  }
};

/**
 * 复制对象属性
 *
 * @param {Object}  目标对象
 * @param {config} 源对象
 */
u.extend = function(object, config) {
  var args = arguments, options;
  if (args.length > 1) {
    for (var len = 1; len < args.length; len++) {
      options = args[len];
      if (object && options && typeof options === 'object') {
        var i, j, k;
        for (i in options) {
          object[i] = options[i];
        }
        if (enumerables) {
          for (j = enumerables.length; j--;) {
            k = enumerables[j];
            if (options.hasOwnProperty && options.hasOwnProperty(k)) {
              object[k] = options[k];
            }
          }
        }
      }
    }
  }
  return object;
};

/**
 * 抽象格式化类
 */
function AbstractMasker() {}

AbstractMasker.prototype.format = function format(obj) {
  if (obj == null) {
    return null;
  }

  const fObj = this.formatArgument(obj);
  return this.innerFormat(fObj);
};

/**
 * 统一被格式化对象结构
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.formatArgument = function formatArgument(/* obj */) {

};

/**
 * 格式化
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.innerFormat = function innerFormat(/* obj */) {

};

/**
 *格式结果
 */
function FormatResult(value, color) {
  this.value = value;
  this.color = color;
}
// FormatResult.prototype = new Object;
FormatResult.prototype = {};

/**
 * <b> 数字格式化  </b>
 *
 * <p> 格式化数字
 *
 * </p>
 *
 * Create at 2009-3-20 上午08:50:32
 *
 * @author bq
 * @since V6.0
 */

/**
 * 构造方法
 */
function NumberMasker(formatMeta) {
  this.update(formatMeta);
}

NumberMasker.DefaultFormatMeta = {
  isNegRed: true,
  isMarkEnable: true,
  markSymbol: ',',
  pointSymbol: '.',
  positiveFormat: 'n',
  negativeFormat: '-n'
};

NumberMasker.prototype = new AbstractMasker;
NumberMasker.prototype.formatMeta = null;

NumberMasker.prototype.update = function(formatMeta) {
  this.formatMeta = u.extend({}, NumberMasker.DefaultFormatMeta, formatMeta);
};

/**
 *格式化对象
 */
NumberMasker.prototype.innerFormat = function(obj) {
  var dValue, express, seperatorIndex, strValue;
  dValue = obj.value;
  if (dValue > 0) {
    express = this.formatMeta.positiveFormat;
    strValue = dValue + '';
  } else if (dValue < 0) {
    express = this.formatMeta.negativeFormat;
    strValue = (dValue + '').substr(1, (dValue + '').length - 1);
  } else {
    express = this.formatMeta.positiveFormat;
    strValue = dValue + '';
  }
  seperatorIndex = strValue.indexOf('.');
  strValue = this.setTheSeperator(strValue, seperatorIndex);
  strValue = this.setTheMark(strValue, seperatorIndex);
  var color = null;
  if (dValue < 0 && this.formatMeta.isNegRed) {
    color = 'FF0000';
  }

  /**
   * 将AFindText全部替换为ARepText
   */
  String.prototype.replaceAll = function(AFindText, ARepText) { // eslint-disable-line no-extend-native
    // 自定义String对象的方法
    var raRegExp = new RegExp(AFindText, 'g');
    return this.replace(raRegExp, ARepText);
  };

  return new FormatResult(express.replaceAll('n', strValue), color);
};

/**
 *设置标记
*/
NumberMasker.prototype.setTheMark = function(str, seperatorIndex) {
  var endIndex, first, index;
  if (!this.formatMeta.isMarkEnable)
    return str;
  if (seperatorIndex <= 0)
    seperatorIndex = str.length;
  first = str.charCodeAt(0);
  endIndex = 0;
  if (first === 45)
    endIndex = 1;
  index = seperatorIndex - 3;
  while (index > endIndex) {
    str = str.substr(0, index - 0) + this.formatMeta.markSymbol + str.substr(index, str.length - index);
    index = index - 3;
  }
  return str;
};
NumberMasker.prototype.setTheSeperator = function(str, seperatorIndex) {
  var ca;
  if (seperatorIndex > 0) {
    ca = NumberMasker.toCharArray(str);
    // ca[seperatorIndex] = NumberMasker.toCharArray(this.formatMeta.pointSymbol)[0];
    ca[seperatorIndex] = this.formatMeta.pointSymbol;
    str = ca.join('');
  }
  return str;
};
/**
 * 将字符串转换成char数组
 * @param {} str
 * @return {}
 */
NumberMasker.toCharArray = function(str2) {
  var str = str2.split('');
  var charArray = new Array();
  for (var i = 0; i < str.length; i++) {
    charArray.push(str[i]);
  }
  return charArray;
};

/**
 *默认构造方法
 */
NumberMasker.prototype.formatArgument = function(obj) {
  var numberObj = {};
  numberObj.value = obj;
  return numberObj;
};

u.NumberMasker = NumberMasker;

/**
 * 数据格式化工具
 */

function NumberFormater(precision) {
  this.precision = precision;
}

NumberFormater.prototype.update = function update(precision) {
  this.precision = precision;
};

NumberFormater.prototype.format = function format(value) {
  if (!u.isNumber(value)) return '';

    // 以0开头的数字将其前面的0去掉
  while ((value + '').charAt(0) === '0' && value.length > 1 && (value + '').indexOf('0.') !== 0) {
    value = value.substring(1);
  }
  let result = value;
  if (u.isNumber(this.precision)) {
    // TODO 需要引入BigNumber.js
    // bignumber.js v2.0.7 https://github.com/MikeMcl/bignumber.js
    if (window.BigNumber && !( (value.toString().indexOf('.') > -1) && (value.toString().replace( '.', '' ).length > 15) ) ) {
      // 已经引入BigNumber,并且满足bigNum最大只支持15位有效数字
      result = (new window.BigNumber(value)).toFixed(this.precision);
    } else {
      const digit = parseFloat(value);
      // 解决toFixed四舍五入问题，如1.345
      result = (Math.round(digit * Math.pow(10, this.precision)) / Math.pow(10, this.precision)).toFixed(this.precision);
    }
    if (result === 'NaN') {
      return '';
    }
  }

  return result;
};

u.NumberFormater = NumberFormater;

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
  max: PropTypes.number,
  min: PropTypes.number,
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
  max: null,
  min: null,
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
      showValue: '',
      trueValue: '',
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

  doValid(pValue) {
    this.setState({
      needClean: false
    });
    let value = pValue;

    if (isEmpty(value) && this.props.required) {
      // this.showMsg(this.nullMsg); // TODO
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
        // this.showMsg(this.errorMsg); // TODO
        this.setState({
          needClean: true
        });
        return false;
      }
    }
    if (this.props.max !== undefined && this.props.max != null) {
      if (parseFloat(value) > this.props.max) {
        this.setState({
          errorMsg: '输入值不能大于' + this.max
        });
        // this.showMsg(this.errorMsg); // TODO
        return false;
      }
    }
    if (this.props.min !== undefined && this.props.min != null) {
      if (parseFloat(value) < this.props.min) {
        this.setState({
          errorMsg: '输入值不能小于' + this.props.min
        });
        // this.showMsg(this.errorMsg); // TODO
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
    if (!this.doValid() && this._needClean()) {
      if (this.props.required && (event.target.value === null || event.target.value === undefined || event.target.value === '')) {
        // 因必输项清空导致检验没通过的情况
        this.setValue('');
      } else {
        this.setState({
          showValue: this.state.showValue
        });
      }
    } else {
      console.log('没有校验通过');
      this.setValue(event.target.value);
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({
      showValue: value,
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleFocus(event) {
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

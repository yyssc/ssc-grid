import classNames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import Col from 'react-bootstrap/lib/Col';
import ReactBootstrapForm from 'react-bootstrap/lib/Form';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
// 表单(form)控件(control/widget)
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
// 参照控件
import { Refers } from 'ssc-refer';

// YBZSAAS-461
// IE11不支持Array.prototype.find()
import 'core-js/fn/array/find';

import { getFieldDefaultValue } from './utils/sscgridUtils';
import * as validationUtils from './utils/validation';
import * as actions from './Form.actions';

/**
 * 控件(control/widget)分类
 * Command input: Button, Drop-down list, ...
 * Data input-output: Checkbox Color picker Combo box Cycle button Date Picker Grid view List box List builder Radio button Scrollbar Search box Slider Spinner Text box
 * 来源：https://en.wikipedia.org/wiki/Widget_(GUI)
 */

// 使用我们自己造的轮子
import TextField from './TextField';
import DatePicker from './DatePicker2';

/**
 * helper functions
 */

/**
 * @param {Array|Null} validators 当不需要校验的时候为null
 * @return {boolean} 当是必选项的时候，输出true否则为false
 */
function showRequiredStar(validators) {
  if (!validators) {
    return false;
  }
  return validators.find(({type, type2}) => type === 'required' || type2 === 'required') !== undefined;
}

const propTypes = {
  /**
   * 填充表单值<br>
   * 时间类型比较特殊，请先转成
   * <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>格式的字符串
   * 之后，再传进来。
   * ```
   * defaultData = {
   *   date: new Date('2017-02-14').toISOString()
   * }
   * ```
   */
  defaultData: PropTypes.object,
  /**
   * 表单中的数据
   * fieldsModel数据举例：
   * ```js
   * [
   *   {
   *     type: 'string',
   *     id: 'formValidationEmail',
   *     label: '邮箱地址',
   *     validators: [
   *       {type: 'email'}
   *     ]
   *   },
   *   {
   *    type: 'custom',
   *    component: <CustomComponent>
   *   }
   * ]
   * ```
   * schema为
   * ```js
   * fieldsModel = [ fieldModel, fieldModel, ... ];
   * ```
   * ## type字段
   * 字段类型type:
   * - 0 `string` 字符类型
   * - 1 `double` 数值类型
   * - 3 `date` 日期类型
   * - 4 `boolean` 布尔类型
   * - 5 `ref` 参照类型
   * - 6 `enum` 枚举型
   * - `custom` 自定义类型
   *
   * ### string字符型
   * ```js
   * {
   *   type: 'string',
   *   id: 'formValidationEmail',
   *   label: '邮箱地址',
   *   validators: [
   *     { type: 'email' }
   *   ]
   * }
   * ```
   *
   * * ### date日期类型
   * 字段定义举例：
   * ```js
   * {
   *   type: 'date',
   *   dateConfig: {
   *     locale: 'en_US',
   *     todayButton:'Today'
   * }
   * ```
   *
   * ### custom 自定义类型
   * ```js
   * {
   *    type: 'custom',
   *    component: <CustomComponent>
   * }
   * ```
   * 对于自定义类型，需要调用者传入一个组件，表单在回调该组件的时候，传入如下属性：
   * ```js
   * propTypes: {
   *   customFieldModel: PropTypes.object,
   *   customFieldValue: PropTypes.string,
   *   onCustomFieldChange: PropTypes.func,
   * }
   * ```
   * ### enum枚举型
   * ```js
   * {
   *   type: 'enum',
   *   id: 'accountProperty',
   *   label: '账户性质',
   *   data: [
   *     { key: 'BASE', value: '基本' },
   *     { key: 'NORMAL', value: '一般' },
   *     { key: 'TEMPORARY', value: '临时' },
   *     { key: 'SPECIAL', value: '专用' },
   *   ],
   * }
   * ```
   *
   *
   * ### ref参照型
   * 字段定义举例：
   * ```js
   * {
   *   type: 'ref',
   *   referConfig: {
   *     referConditions: {
   *       refCode: 'org',
   *       refType: 'tree',
   *       rootName: '组织'
   *     },
   *     referDataUrl: 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON',
   *     renderMenuItemChildren: (option, props, index) => ([
   *       <div>{option.code + ' ' + option.name}</div>
   *     ])
   *     labelKey: 'name',
   *     referExtend: {
           showDisabledBtnText: 'Display Disabled',
           showDisabledBtnText_Not: 'Hide Disabled'
         },
   *   },
   *   multiple:false
   * }
   * ```
   * 所有`referConfig`下的属性直接向下传递给`Refers`组件，
   * 比如`referConfig = { foo: 'bar' }`，那么就相当于
   * ```jsx
   * <Refers
   *   foo="bar"
   * />
   * ```
   * 关于`Refers`组件的属性定义，详见[ssc-refer](https://ssc-refer.github.io/components.html)
   * ## validators字段
   * 校验类型，比如
   * ```js
   * validators: [
   *   { type: 'required' },
   *   { type: 'length', min: 3, max: 6,
   *     helpText: '字符串长度应该大于等于3小于等于6' }
   * ]
   * ```
   * schema为：
   * ```js
   * validators = [ validator, validator, ... ];
   * ```
   * `type`字段支持如下类型：
   * - `email` 邮件地址
   * - `decimal` 数字，比如0.1, .3, 1.1, 1.00003, 4.0
   * - `int` 整数
   * - `mobilePhone` 手机号
   * - `custom` 自定义格式
   *
   * `helpText`字段是错误提示。如果不提供，则使用默认错误提示。
   * 如果是自定义类型，则通过`matchFunc`参数传递校验函数
   * ```js
   * {
   *   type: 'custom',
   *   helpText: value => '请输入正确的XX格式',
   *   matchFunc: value => {}
   * }
   * ```
   * 当`matchFunc`返回值为`true`的时候，认为校验通过
   * 对于自定义类型，如果不提供`helpText`，则默认不显示错误提示。
   * ## disabled字段
   * 当值为`true`的时候禁用该字段，其他值都是不禁用该字段。
   */
  fieldsModel: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      validators: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired
      })),
      disabled: PropTypes.boolean,
      referConfig: PropTypes.object,
      dateConfig: PropTypes.object,
      multiple: PropTypes.boolean,
    })),
    PropTypes.object // 默认类型应该是数组，但是为了支持mobx传入observable object...
  ]).isRequired,
  /**
   * 自定义布局（bootstrap列布局）
   * 具体参照：https://react-bootstrap.github.io/components.html#grid-props-col
   * ```js
   * [
   *   ['id', 'name', 'code'],
   *   ['src_system']
   * ]
   * ```
   */
  layout: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  /**
   * 当控件的值发生改变的时候触发
   * - 参数1 {String} `fieldId` 也就是传入组件中fieldsModel中的id<br>
   * - 参数2 {String} `value` 改变之后的值<br>
   * - 参数3 {Object} `opt` 可选参数，当type为string/boolean/enum等简单类型的时候，可以
   *             通过opt.event获取Event对象。<br>
   *             当type为date类型的时候，可以通过opt.formattedValue获取格式化
   *             之后的时间值。<br>
   */
  onChange: PropTypes.func,
  /**
   * 当点击“重置”按钮的时候
   */
  onReset: PropTypes.func,
  /**
   * 当表单被提交的时候触发<br>
   * 当用户使用了自定义提交按钮的时候不会调用该回调<br>
   * 参数1. `formData`, 整个表单中所有控件的值，是一个JSON对象，结构和传入参数
   *                  defaultData保持一致。<br>
   */
  onSubmit: PropTypes.func,
  /**
   * 是否显示提交按钮
   */
  showSubmitButton: PropTypes.bool,
  /**
   * 取消按钮文本<br>
   * 默认值:取消
   */
  cancelLabel: PropTypes.string,
  /**
   * 确定按钮文本<br>
   * 默认值:完成
   */
  okLabel: PropTypes.string,
};

const defaultProps = {
  showSubmitButton: true,
};

export default class Form extends Component {
  static displayName = 'Form'
  constructor(props) {
    super(props);
    /**
     * 暂时只用于使用ref获取子组件的校验状态
     * 结构示例
     * ```
     * {
     *   id: {TextField},
     *   name: {TextField}
     * }
     * ```
     */
    this.fieldRefs = {};
    this.state = {
      /**
       * 记录当前表单的验证状态，这是一个键值对，其中key表示字段id，value表示
       * 验证状态，用户需要自己判断所有字段是否都验证通过了
       * 验证状态，验证状态分三种:
       * - 'success' 验证成功
       * - 'error' 验证失败
       * - null 未知状态，比如TextField组件刚mount上的时候，还不知道验证状态，
       * 除非触发了一次onChange事件，或者onSubmit才能知道其验证状态
       * ```
       * {
       *   email: 'success',
       *   name: 'error',
       *   name2: null
       * }
       * 字段email是fieldId, 'success'是验证状态
       * 这是react-bootstrap中关于form validation的直接映射
       * ```
       */
      fieldsValidationState: {},
      /**
       * 验证失败时候显示的帮助信息
       * ```
       * {
       *   email: '请输入正确的邮件地址',
       *   name: '请输入必选项内容'
       * }
       * ```
       * 这是react-bootstrap中关于form validation的直接映射
       */
      fieldsHelpText: {},
      formData: {},
      /**
       * 提交按钮是否被禁用
       * 当值为true的时候，提交按钮的样式为“禁用”
       */
      submitButtonDisabled: false
    };

    /**
     * 初始化表单的默认值
     * 当传入组件的表单的字段的默认值为空（null/undefined）的时候，需要计算一下默认值
     */
    this.state.formData = { ...this.props.defaultData };
    this.props.fieldsModel.forEach(fieldModel => {
      this.state.formData[fieldModel.id] = getFieldDefaultValue(
        fieldModel, this.state.formData[fieldModel.id]);
    });

    // Initialize validation state of all form field with null, but not hidden fields
    this.props.fieldsModel.forEach(fieldModel => {
      if (fieldModel.hidden === true) {
        return;
      }
      if (fieldModel.validators) {
        this.state.fieldsValidationState[fieldModel.id] = null;
        this.state.fieldsHelpText[fieldModel.id] = '';
      }
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    // 更新表单默认值
    if (nextProps.defaultData !== this.props.defaultData) {
      const formData = { ...nextProps.defaultData };
      nextProps.fieldsModel.forEach((fieldModel) => {
        formData[fieldModel.id] = getFieldDefaultValue(fieldModel, formData[fieldModel.id]);
      });
      this.setState(
        actions.updateFormData(formData)
      );
    }
  }

  /**
   * Call this method from ref
   * 1. Show validation state on form controls
   * 2. call onSubmit callback
   * @memberof Form
   */
  submit() {
    this.handleSubmit();
  }

  // 以id来查询对应的字段模型
  getFieldModelById(fieldId) {
    return this.props.fieldsModel.find(
      ({ id }) => (id === fieldId)
    );
  }

  /**
   * 这里只处理简单类型的控件，比如input, select, checkbox
   * 不处理复杂类型的空间，比如date-picker
   */
  handleChange(fieldId, validators, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    this.setState(
      actions.updateFieldValue(fieldId, value)
    );

    // 如果该字段需要校验，那么设置校验状态
    if (validators) {
      this.setState(
        actions.updateFormFieldValidationState(fieldId, value, validators),
        (/* prevState, props */) => {
          // 现在校验状态来决定提交按钮的状态
          this.setState(actions.updateSubmitButtonState());
        }
      );
    }

    if (this.props.onChange) {
      this.props.onChange(fieldId, value, {
        event
      });
    }
  }

  // 只处理date-picker控件
  handleDatePickerChange(fieldId, validators, value, formattedValue) {
    // console.log(fieldId, value, formattedValue);
    const newState = { ...this.state };
    newState.formData[fieldId] = formattedValue;
    this.setState(newState);
// 如果该字段需要校验，那么设置校验状态
    if (validators) {
      this.setState(
        actions.updateFormFieldValidationState(fieldId, value, validators),
        (/* prevState, props */) => {
          // 现在校验状态来决定提交按钮的状态
          this.setState(actions.updateSubmitButtonState());
        }
      );
    }
    if (this.props.onChange) {
      this.props.onChange(true, fieldId, formattedValue, {
        value
      });
    }
  }

  /**
   * 参照修改后的回调
   * @param {String} fieldId
   * @param {Array} selected
   * 目前不清楚为什么selected返回一个数组
   * 先不管三七二十一，直接扔到state中，让用户可以获取到
   * ```
   * selected = [
   *   {
   *     "id": "0500CC91-4A98-4C1D-A4D6-C6A0ABCC53AD",
   *     "isLeaf": "true",
   *     "name": "服务中心",
   *     "pid": "",
   *     "code": "02"
   *   }
   * ]
   * ```
   */
  handleReferChange(fieldId, validators, selected) {
    const { onChange } = this.props;
    // 清空或者设置新值
    this.setState(actions.updateReferFieldValue(fieldId, selected), () => {});

    // 如果该字段需要校验，那么设置校验状态
    if (validators) {
      // 参照是一个复杂类型的值，需要专门处理。
      let value = '';
      // 对参照的API不了解，所以写死获取第一个
      if (selected && selected[0]) {
        // 由于参照的字段是可变的，有时候是name有时候是displayName，所以这里不再进入对象
        // 而是直接将对象转成字符串进行判断。
        // value = selected[0].name || '';
        value = JSON.stringify(selected[0]);
      } else {
        value = '';
      }

      this.setState(
        actions.updateFormFieldValidationState(fieldId, value, validators),
        (/* prevState, props */) => {
          // 现在校验状态来决定提交按钮的状态
          this.setState(actions.updateSubmitButtonState());
        }
      );
    }

    if (onChange) {
      onChange(fieldId, selected, {});
    }
  }

  /**
   * 参照回调
   * @param {String} fieldId
   * @param {Array} validators
   * @param {Event} event
   */
  handleReferBlur(/* fieldId, validators, event */) {
  }

  _renderMenuItemChildren(option, props, index) {
    let label = option.code + ' ' + option.name;
    return (<span title={label} key={index}>{label} </span>);
  }
  /**
   * 自定义类型字段发生变化的时候
   * @param {String} fieldId 字段ID
   * @param {*} value value为动态类型，具体类型由`CustomComponent.prop.value`的类型决定
   */
  handleCustomFieldChange(fieldId, validators, value) {
    this.setState(
      actions.updateFieldValue(fieldId, value)
    );
    this.setState(
        actions.updateFormFieldValidationState(fieldId, value, validators),
        (/* prevState, props */) => {
          // 现在校验状态来决定提交按钮的状态
          this.setState(actions.updateSubmitButtonState());
        }
      );
    if (this.props.onChange) {
      this.props.onChange(fieldId, value, {
      });
    }
  }

  handleSubmit() {
    const { formData } = this.state;
    const { fieldsModel } = this.props;

    // 更新所有字段的校验状态，并更新提交按钮的状态，最后再给用户回调
    this.setState(
      actions.updateAllFormFieldsValidationState(fieldsModel, formData),
      (/* prevState, props */) => {
        // 现在校验状态来决定提交按钮的状态
        this.setState(
          actions.updateSubmitButtonState()
        );
        if (validationUtils.isStatesValid(this.state.fieldsValidationState)) {
          if (this.props.onSubmit) {
            this.props.onSubmit(formData);
          }
        }
      }
    );
  }

  handleReset(event) {
    if (this.props.onReset) {
      this.props.onReset(event);
    }
  }

  /**
   * [stateful] 由于state只存储了所有字段的验证状态，所以需要专门计算一下总的状态
   * 可以用在验证表单是否允许提交
   * @return {boolean} 验证状态
   * - true 所有字段验证通过
   * - false 有一个或者多个字段验证失败
   * ({name: null, age: null}) => (true)
   * ({name: 'success', age: 'success'}) => (true)
   * ({name: 'success', age: 'error'}) => (false)
   */
  isAllFieldsValid() {
    const { fieldsValidationState } = this.state;
    return validationUtils.isStatesValid(fieldsValidationState);
  }

  /**
   * 校验状态
   */
  getFieldValidationState(fieldId) {
    return this.state.fieldsValidationState[fieldId];
  }

  /**
   * 校验帮助信息
   */
  getFieldHelpText(fieldId) {
    return this.state.fieldsHelpText[fieldId];
  }

  genLayoutFormGroup(fieldModel, index) {
    const { id, type, label, validators } = fieldModel;
    const placeholder = fieldModel.placeholder || '';
    let formGroup, formCtrl;

    // 隐藏字段
    if (fieldModel.hidden === true) {
      return null;
    }

    function getDefaultFormGroup(key, fieldId, fieldLabel, fieldFormCtrl, fm,
      validationState, helpText
    ) {
      return (
        <FormGroup
          key={key}
          controlId={`formControl-${fieldId}`}
          validationState={validationState}
        >
          <Col componentClass={ControlLabel} sm={4}>
          <div>
            {fieldLabel}
            {
              typeof validators === 'object'
              ? <span className="required" style={{ color: 'red' }}>
                  {showRequiredStar(validators) ? '*' : null}
                </span>
              : null
            }
            </div>
          </Col>
          <Col sm={5}>
            {fieldFormCtrl}
            {
              fm.type !== 'custom' && typeof validators === 'object' && fm.type !== 'ref'
              ? <FormControl.Feedback />
              : null
            }
            {
              typeof validators === 'object'
              ? <HelpBlock>{helpText}</HelpBlock>
              : null
            }
          </Col>
          <Col sm={3}>
            {}
          </Col>
        </FormGroup>
      );
    }

    // 根据字段类型，生成不同的表单控件
    // 每个类型后面跟着的数字是后端传过来的datatype，这里提到的后端是
    // 用友自己的后端，Form组件并不依赖这些datetype数值，写在这里只是
    // 为了用友程序员调试方便。
    switch (type) {
      default:
      case 'string': // 0
      case 'double': // 2
        formCtrl = (
          <TextField
            label={label}
            value={this.state.formData[id]}
            disabled={fieldModel.disabled}
            placeholder={placeholder}
            onChange={this.handleChange.bind(this, id, validators)}
          />
        );
        formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
            ? null
            : this.getFieldHelpText(id)
          )
        );
        break;
      case 'date': // 3
        // 注意value的格式
        // value = new Date('2017-02-14').toISOString()
        let dateConfig = fieldModel.dateConfig || {};
        formCtrl = (
          <DatePicker
            {...dateConfig}
            value={this.state.formData[id]}
            locale={dateConfig.locale || 'zh_CN'}
            peekNextMonth
            showYearDropdown
            showMonthDropdown
            className={classNames(dateConfig.className)}
            todayButton={dateConfig.todayButton || '今天'}
            onChange={this.handleDatePickerChange.bind(this, id, validators)}
            disabled={fieldModel.disabled === true}
          />
        );
        // formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel);
        formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
              ? null
              : this.getFieldHelpText(id)
          )
        );
        break;
      case 'boolean': // 4
        formCtrl = (
          <Checkbox checked={this.state.formData[id]}
            onChange={this.handleChange.bind(this, id, validators)}
          />
        );
        formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel);
        break;
      case 'ref': // 5
        const referValue = this.state.formData[id];
        let defaultData = [];
        if (referValue && referValue.id) {
          defaultData[0] = { ...referValue };
        }
        if (fieldModel.referConfig) {
          // 参照的示例数据
          // ```js
          // defaultData =   [{
          //   "id": "02EDD0F9-F384-43BF-9398-5E5781DAC5D0",
          //   "code": "0502",
          //   "name": "二车间",
          //   "pid": "",
          //   "isLeaf": "true"
          // }];
          // fieldModel.referConfig = {
          //   referConditions: {"refCode":"dept","refType":"tree","rootName":"部门"};
          //   referDataUrl: "http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON";
          // }
          // ```
          let referExtend = {};
          if (fieldModel.referExtend) {
            referExtend = fieldModel.referExtend;
          }
          formCtrl = (
            <Refers
              {...fieldModel.referConfig}
              labelKey={fieldModel.referConfig.labelKey || 'name'}
              disabled={fieldModel.disabled === true}
              minLength={0}
              align="justify"
              emptyLabel=""
              multiple={fieldModel.multiple || false}
              onChange={this.handleReferChange.bind(this, id, validators)}
              onBlur={this.handleReferBlur.bind(this, id, validators)}
              placeholder={placeholder}
              referType="list"
              selected={defaultData}
              ref={ref => this._myrefers = ref}
              renderMenuItemChildren={this._renderMenuItemChildren}
              {...referExtend}
            />
          );
        } else {
          // fallback到纯文本框
          formCtrl = (
            <TextField
              key={index}
              controlId={'formControl-' + id}
              label={label}
              value={this.state.formData[id]}
              placeholder={placeholder}
              inForm
              onChange={this.handleChange.bind(this, id, validators)}
            />
          );
        }
        formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
            ? null
            : this.getFieldHelpText(id)
          )
        );
        break;
      case 'enum': // 6
        formCtrl = (
          <FormControl
            componentClass="select"
            placeholder={placeholder}
            value={this.state.formData[id]}
            onChange={this.handleChange.bind(this, id, validators)}
          >
            {fieldModel.data.map(opt => <option key={opt.key} value={opt.key}>{opt.value}</option>)}
          </FormControl>
        );
        formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
            ? null
            : this.getFieldHelpText(id)
          )
        );
        break;
      case 'custom': // 后端没有该类型，这是前端自己定义的
        formCtrl = (
          <fieldModel.component
            customFieldModel={fieldModel}
            customFieldValue={this.state.formData[id]}
            onCustomFieldChange={this.handleCustomFieldChange.bind(this, id, validators)}
          />
        );
        formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
            ? null
            : this.getFieldHelpText(id)
          )
        );
        break;
    }
    return formGroup;
  }

  genField(fieldModel) {
    const { id, type, label, validators } = fieldModel;
    const placeholder = fieldModel.placeholder || '';
    let formGroup, formCtrl;

    // 隐藏字段
    if (fieldModel.hidden === true) {
      return null;
    }

    function getDefaultFormGroup(fieldId, fieldLabel, fieldFormCtrl, fm,
      validationState, helpText
    ) {
      return (
        <FormGroup
          controlId={`formControl-${fieldId}`}
          validationState={validationState}
        >
          <ControlLabel>{fieldLabel}</ControlLabel>
          <span className="required" style={{ color: 'red' }}>
            {showRequiredStar(validators) ? '*' : null}
          </span>
          {' '}
          {fieldFormCtrl}
          {fm.type !== 'ref' ? <FormControl.Feedback /> : null}
          <HelpBlock>{helpText}</HelpBlock>
        </FormGroup>
      );
    }

    // 根据字段类型，生成不同的表单控件
    // 每个类型后面跟着的数字是后端传过来的datatype，这里提到的后端是
    // 用友自己的后端，Form组件并不依赖这些datetype数值，写在这里只是
    // 为了用友程序员调试方便。
    switch (type) {
      default:
      case 'string': // 0
      case 'double': // 2
        formCtrl = (
          <TextField
            value={this.state.formData[id]}
            placeholder={placeholder}
            onChange={this.handleChange.bind(this, id, validators)}
          />
        );
        formGroup = getDefaultFormGroup(id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
            ? null
            : this.getFieldHelpText(id)
          )
        );
        break;
      case 'date': // 3
        // 注意value的格式
        // value = new Date('2017-02-14').toISOString()
        let dateConfig = fieldModel.dateConfig || {};
        formCtrl = (
          <DatePicker
            {...dateConfig}
            value={this.state.formData[id]}
            locale={dateConfig.locale || 'zh_CN'}
            peekNextMonth
            showYearDropdown
            showMonthDropdown
            className={classNames(dateConfig.className)}
            todayButton={dateConfig.todayButton || '今天'}
            onChange={this.handleDatePickerChange.bind(this, id, validators)}
            disabled={fieldModel.disabled === true}
          />
        );
        // formGroup = getDefaultFormGroup(id, label, formCtrl, fieldModel);
        formGroup = getDefaultFormGroup(id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
              ? null
              : this.getFieldHelpText(id)
          )
        );
        break;
      case 'boolean': // 4
        formCtrl = (
          <Checkbox checked={this.state.formData[id]}
            onChange={this.handleChange.bind(this, id, validators)}
          />
        );
        formGroup = getDefaultFormGroup(id, label, formCtrl, fieldModel);
        break;
      case 'ref': // 5
        const referValue = this.state.formData[id];
        let defaultData = [];
        if (referValue && referValue.id) {
          defaultData[0] = { ...referValue };
        }
        if (fieldModel.referConfig) {
          // 参照的示例数据
          // ```js
          // defaultData =   [{
          //   "id": "02EDD0F9-F384-43BF-9398-5E5781DAC5D0",
          //   "code": "0502",
          //   "name": "二车间",
          //   "pid": "",
          //   "isLeaf": "true"
          // }];
          // fieldModel.referConfig = {
          //   referConditions: {"refCode":"dept","refType":"tree","rootName":"部门"};
          //   referDataUrl: "http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON";
          // }
          // ```
          let referExtend = {};
          if (fieldModel.referExtend) {
            referExtend = fieldModel.referExtend;
          }
          formCtrl = (
            <Refers
              {...fieldModel.referConfig}
              labelKey={fieldModel.referConfig.labelKey || 'name'}
              disabled={fieldModel.disabled === true}
              minLength={0}
              align="justify"
              emptyLabel=""
              multiple={fieldModel.multiple || false}
              onChange={this.handleReferChange.bind(this, id, validators)}
              onBlur={this.handleReferBlur.bind(this, id, validators)}
              placeholder={placeholder}
              referType="list"
              selected={defaultData}
              ref={ref => this._myrefers = ref}
              renderMenuItemChildren={this._renderMenuItemChildren}
              {...referExtend}
            />
          );
        } else {
          // fallback到纯文本框
          formCtrl = (
            <TextField
              controlId={'formControl-' + id}
              label={label}
              value={this.state.formData[id]}
              placeholder={placeholder}
              inForm
              onChange={this.handleChange.bind(this, id, validators)}
            />
          );
        }
        formGroup = getDefaultFormGroup(id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
            ? null
            : this.getFieldHelpText(id)
          )
        );
        break;
      case 'enum': // 6
        formCtrl = (
          <FormControl
            componentClass="select"
            placeholder={placeholder}
            value={this.state.formData[id]}
            onChange={this.handleChange.bind(this, id, validators)}
          >
            {fieldModel.data.map(opt => <option key={opt.key} value={opt.key}>{opt.value}</option>)}
          </FormControl>
        );
        formGroup = getDefaultFormGroup(id, label, formCtrl, fieldModel,
          this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
            ? null
            : this.getFieldHelpText(id)
          )
        );
        break;
      case 'custom': // 后端没有该类型，这是前端自己定义的
        formCtrl = (
          <fieldModel.component
            customFieldModel={fieldModel}
            customFieldValue={this.state.formData[id]}
            onCustomFieldChange={this.handleCustomFieldChange.bind(this, id, validators)}
          />
        );
        formGroup = getDefaultFormGroup(id, label, formCtrl, fieldModel, this.getFieldValidationState(id),
          (
            validationUtils.isFieldValid(this.state.fieldsValidationState[id])
            ? null
            : this.getFieldHelpText(id)
          ));
        break;
    }
    return formGroup;
  }

  render() {
    let form;
    if (this.props.layout) {
      form = (
        <ReactBootstrapForm inline className={classNames(this.props.className)}>
          <Grid fluid>
            <Row>
            {
              this.props.fieldsModel.map((fieldModel) => {
                if (fieldModel.hidden === true) {
                  return null;
                }
                return (<Col
                  key={fieldModel.id}
                  {...this.props.layout}
                >
                  {this.genField(fieldModel)}
                </Col>);
              })
            }
            </Row>
            {
              this.props.showSubmitButton === false
              ? null
              : (
                <Row>
                  <Col md={12} className={'text-center'}>
                    <FormGroup>
                      <Button
                        bsStyle="default"
                        type="reset"
                        onClick={this.handleReset.bind(this)}
                      >
                        { this.props.cancelLabel || '取消' }
                      </Button>
                      {' '}
                      <Button
                        bsStyle="primary"
                        type="submit"
                        disabled={this.state.submitButtonDisabled}
                        onClick={(event) => {
                          // Prevent page reloading
                          // https://github.com/yyssc/ssc-grid/issues/85
                          event.preventDefault();
                          this.handleSubmit();
                        }}
                      >
                        { this.props.okLabel || '完成' }
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              )
            }
          </Grid>
        </ReactBootstrapForm>
      );
    } else {
      form = (
        <ReactBootstrapForm horizontal className={classNames(this.props.className)}>
          {
            this.props.fieldsModel.map(this.genLayoutFormGroup.bind(this))
          }
          {
            this.props.showSubmitButton === false
            ? null
            : (
              <FormGroup>
                <Col sm={12} className={'text-center'}>
                  <Button bsStyle="default" onClick={this.handleReset.bind(this)} type="reset">
                    { this.props.cancelLabel || '取消' }
                  </Button>
                  {' '}
                  <Button
                    bsStyle="primary"
                    type="submit"
                    disabled={this.state.submitButtonDisabled}
                    onClick={(event) => {
                      // Prevent page reloading
                      // https://github.com/yyssc/ssc-grid/issues/85
                      event.preventDefault();
                      this.handleSubmit();
                    }}
                  >{ this.props.okLabel || '完成' }</Button>
                </Col>
              </FormGroup>
            )
          }
        </ReactBootstrapForm>
      );
    }
    return form;
  }
}

Form.propTypes = propTypes;

Form.defaultProps = defaultProps;

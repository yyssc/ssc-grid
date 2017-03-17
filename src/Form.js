import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Button, Form as ReactBootstrapForm, FormGroup, ControlLabel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import update from 'immutability-helper';

import { getValidationObj } from './utils/validation';

/**
 * 控件(control/widget)分类
 * Command input: Button, Drop-down list, ...
 * Data input-output: Checkbox Color picker Combo box Cycle button Date Picker Grid view List box List builder Radio button Scrollbar Search box Slider Spinner Text box
 * 来源：https://en.wikipedia.org/wiki/Widget_(GUI)
 */

// 表单(form)控件(control/widget)
import { FormControl, Checkbox } from 'react-bootstrap';

// 使用我们自己造的轮子
import TextField from './TextField';
import DatePicker from './DatePicker';
import { Refers } from 'ssc-refer';

export default class SSCForm extends Component {
  static propTypes = {
    /**
     * 表单中的数据
     * 字段类型type:
     * - `string` 字符类型
     * - `double` 数值类型
     * - `date` 日期类型
     * - `boolean` 布尔类型
     * - `ref` 参照类型
     * - `custom` 自定义类型
     * 比如：
     * ```json
     * [
     *   {
     *     type: 'string',
     *     id: 'formValidationEmail',
     *     label: '邮箱地址',
     *     validation: {
     *       type: 'email'
     *     }
     *   },
     *   {
     *    type: 'custom',
     *    component: <CustomComponent>
     *   }
     * ]
     * ```
     * 对于自定义类型，需要调用者传入一个组件，下面提供了组件接口：
     * ```
     * propTypes: {
     *   value: React.PropTypes.string,
     *   onChange: React.PropTypes.func
     * },
     * ```
     */
    fieldsModel: PropTypes.array.isRequired,
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
     * 当控件的值发生改变的时候触发
     * @param {String} `fieldId` 也就是传入组件中fieldsModel中的id<br>
     * @param {String} `value` 改变之后的值<br>
     * @param {Object} `opt` 可选参数，当type为string/boolean/enum等简单类型的时候，可以
     *             通过opt.event获取Event对象。<br>
     *             当type为date类型的时候，可以通过opt.formattedValue获取格式化
     *             之后的时间值。<br>
     */
    onChange: PropTypes.func,
    /**
     * 当表单被提交的时候触发<br>
     * 参数1, <code>event</code>, Event对象<br>
     * 参数2. <code>formData</code>, 整个表单中所有控件的值，是一个JSON对象，结构和传入参数
     *                  defaultData保持一致。<br>
     */
    onSubmit: PropTypes.func,
    /**
     * 当点击“重置”按钮的时候
     */
    onReset: PropTypes.func
  };

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
      formData: {...this.props.defaultData},
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
      /**
       * 提交按钮是否被禁用
       * 当值为true的时候，提交按钮的样式为“禁用”
       */
      submitButtonDisabled: false
    };

    // 初始化表单项的验证状态，全部为未定义
    this.props.fieldsModel.forEach(fieldModel => {
      if (fieldModel.validation) {
        this.state.fieldsValidationState[fieldModel.id] = null;
        this.state.fieldsHelpText[fieldModel.id] = '';
      }
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  /**
   * 这里只处理简单类型的控件，比如input, select, checkbox
   * 不处理复杂类型的空间，比如date-picker
   */
  handleChange(fieldId, validation, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    const newState = {
      formData: this.state.formData
    };
    newState.formData[fieldId] = value;
    this.setState(newState);

    // 如果该字段需要校验，那么设置校验状态
    if (validation) {
      this.setState(update(this.state, {
        fieldsValidationState: {
          [fieldId]: {
            $set: this.calcValidationState(value, validation).validationState
          }
        }
      }), (/* prevState, props */) => {
        // 现在校验状态来决定提交按钮的状态
        this.setState({
          submitButtonDisabled: !this.isStatesValid(this.state.fieldsValidationState)
        });
      });
    }

    if (this.props.onChange) {
      this.props.onChange(fieldId, value, {
        event
      });
    }
  }

  // 只处理date-picker控件
  handleDatePickerChange(fieldId, value, formattedValue) {
    const newState = { ...this.state };
    newState.formData[fieldId] = value;
    this.setState(newState);

    if (this.props.onChange) {
      this.props.onChange(fieldId, value, {
        formattedValue
      });
    }
  }

  /**
   * 自定义类型字段发生变化的时候
   * @param {String} fieldId 字段ID
   * @param {*} value value为动态类型，具体类型由`CustomComponent.prop.value`的类型决定
   */
  handleCustomFieldChange(fieldId, value) {
    this.setState(update(this.state, {
      formData: {
        [fieldId]: {
          $set: value
        }
      }
    }));

    if (this.props.onChange) {
      this.props.onChange(fieldId, value, {
        event
      });
    }
  }

  handleSubmit(event) {
    const { formData } = this.state;
    let fieldsValidationState = {};
    let fieldsHelpText = {};

    // 遍历所有表单项然后一一做校验
    this.props.fieldsModel.forEach(fieldModel => {
      if (fieldModel.validation) {
        let value = '';
        if (fieldModel.type === 'ref') {
          value = formData[fieldModel.id].name;
        } else {
          value = formData[fieldModel.id];
        }
        let result = this.calcValidationState(value, fieldModel.validation);
        fieldsValidationState[fieldModel.id] = result.validationState;
        fieldsHelpText[fieldModel.id] = result.helpText;
      }
    });
    this.setState(update(this.state, {
      fieldsValidationState: {
        $set: fieldsValidationState
      },
      fieldsHelpText: {
        $set: fieldsHelpText
      }
    }));

    if (this.isStatesValid(fieldsValidationState)) {
      this.setState({
        submitButtonDisabled: false
      });
      if (this.props.onSubmit) {
        this.props.onSubmit(event, formData);
      }
    } else {
      this.setState({
        submitButtonDisabled: true
      });
    }
  }

  handleReset(event) {
    if (this.props.onReset) {
      this.props.onReset(event);
    }
  }

  /**
   * 参照的回调
   * @param {String} fieldId
   * @param {Array} selected
   * 目前不清楚为什么selected返回一个数组
   * 先不管三七二十一，直接扔到state中，让用户可以获取到
   * ```
   * [
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
  handleReferChange(fieldId, selected) {
    // 该字段可能是null
    if (this.state.formData[fieldId]) {
      this.setState(update(this.state, {
        formData: {
          [fieldId]: {
            selected: {
              $set: selected
            }
          }
        }
      }));
    } else {
      this.setState(update(this.state, {
        formData: {
          [fieldId]: {
            $set: {
              selected
            }
          }
        }
      }));
    }
  }

  /**
   * 参照回调
   * @param {String} fieldId
   * @param {Event} event
   */
  handleReferBlur() {
    // console.log('blurblurblur'+event);
    // console.log(JSON.stringify(this._myrefers.getInstance().hideRefers()));
  }

  /**
   * 校验字段
   * @param {String|null} vstate react-bootstrap的验证状态
   */
  isFieldValid(vstate) {
    return vstate !== 'error';
  }

  /**
   * 由于state只存储了所有字段的验证状态，所以需要专门计算一下总的状态
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
    return this.isStatesValid(fieldsValidationState);
  }

  isStatesValid(states) {
    let isAllValid = true;
    let fieldId;

    // 遍历检查每个需要校验的字段的状态
    for (fieldId in states) {
      if (states.hasOwnProperty(fieldId)) {
        isAllValid = isAllValid && this.isFieldValid(states[fieldId]);
      }
    }

    return isAllValid;
  }

  calcValidationState(value, validation) {
    let validationObj = getValidationObj(validation);
    let validationResult = validationObj.matchFunc(value);
    return {
      validationState: validationResult ? 'success' : 'error',
      helpText: validationResult ? '' : validationObj.helpText
    };
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

  render() {
    const { fieldsModel, className } = this.props;
    return (
      <ReactBootstrapForm horizontal className={classNames(className)}>
        {
          fieldsModel.map((fieldModel, index) => {
            const { id, type, label, placeholder, validation } = fieldModel;
            let formGroup, formCtrl;

            // 隐藏字段
            if (fieldModel.hidden === true) {
              return null;
            }

            function getDefaultFormGroup(key, fieldId, fieldLabel, fieldFormCtrl, fm) {
              return (
                <FormGroup
                  key={key}
                  controlId={`formControl-${fieldId}`}
                >
                  <Col sm={2}>
                    {}
                  </Col>
                  <Col componentClass={ControlLabel} sm={2}>
                    {fieldLabel}
                    {
                      fm.validation && fm.validation.type === 'required'
                        ? <span style={{ color: 'red' }}>*</span>
                        : null
                    }
                  </Col>
                  <Col sm={5}>
                    {fieldFormCtrl}
                  </Col>
                  <Col sm={3}>
                    {}
                  </Col>
                  <FormControl.Feedback />
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
                formGroup = (
                  <TextField
                    key={index}
                    ref={(textField) => { this.fieldRefs[id] = textField; }}
                    controlId={`formControl-${id}`}
                    label={label}
                    value={this.state.formData[id]}
                    placeholder={placeholder}
                    validation={validation}
                    validationState={this.getFieldValidationState(id)}
                    helpText={this.isFieldValid(id) ? null : this.getFieldHelpText(id)}
                    inForm
                    onChange={this.handleChange.bind(this, id, validation)}
                  />
                );
                break;
              case 'date': // 3
                // 注意value的格式
                // value = new Date().toISOString()
                formCtrl = (
                  <DatePicker
                    value={this.state.formData[id]}
                    onChange={this.handleDatePickerChange.bind(this, id)}
                  />
                );
                formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel);
                break;
              case 'boolean': // 4
                formCtrl = (
                  <Checkbox checked={this.state.formData[id]}
                    onChange={this.handleChange.bind(this, id, validation)}
                  />
                );
                formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel);
                break;
              case 'ref': // 5
                const referValue = this.state.formData[id];
                let defaultData = [{
                  'id': '',
                  'code': '',
                  'name': '',
                  'pid': '',
                  'isLeaf': 'true'
                }];
                if (referValue && referValue.id && referValue.code && referValue.name) {
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
                  // const referConditions = {"refCode":"dept","refType":"tree","rootName":"部门"};
                  // const referDataUrl = "http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON";
                  // ```
                  const { referConditions, referDataUrl } = fieldModel.referConfig;
                  formCtrl = (
                    <Refers
                      disabled={false}
                      dropup
                      minLength={0}
                      align="justify"
                      emptyLabel=""
                      labelKey="name"
                      onChange={this.handleReferChange.bind(this, id)}
                      onBlur={this.handleReferBlur.bind(this, id)}
                      placeholder="请选择..."
                      referConditions={referConditions}
                      referDataUrl={referDataUrl}
                      referType="list"
                      defaultSelected={defaultData}
                      ref={ref => this._myrefers = ref}
                    />
                  );
                  formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel);
                } else {
                  // fallback到纯文本框
                  formGroup = (
                    <TextField
                      key={index}
                      controlId={`formControl-${id}`}
                      label={label}
                      value={this.state.formData[id]}
                      placeholder={placeholder}
                      validation={validation}
                      inForm
                      onChange={this.handleChange.bind(this, id, validation)}
                    />
                  );
                }
                break;
              case 'enum': // 6
                formCtrl = (
                  <FormControl componentClass="select" placeholder={placeholder && '请选择'}
                    value={this.state.formData[id]}
                    onChange={this.handleChange.bind(this, id, validation)}
                  >
                    {fieldModel.data.map(opt => <option key={opt.key} value={opt.key}>{opt.value}</option>)}
                  </FormControl>
                );
                formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel);
                break;
              case 'custom': // 后端没有该类型，这是前端自己定义的
                formCtrl = (
                  <fieldModel.component
                    value={this.state.formData[id]}
                    onChange={this.handleCustomFieldChange.bind(this, id)}
                  />
                );
                formGroup = getDefaultFormGroup(index, id, label, formCtrl, fieldModel);
                break;
            }
            return formGroup;
          })
        }
        <FormGroup>
          <Col sm={12} className={'text-center'}>
            <Button bsStyle="info" onClick={this.handleReset.bind(this)} type="reset">
              取消
            </Button>
            <Button
              bsStyle="info"
              type="submit"
              disabled={this.state.submitButtonDisabled}
              onClick={this.handleSubmit.bind(this)}
            >完成</Button>
          </Col>
        </FormGroup>
      </ReactBootstrapForm>
    );
  }
}

import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Button, Form as ReactBootstrapForm, FormGroup, ControlLabel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import update from 'immutability-helper';

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

export default class Form extends Component {
  static propTypes = {
    /**
     * 表单中的数据
     * 比如：
     * <pre><code>[{
     *   type: 'string',
     *   id: 'formValidationEmail',
     *   label: '邮箱地址',
     *   validation: {
     *     type: 'email'
     *   }
     * }]</code></pre>
     */
    fieldsModel: PropTypes.array.isRequired,
    /**
     * 填充表单值<br>
     * 时间类型比较特殊，请先转成
     * <a href="http://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>格式的字符串
     * 之后，再传进来。
     * <pre><code>defaultData = {
     *   date: new Date('2017-02-14').toISOString()
     * }</code></pre>
     */
    defaultData: PropTypes.object,
    /**
     * 当控件的值发生改变的时候触发<br>
     * 参数1, <code>fieldId</code>, 也就是传入组件中fieldsModel中的id<br>
     * 参数2, <code>value</code>, 改变之后的值<br>
     * 参数3, <code>opt</code>, 可选参数，当type为string/boolean/enum等简单类型的时候，可以
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

  state = {
    formData: {...this.props.defaultData},
    /**
     * 字段email是fieldId, true表示校验成功
     * ```
     * {
     *   email: true,
     *   name: false
     * }
     * ```
     */
    fieldsValidationState: {}
  };

  constructor(props) {
    super(props);
  }

  // 这里只处理简单类型的控件，比如input, select, checkbox
  // 不处理复杂类型的空间，比如date-picker
  handleChange(fieldId, event, validationState) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    const newState = {
      formData: this.state.formData
    };
    newState.formData[fieldId] = value;
    this.setState(newState);

    // undefined/null都不代表失败
    this.setState(update(this.state, {
      fieldsValidationState: {
        [fieldId]: {
          $set: !(validationState === false)
        }
      }
    }));

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

  handleSubmit(event) {
    if (this.props.onSubmit) {
      this.props.onSubmit(event, this.state.formData);
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

  calcAllFieldsValidationState(fieldsValidationState) {
    let result = true;
    let fieldId;
    for (fieldId in fieldsValidationState) {
      if (fieldsValidationState.hasOwnProperty(fieldId)) {
        result = fieldsValidationState[fieldId] && result;
      }
    }
    return result;
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
                    controlId={`formControl-${id}`}
                    label={label}
                    value={this.state.formData[id]}
                    placeholder={placeholder}
                    validation={validation}
                    inForm
                    onChange={this.handleChange.bind(this, id)}
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
                    onChange={this.handleChange.bind(this, id)}
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
                      onChange={this.handleChange.bind(this, id)}
                    />
                  );
                }
                break;
              case 'enum': // 6
                formCtrl = (
                  <FormControl componentClass="select" placeholder={placeholder && '请选择'}
                    value={this.state.formData[id]}
                    onChange={this.handleChange.bind(this, id)}
                  >
                    {fieldModel.data.map(opt => <option key={opt.key} value={opt.key}>{opt.value}</option>)}
                  </FormControl>
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
            <Button bsStyle="info" onClick={this.handleSubmit.bind(this)}
              type="submit" disabled={!this.calcAllFieldsValidationState(this.state.fieldsValidationState)}
            >完成</Button>
          </Col>
        </FormGroup>
      </ReactBootstrapForm>
    );
  }
}

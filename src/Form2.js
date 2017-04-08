import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Button, Form as ReactBootstrapForm, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import * as validationUtils from './utils/validation';
import * as actions from './Form.actions';

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
  return validators.find(({type}) => type === 'required') !== undefined;
}

export default class Form2 extends Component {
  static propTypes = {
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
     * 参数1. `formData`, 整个表单中所有控件的值，是一个JSON对象，结构和传入参数
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
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  /**
   * 这里只处理简单类型的控件，比如input, select, checkbox
   * 不处理复杂类型的空间，比如date-picker
   */
  handleChange(fieldId, validators, event) {
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleReset(event) {
  }

  render() {
    const { className } = this.props;
    return (
      <ReactBootstrapForm inline className={classNames(className)}>
        {
          this.props.children
        }
      </ReactBootstrapForm>
    );
  }
}

import React, { Component, PropTypes } from 'react';

// 表单(form)控件(control/widget)
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

// 布局
import { Col } from 'react-bootstrap';

// import validator from 'validator';

import { getValidationObj } from './utils/validation';

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
  static defaultProps = {
    value: '',
    inForm: false,
    runValidation: false,
  }

  static propTypes = {
    /**
     * form control id
     */
    controlId: PropTypes.string,
    /**
     * form control label
     */
    label: PropTypes.string,
    /**
     * 文本框中显示的值
     */
    value: PropTypes.string,
    /**
     * 文本框占位字符
     */
    placeholder: PropTypes.string,
    /**
     * 校验类型，比如
     * <pre><code>{
     *   type: 'email',
     *   helpText: '请输入正确的邮箱地址'
     * }</code></pre>
     * <code>type</code>字段支持如下类型：
     * <ul>
     * <li><code>email</code>邮件地址</li>
     * <li><code>decimal</code>数字，比如0.1, .3, 1.1, 1.00003, 4.0</li>
     * <li><code>int</code>整数</li>
     * <li><code>mobilePhone</code>手机号</li>
     * <li><code>custom</code>自定义格式</li>
     * </ul>
     * <code>helpText</code>是错误提示。如果不提供，则使用默认错误提示。<br>
     * 如果是自定义类型，则通过<code>matchFunc</code>参数传递校验函数
     * ```
     * {
     *   type: 'custom',
     *   helpText: '请输入正确的XX格式',
     *   matchFunc: () => {}
     * }
     * ```
     * 当<code>matchFunc</code>返回值为true的时候，认为校验通过<br>
     * 对于自定义类型，如果不提供<code>helpText</code>，则默认不显示错误提示。
     */
    validation: PropTypes.object,
    /**
     * 是否没有被SSC自己的Form组件引用
     */
    inForm: PropTypes.bool,
    /**
     * 通过这个开关来让父组件可以“调用”子组件的校验方法
     * 初始值是false，如果用户传入true，则调用校验方法
     */
    runValidation: PropTypes.bool,
    /**
     * 当文本框内容被修改时候调用
     */
    onChange: PropTypes.func
  };

  state = {
    value: this.props.value,
    helpText: '',
    /**
     * one of: 'success', 'warning', 'error', null
     * 这是react-bootstrap中FormGroup的validationState的直接映射
     * https://react-bootstrap.github.io/components.html#forms-props-form-group
     */
    validationState: null
  };

  constructor(props) {
    super(props);
  }

  calcValidationState(value) {
    let validationObj = getValidationObj(this.props.validation);
    let validationResult = validationObj.matchFunc(value);
    return {
      state: validationResult,
      validationState: validationResult ? 'success' : 'error',
      helpText: validationResult ? '' : validationObj.helpText
    };
  }

  handleChange(event) {
    const { validation } = this.props;
    const { value } = event.target;

    this.setState({ value });

    // 如果需要校验，则调用校验函数，然后设置校验状态
    if (validation) {
      const { validationState, helpText } = this.calcValidationState(value);
      this.setState({
        validationState,
        helpText
      }, () => {
      });
    }

    if (this.props.onChange) {
      if (validation) {
        const { state } = this.calcValidationState(value);
        this.props.onChange(event, state);
      } else {
        this.props.onChange(event);
      }
    }
  }

  handleBlur(event) {
    const { value } = event.target;
    // 如果需要校验，则调用校验函数，然后设置校验状态
    if (this.props.validation) {
      const { validationState, helpText } = this.calcValidationState(value);
      this.setState({
        validationState,
        helpText
      });
    }
  }

  handleFocus(/* event */) {
  }

  componentWillReceiveProps(nextProps) {
    // 父组件通过修改这个属性来调用组件内的方法
    if (nextProps.runValidation === true) {
      const { validationState, helpText } = this.calcValidationState(this.state.value);
      this.setState({
        validationState,
        helpText
      }, (/* prevState, props */) => {
      });
    }
  }

  render() {
    const { controlId, label, validation } = this.props;

    let textField;
    let formCtrl = (
      <FormControl
        type="text"
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.handleChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      />
    );

    // 是否在SSC自己的form中
    if (!this.props.inForm) {
      if (validation) {
        textField = (
          <FormGroup
            validationState={this.state.validationState}
            controlId={controlId}
          >
            {formCtrl}
            <FormControl.Feedback />
            <HelpBlock>{this.state.helpText}</HelpBlock>
          </FormGroup>
        );
      } else {
        textField = (
          <FormGroup
            controlId={controlId}
          >
            {formCtrl}
          </FormGroup>
        );
      }
    } else {
      if (validation) {
        textField = (
          <FormGroup
            validationState={this.state.validationState}
            controlId={controlId}
          >
            <Col sm={2}>
              {}
            </Col>
            <Col componentClass={ControlLabel} sm={2}>
              {label}
              {
                validation && validation.type === 'required'
                  ? <span style={{ color: 'red' }}>*</span>
                  : null
              }
            </Col>
            <Col sm={5}>
              {formCtrl}
              <FormControl.Feedback />
              <HelpBlock>{this.state.helpText}</HelpBlock>
            </Col>
            <Col sm={3}>
              {}
            </Col>
          </FormGroup>
        );
      } else {
        textField = (
          <FormGroup
            controlId={controlId}
          >
            <Col sm={2}>
              {}
            </Col>
            <Col componentClass={ControlLabel} sm={2}>
              {label}
            </Col>
            <Col sm={5}>
              {formCtrl}
            </Col>
            <Col sm={3}>
              {}
            </Col>
          </FormGroup>
        );
      }
    }
    return textField;
  }
}

import React, { Component, PropTypes } from 'react';

// 表单(form)控件(control/widget)
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

// 布局
import { Col } from 'react-bootstrap';

import validator from 'validator';

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
    inForm: false
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
     * <pre><code>{
     *   type: 'custom',
     *   helpText: '请输入正确的XX格式',
     *   matchFunc: () => {}
     * }</code></pre>
     * 当<code>matchFunc</code>返回值为true的时候，认为校验通过<br>
     * 对于自定义类型，如果不提供<code>helpText</code>，则默认不显示错误提示。
     */
    validation: PropTypes.object,
    /**
     * 是否没有被SSC自己的Form组件引用
     */
    inForm: PropTypes.bool,
    /**
     * 当文本框内容被修改时候调用
     */
    onChange: PropTypes.func
  };

  state = {
    value: this.props.value,
    helpBlock: ''
  };

  constructor(props) {
    super(props);
  }

  getValidationObj() {
    const { validation } = this.props;
    const vs = {
      email: {
        matchFunc: (value) => validator.isEmail(value),
        helpText: '请输入正确的邮箱格式！'
      },
      decimal: {
        matchFunc: (value) => validator.isDecimal(value),
        helpText: '请输入正确的数字格式！'
      },
      currency: {
        matchFunc: (value) => validator.isDecimal(value),
        helpText: '请输入正确的货币格式！'
      },
      int: {
        matchFunc: (value) => validator.isInt(value),
        helpText: '请输入正确的整数格式！'
      },
      mobilePhone: {
        matchFunc: (value) => validator.isMobilePhone(value, 'zh-CN'),
        helpText: '请输入正确的手机号格式!'
      }
    };

    let validationObj;

    if (validation.type === 'custom') {
      // 自定义格式
      validationObj = validation;
    } else {
      validationObj = vs[validation.type];
      if (validation.helpText) {
        // 自定义错误提示
        validationObj.helpText = validation.helpText;
      }
    }

    return validationObj;
  }

  getValidationState() {
    const { value } = this.state;
    let validationObj = this.getValidationObj();
    let validationResult = validationObj.matchFunc(value);
    return {
      stateText: validationResult ? 'success' : 'error',
      helpText: validationResult ? '' : validationObj.helpText
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    if (this.props.onChange) {
      this.props.onChange(event);
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
      />
    );
    if (!this.props.inForm) {
      if (validation) {
        let { stateText, helpText } = this.getValidationState();
        textField = (
          <FormGroup
            validationState={stateText}
            controlId={controlId}
          >
            {formCtrl}
            <FormControl.Feedback />
            <HelpBlock>{helpText}</HelpBlock>
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
        let { stateText, helpText } = this.getValidationState();
        textField = (
          <FormGroup
            validationState={stateText}
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
              <FormControl.Feedback />
              <HelpBlock>{helpText}</HelpBlock>
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

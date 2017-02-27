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
     * 校验类型，比如<code>email</code>
     */
    validationType: PropTypes.string,
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

  // 返回值应该是'success', 'warning'或者'error'
  getValidationState() {
    const vs = {
      email: {
        func: validator.isEmail,
        text: '请输入正确的邮箱格式！'
      }
    };
    const { validationType } = this.props;
    const { value } = this.state;
    let validationState = vs[validationType].func(value);
    return {
      validationState,
      helpBlock: validationState ? '' : vs[validationType].text
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
    const { controlId, label, validationType } = this.props;
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
      if (validationType) {
        textField = (
          <FormGroup
            validationState={this.getValidationState().validationState ? 'success' : 'error'}
            controlId={controlId}
          >
            {formCtrl}
            <FormControl.Feedback />
            <HelpBlock>{this.getValidationState().helpBlock}</HelpBlock>
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
      if (validationType) {
        textField = (
          <FormGroup
            validationState={this.getValidationState().validationState ? 'success' : 'error'}
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
              <HelpBlock>{this.getValidationState().helpBlock}</HelpBlock>
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

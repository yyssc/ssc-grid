import React, { Component, PropTypes } from 'react';

import { Col } from 'react-bootstrap';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

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
    validationState: null,
    showRequiredStar: false
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
     * 是否显示校验的样式
     */
    showValidationStyle: PropTypes.bool,
    /**
     * 是否没有被SSC自己的Form组件引用
     */
    inForm: PropTypes.bool,
    /**
     * one of: 'success', 'warning', 'error', null
     * 这是react-bootstrap中FormGroup的validationState的直接映射
     * https://react-bootstrap.github.io/components.html#forms-props-form-group
     */
    validationState: PropTypes.string,
    /**
     * 显示验证帮助
     */
    helpText: PropTypes.string,
    /**
     * 当文本框内容被修改时候调用
     */
    onChange: PropTypes.func,
    /**
     * 当是必选项的时候，显示一个红色的星号
     */
    showRequiredStar: PropTypes.bool
  };

  state = {
    value: this.props.value,
    helpText: '',
  };

  constructor(props) {
    super(props);
  }

  handleChange(event) {
    const { value } = event.target;

    this.setState({ value });

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  handleBlur(/* event */) {
  }

  handleFocus(/* event */) {
  }

  render() {
    const { controlId, label } = this.props;

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
    // 如果是在SSC自己的form中，需要在FormGroup中进行layout
    if (!this.props.inForm) {
      if (this.props.showValidationStyle) {
        textField = (
          <FormGroup
            validationState={this.props.validationState}
            controlId={controlId}
          >
            {formCtrl}
            <FormControl.Feedback />
            <HelpBlock>{this.props.helpText}</HelpBlock>
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
      if (this.props.showValidationStyle) {
        textField = (
          <FormGroup
            validationState={this.props.validationState}
            controlId={controlId}
          >
            <Col sm={2}>
              {}
            </Col>
            <Col componentClass={ControlLabel} sm={2}>
              {label}
              <span style={{ color: 'red' }}>
                {this.props.showRequiredStar ? '*' : null}
              </span>
            </Col>
            <Col sm={5}>
              {formCtrl}
              <FormControl.Feedback />
              <HelpBlock>{this.props.helpText}</HelpBlock>
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

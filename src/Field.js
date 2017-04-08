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
export default class Field extends Component {
  static defaultProps = {
    type: 'string'
  }

  static propTypes = {
    /**
     * form control id
     */
    controlId: PropTypes.string,
    /**
     * 显示验证帮助
     */
    helpText: PropTypes.string,
    /**
     * form control label
     */
    label: PropTypes.string,
    /**
     * 当文本框内容被修改时候调用
     */
    onChange: PropTypes.func,
    /**
     * 文本框占位字符
     */
    placeholder: PropTypes.string,
    /**
     * 字段类型
     */
    type: (props, propName, componentName) => {
      if (!/(string|double|enum)/.test(props[propName])) {
        return new Error(
          '`<' + componentName + ' ' + propName + '=' + props[propName] + ' ... >` ' +
          '错误的字段类型，字段类型必须是：string, double, enum之一'
        );
      }
    },
    /**
     * one of: 'success', 'warning', 'error', null
     * 这是react-bootstrap中FormGroup的validationState的直接映射
     * https://react-bootstrap.github.io/components.html#forms-props-form-group
     */
    validationState: PropTypes.string,
    /**
     * 文本框中显示的值
     */
    value: PropTypes.string
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
    const { controlId, helpText, label, type, validationState } = this.props;
    let formGroup;

    // 根据字段类型，生成不同的表单控件
    // 每个类型后面跟着的数字是后端传过来的datatype，这里提到的后端是
    // 用友自己的后端，Form组件并不依赖这些datetype数值，写在这里只是
    // 为了用友程序员调试方便。
    switch (type) {
      default:
      case 'string': // 0
      case 'double': // 2
        formGroup = (
          <FormGroup
            controlId={controlId}
            validationState={validationState}
          >
            <ControlLabel>{label}</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder={this.props.placeholder}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
            />
            <FormControl.Feedback />
            <HelpBlock>{helpText}</HelpBlock>
          </FormGroup>
        );
        break;
      case 'date': // 3
        break;
      case 'boolean': // 4
        break;
      case 'ref': // 5
        break;
      case 'enum': // 6
        break;
      case 'custom': // 后端没有该类型，这是前端自己定义的
        break;
      case 'hidden':
        break;
    }
    
    return formGroup;
  }
}

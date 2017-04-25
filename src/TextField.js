import React, { Component, PropTypes } from 'react';

import { FormControl } from 'react-bootstrap';

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
    value: ''
  }

  static propTypes = {
    /**
     * 当文本框内容被修改时候调用
     */
    onChange: PropTypes.func,
    /**
     * 文本框占位字符
     */
    placeholder: PropTypes.string,
    /**
     * 文本框中显示的值
     */
    value: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    // 更新输入框默认值
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
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
    return (
      <FormControl
        type="text"
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.handleChange.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      />
    );
  }
}

import React, { Component, PropTypes } from 'react';
import { default as ReactDatePicker } from 'react-datepicker';

/**
 * DatePicker2控件
 */
export default class DatePicker2 extends Component {
  static defaultProps = {
  }

  static propTypes = {
    /**
     * value
     */
    value: PropTypes.string,
    onChange: PropTypes.func
  };

  state = {
  };

  constructor(props) {
    super(props);
  }

  // date参数是moment.js生成的时间格式
  handleChange(/* date */) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    return (<ReactDatePicker
      onChange={this.handleChange.bind(this)} />);
  }
}

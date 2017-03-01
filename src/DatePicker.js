import React, { Component, PropTypes } from 'react';
import { default as ReactBootstrapDatePicker } from 'react-bootstrap-date-picker';

/**
 * DatePicker控件
 */
export default class DatePicker extends Component {
  static defaultProps = {
  }

  static propTypes = {
    id: PropTypes.string,
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

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    const { id, value } = this.props;
    return (<ReactBootstrapDatePicker
      id={id} value={value}
      dayLabels={['日', '一', '二', '三', '四', '五', '六']}
      monthLabels={['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']}
      dateFormat="YYYY-MM-DD"
      onChange={this.handleChange.bind(this)} />);
  }
}

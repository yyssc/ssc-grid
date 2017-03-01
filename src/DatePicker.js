import React, { Component, PropTypes } from 'react';
import { default as ReactBootstrapDatePicker } from 'react-bootstrap-date-picker';

/**
 * DatePicker控件
 */
export default class DatePicker extends Component {
  static defaultProps = {
    dateFormat: 'YYYY-MM-DD'
  }

  static propTypes = {
    id: PropTypes.string,
    /**
     * value
     */
    value: PropTypes.string,
    /**
     * 日期格式，支持如下集中格式
     * <pre><code>'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'</code></pre>
     */
    dateFormat: PropTypes.string,
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
    const { id, value, dateFormat } = this.props;
    return (<ReactBootstrapDatePicker
      id={id} value={value}
      dayLabels={['日', '一', '二', '三', '四', '五', '六']}
      monthLabels={['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']}
      dateFormat={dateFormat}
      onChange={this.handleChange.bind(this)}
    />);
  }
}

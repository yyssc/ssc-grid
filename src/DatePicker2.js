import React, { Component, PropTypes } from 'react';
import { default as ReactDatePicker } from 'react-datepicker';

import moment from 'moment';

/**
 * DatePicker2控件
 */
export default class DatePicker2 extends Component {
  static defaultProps = {
    dateFormat: 'YYYY-MM-DD'
  }

  static propTypes = {
    /**
     * 日期格式<br>
     * 遵循moment.js格式<br>
     * <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js文档</a>
     */
    dateFormat: PropTypes.string,
    /**
     * value 请使用ISO 8061格式
     */
    value: PropTypes.string,
    showMonthDropdown: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    /**
     * 参数：
     * - value: ISO 8061格式时间字符串
     * - formattedValue: 按照用户指定格式进行了格式化后的字符串
     * - momentDate: moment.js对象
     */
    onChange: PropTypes.func
  };

  state = {
  };

  constructor(props) {
    super(props);
  }

  // date参数是moment.js生成的时间格式
  handleChange(date) {
    if (this.props.onChange) {
      this.props.onChange(
        date.toDate().toISOString(), // ISO 8601
        date.format(this.props.dateFormat), // 使用moment.js按照用户指定的格式进行格式化
        date
      );
    }
  }

  render() {
    // 使用otherProps获取react-datepicker的属性，然后往下传
    const { value, ...otherProps } = this.props;
    return (<ReactDatePicker
      {...otherProps}
      selected={moment(value)}
      onChange={this.handleChange.bind(this)} />);
  }
}

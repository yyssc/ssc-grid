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
     * 日历悬浮窗自定义类名
     * https://hacker0x01.github.io/react-datepicker/#example-3
     */
    calendarClassName: PropTypes.string,
    /**
     * 文本框自定义类名
     * https://hacker0x01.github.io/react-datepicker/#example-2
     */
    className: PropTypes.string,
    /**
     * 日期格式<br>
     * 遵循moment.js格式<br>
     * <a href="https://momentjs.com/docs/#/displaying/format/">Moment.js文档</a>
     */
    dateFormat: PropTypes.string,
    /**
     * 参数：
     * - `value {String}`: ISO 8061格式时间字符串
     * - `formattedValue {String}`: 按照用户指定格式进行了格式化后的字符串
     * - `momentDate {Object}`: moment.js对象
     */
    onChange: PropTypes.func,
    showMonthDropdown: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    /**
     * value 请使用ISO 8061格式
     */
    value: PropTypes.string
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
    // 之前使用otherProps获取react-datepicker的属性，然后往下传
    // 但是出现了bug#11
    const { value, showMonthDropdown, showYearDropdown } = this.props;
    return (
      <ReactDatePicker
        className={this.props.className}
        calendarClassName={this.props.calendarClassName}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        selected={value ? moment(value) : null}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

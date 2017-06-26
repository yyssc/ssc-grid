import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import NumberPicker from './libs/NumberPicker';

/**
 * YearPicker控件
 * https://github.com/hnordt/react-year-picker/blob/master/index.babel.js
 */
export default class YearPicker extends Component {
  static displayName = 'YearPicker'
  static defaultProps = {
    yearFormat: 'YYYY',
    value: null
  }

  static propTypes = {
    /**
     * 年
     * 格式：`2017`
     */
    value: PropTypes.string,
    // value: PropTypes.oneOfType([
    //   PropTypes.string,
    //   PropTypes.number
    // ]),
    /**
     * 日期格式
     * 请参照[Moment.js文档](https://momentjs.com/docs/#/displaying/format/)中的日期格式
     * 比如：
     * ```
     * YYYY年MM月
     * ```
     */
    yearFormat: PropTypes.string,
    /**
     * 参数
     * - `value` 年月字符串，比如`"2017"`
     * - `formattedValue` 按照用户要求进行格式化之后的字符串，比如`"2017年"`
     */
    onChange: PropTypes.func
  };

  state = {
  };

  constructor(props) {
    super(props);
  }

  // year = 2002
  handleChange(year) {
    if (this.props.onChange) {
      let nextValue = this.formatYear(year, 'YYYY');
      let nextFormattedValue = this.formatYear(year, this.props.yearFormat);
      this.props.onChange(nextValue, nextFormattedValue);
    }
  }

  // 获得指定年生成的Moment实例
  // year = 2012
  // year = "2012"
  // return a Moment object instance
  getMomentObj(year) {
    return moment().year(year);
  }

  // year = 2012
  // year = "2012"
  formatYear(year, format) {
    return this.getMomentObj(year).format(format);
  }

  // value = 2016
  // currentValue = "2016"
  renderOption({ label, value }, currentValue) {
    if (this.getMomentObj(currentValue).get('year') === value) {
      return (
        <span className="badge" style={{ backgroundColor: value }}>
          {label}
        </span>
      );
    }
    return label;
  }

  render() {
    const { ...other } = this.props;

    let value = this.props.value || '';

    return (
      <div>
        <input />
        <NumberPicker
          {...other}
          min={2000}
          max={2020}
          value={value}
          renderOption={this.renderOption.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

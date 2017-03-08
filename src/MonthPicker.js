import React, { Component, PropTypes } from 'react';

import { default as BieRenDeLunZi } from 'react-month-picker';
import moment from 'moment';
import _ from 'lodash';

import MonthBox from './MonthBox';

const Lang = {
  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月',
    '九月', '十月', '十一月', '十二月']
};

/**
 * MonthPicker控件
 */
export default class MonthPicker extends Component {
  static defaultProps = {
    monthFormat: 'YYYY-MM',
    value: null
  }

  static propTypes = {
    /**
     * 月份
     * 格式：`2017-02`
     */
    value: PropTypes.string,
    /**
     * 日期格式
     * 请参照[Moment.js文档](https://momentjs.com/docs/#/displaying/format/)中的日期格式
     * 比如：
     * ```
     * YYYY年MM月
     * ```
     */
    monthFormat: PropTypes.string,
    /**
     * 参数
     * - `value {String}` 年月字符串，比如`2017-02`
     * - `formattedValue {String}` 按照用户要求进行格式化之后的字符串，比如`2017年02月`
     */
    onChange: PropTypes.func
  };

  state = {
  };

  constructor(props) {
    super(props);
  }

  // 由于react-month-picker的设计缺陷，month返回来是int而不是string
  // 比如`2017-03`，实际返回的`month = 3`，而不是`month = "03"`
  // 所以我们需要自己做这个转换。
  handleChange(year, month) {
    if (this.props.onChange) {
      month = _.padStart(month, 2, '0');
      const value = `${year}-${month}`;
      this.props.onChange(
        value,
        moment(value).format(this.props.monthFormat)
      );
    }
  }

  handleDissmis(/* value */) {
  }

  handleClickMonthBox(/* event */) {
    this.refs.pickAMonth.show();
  }

  render() {
    const { value, monthFormat } = this.props;
    let formattedValue;
    let yearMonthValue;

    if (value) {
      formattedValue = moment(value).format(monthFormat);
      // 输入2017-02
      // 输出{ year: 2017, month: 2 }
      yearMonthValue = {
        year: moment(value).toArray()[0],
        month: moment(value).toArray()[1] + 1
      };
    } else {
      formattedValue = '';
      yearMonthValue = {};
    }

    return (<BieRenDeLunZi
      ref="pickAMonth"
      years={_.range(1000, 9999, 1)}
      value={yearMonthValue}
      lang={Lang.months}
      onChange={this.handleChange.bind(this)}
      onDismiss={this.handleDissmis.bind(this)}
    >
      <MonthBox value={formattedValue}
        onClick={this.handleClickMonthBox.bind(this)} />
    </BieRenDeLunZi>);
  }
}

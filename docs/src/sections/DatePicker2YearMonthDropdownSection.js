import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function DatePicker2FormatterSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="date-picker2-year-month-dropdown">年份、月份下拉快速选择</Anchor></h3>
      <p></p>
      <ReactPlayground codeText={Samples.DatePicker2YearMonthDropdown} />
    </div>
  );
}

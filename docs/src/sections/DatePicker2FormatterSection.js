import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function DatePicker2FormatterSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="date-picker2-formatter">DatePicker2格式化</Anchor></h3>
      <p>请使用Moment.js提供的格式化方法，参照<a href="https://momentjs.com/docs/#/displaying/format/">Moment.js文档</a></p>
      <ReactPlayground codeText={Samples.DatePicker2Formatter} />
    </div>
  );
}

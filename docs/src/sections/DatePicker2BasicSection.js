import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function DatePicker2BasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="date-picker2-description">DatePicker2组件</Anchor> <small><code>&lt;DatePicker2&gt;</code></small>
      </h2>

      <h3><Anchor id="date-picker2-basic">简单DatePicker2</Anchor></h3>
      <p>DatePicker2组件是对
      <a href="https://github.com/Hacker0x01/react-datepicker">react-datepicker</a>的封装，
      如果您对本封装不满意，可以直接使用react-datepicker组件。</p>
      <p>导入方法：<code>{`import { DatePicker2 } from 'ssc-grid'`}</code></p>
      <ReactPlayground codeText={Samples.DatePicker2Basic} />
    </div>
  );
}

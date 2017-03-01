import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function DatePickerBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="date-picker-description">DatePicker组件</Anchor> <small><code>&lt;DatePicker&gt;</code></small>
      </h2>

      <h3><Anchor id="date-picker-basic">简单DatePicker</Anchor></h3>
      <p>导入方法：<code>{`import { DatePicker } from 'ssc-grid'`}</code></p>
      <ReactPlayground codeText={Samples.DatePickerBasic} />
    </div>
  );
}

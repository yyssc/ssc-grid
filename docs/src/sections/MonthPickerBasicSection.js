import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function MonthPickerBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="month-picker-description">MonthPicker组件</Anchor> <small><code>&lt;MonthPicker&gt;</code></small>
      </h2>

      <h3><Anchor id="month-picker-basic">简单MonthPicker</Anchor></h3>
      <p>导入方法：<code>{`import { MonthPicker } from 'ssc-grid'`}</code></p>
      <ReactPlayground codeText={Samples.MonthPickerBasic} />
    </div>
  );
}

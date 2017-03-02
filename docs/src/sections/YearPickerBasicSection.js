import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function YearPickerBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="year-picker-description">YearPicker组件</Anchor> <small><code>&lt;YearPicker&gt;</code></small>
      </h2>

      <h3><Anchor id="year-picker-basic">简单YearPicker</Anchor></h3>
      <p>导入方法：<code>{`import { YearPicker } from 'ssc-grid'`}</code></p>
      <ReactPlayground codeText={Samples.YearPickerBasic} />
    </div>
  );
}

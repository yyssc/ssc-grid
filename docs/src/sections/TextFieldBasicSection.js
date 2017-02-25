import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TextFieldBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="text-field-description">TextField组件（输入框组件）</Anchor> <small><code>&lt;TextField&gt;</code></small>
      </h2>

      <h3><Anchor id="text-field-basic">简单输入框</Anchor></h3>
      <p>导入方法：<code>{`import { TextField } from 'ssc-grid'`}</code></p>
      <ReactPlayground codeText={Samples.TextFieldBasic} />
    </div>
  );
}

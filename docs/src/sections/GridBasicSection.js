import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="grid-description">Grid组件（表格组件）</Anchor> <small><code>&lt;Grid&gt;</code></small>
      </h2>

      <h3><Anchor id="grid-basic">简单表格</Anchor></h3>
      <p>使用<code>tableData</code>参数可以往表格中传入数据。</p>
      <p>导入方法：<code>{`import { Grid } from 'ssc-comp'`}</code></p>
      <ReactPlayground codeText={Samples.GridBasic} />
    </div>
  );
}

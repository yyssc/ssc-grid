import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ReferSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="grid">Refer组件（参照组件）</Anchor> <small><code>&lt;Refer&gt;</code></small>
      </h2>

      <h3><Anchor id="grids-basic">简单参照</Anchor></h3>
      <p>使用<code>tableData</code>参数可以往表格中传入数据。</p>
      <ReactPlayground codeText={Samples.ReferBasic} />

      <h3><Anchor id="grid-props">属性</Anchor></h3>
      <PropTable component="Grid"/>
    </div>
  );
}

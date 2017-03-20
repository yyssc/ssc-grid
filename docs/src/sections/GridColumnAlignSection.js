import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridColumnAlignSection() {
  const code = `.table-head-jine {
  width: 100px;
}`;
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-column-align">列的对齐方式</Anchor></h3>
      <p>在传入的参数<code>columnsModel</code>中添加<code>align</code>来指定单元格的对齐方式</p>
      <p>提供三种对齐方式：<code>left, center, right</code></p>
      <p>对于<code>type: 'double'</code>的情况，默认使用右对齐</p>
      <ReactPlayground codeText={Samples.GridColumnAlign} />
    </div>
  );
}

import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridCellFormatterSection() {
  const code = `.table-head-jine {
  width: 100px;
}`;
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-cell-formatter">单元格格式化</Anchor></h3>
      <p>在传入的参数<code>columnsModel</code>中添加<code>formatter</code>来指定单元格的格式化方式</p>
      <p>不同的类型有不同的格式化参数</p>
      <p>对于<code>date</code>类型，直接使用<code>moment().format()</code>进行格式化
      所以具体参数请参照<a href="https://momentjs.com/docs/#/displaying/format/">Moment.js文档</a></p>
      <ReactPlayground codeText={Samples.GridCellFormatter} />
    </div>
  );
}

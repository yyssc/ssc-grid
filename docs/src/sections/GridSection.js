import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="grid">Grid组件（表格组件）</Anchor> <small><code>&lt;Grid&gt;</code></small>
      </h2>

      <h3><Anchor id="grids-basic">简单表格</Anchor></h3>
      <p>使用<code>tableData</code>参数可以往表格中传入数据。</p>
      <p>导入方法：<code>{`import { Grid } from 'ssc-grid'`}</code></p>
      <ReactPlayground codeText={Samples.GridBasic} />

      <h3><Anchor id="grids-operation-column">带操作列的表格</Anchor></h3>
      <p></p>
      <ReactPlayground codeText={Samples.GridOperation} />

      <h3><Anchor id="grids-pagination">显示分页</Anchor></h3>
      <p>使用<code>paging</code>参数显示分页</p>
      <ReactPlayground codeText={Samples.GridPagination} />

      <h3><Anchor id="grid-props">属性</Anchor></h3>
      <PropTable component="Grid"/>
    </div>
  );
}

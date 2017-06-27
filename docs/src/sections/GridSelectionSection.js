import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-selection">行选择</Anchor></h3>
      <p>使用<code>selectRow</code>参数显示行选择复选框/单选框</p>
      <ReactPlayground codeText={Samples.GridSelection} />
      <p>带有分页的情况</p>
      <ReactPlayground codeText={Samples.GridSelectionWithPagination} />
      <p><code>onBeforeSelect</code>回调</p>
      <p>使用场景：表格其中一列定义为“启用状态”，类型为布尔，产品定义只有“已经启用”的行才能够
      被勾选，当用户勾选“未启用”行时候，给出提示，并且不勾选复选框</p>
      <ReactPlayground codeText={Samples.GridSelectionBeforeSelect} />
      <p>Initialize grid with selected rows</p>
      <ReactPlayground codeText={Samples.GridSelectionInitSelected} />
    </div>
  );
}

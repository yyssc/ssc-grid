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
    </div>
  );
}

import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-pagination">显示分页</Anchor></h3>
      <p>使用<code>paging</code>参数显示分页</p>
      <ReactPlayground codeText={Samples.GridPagination} />
    </div>
  );
}

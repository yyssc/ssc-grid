import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TreeReferSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="treeRefer">参照组件（树形参照组件）</Anchor> <small><code>&lt;TreeRefer&gt;</code></small>
      </h2>

      <h3><Anchor id="grids-basic">树形参照组件</Anchor></h3>
      <p>使用<code>treeData</code>参数可以往参照中传入数据。</p>
      <ReactPlayground codeText={Samples.ReferTree} />
    </div>
  );
}

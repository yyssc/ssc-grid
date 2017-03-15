import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TreeBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="tree-description">Tree组件</Anchor> <small><code>&lt;Tree&gt;</code></small>
      </h2>

      <h3><Anchor id="tree-basic">简单树</Anchor></h3>
      <p>导入方法：<code>{`import { Tree } from 'ssc-grid'`}</code></p>
      <ReactPlayground codeText={Samples.TreeBasic} />
    </div>
  );
}

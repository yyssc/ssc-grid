import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function DropdownSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="dropdown-description">Dropdown组件（下来菜单组件）</Anchor> <small><code>&lt;Dropdown&gt;</code></small>
      </h2>

      <h3><Anchor id="dropdown-basic">简单下拉菜单</Anchor></h3>
      <p>导入方法：<code>{`import { Dropdown } from 'ssc-grid'`}</code></p>
      <ReactPlayground codeText={Samples.DropdownBasic} />
    </div>
  );
}

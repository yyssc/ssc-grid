import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridStyleSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-style">表格样式</Anchor></h3>
      <p>沿用bootstrap的样式，具体参照
      <a href="http://getbootstrap.com/css/#tables-striped">Striped rows</a>等</p>
      <ReactPlayground codeText={Samples.GridStyle} />
    </div>
  );
}

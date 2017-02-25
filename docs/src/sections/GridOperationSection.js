import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-operation">带操作列的表格</Anchor></h3>
      <p></p>
      <ReactPlayground codeText={Samples.GridOperation} />
    </div>
  );
}

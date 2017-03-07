import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridLocalSearchSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-local-search">本地搜索</Anchor></h3>
      <ReactPlayground codeText={Samples.GridLocalSearch} />
    </div>
  );
}

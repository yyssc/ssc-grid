import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="grid">Grid</Anchor> <small>Grid</small>
      </h2>

      <p>Use the <code>striped</code>, <code>bordered</code>, <code>condensed</code> and <code>hover</code> props to customise the grid.</p>
      <ReactPlayground codeText={Samples.GridBasic} />

      <h3><Anchor id="grid-props">Props</Anchor></h3>
      <PropTable component="Grid"/>
    </div>
  );
}

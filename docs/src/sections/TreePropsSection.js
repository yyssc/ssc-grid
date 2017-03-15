import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';

export default function TreePropsSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="tree-props">属性</Anchor></h3>
      <PropTable component="Tree"/>
    </div>
  );
}

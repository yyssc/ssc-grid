import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridEmptyValueSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-empty-value">演示空值</Anchor></h3>
      <p>演示传入的<code>null</code>或者<code>undefined</code>，
      或者有一行没有任何数据，比如<code>{}</code></p>
      <ReactPlayground codeText={Samples.GridEmptyValue} />
    </div>
  );
}

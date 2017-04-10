import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-layout">自定义布局</Anchor></h3>
      <p>通过<code>layout</code>属性来自定义布局</p>
      <ReactPlayground codeText={Samples.FormLayout} />
    </div>
  );
}

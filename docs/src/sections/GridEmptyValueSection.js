import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridEmptyValueSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-empty-value">演示空值</Anchor></h3>
      <p>演示传入空值</p>
      <p>第一行所有列都没有数据，比如<code>{`{}`}</code></p>
      <p>第二行所有列都是<code>undefined</code>，比如<code>{`{"name": undefined, "code": undefined}`}</code></p>
      <p>第三行所有列都是<code>null</code>，比如<code>{`{"name": undefined, "code": undefined}`}</code></p>
      <ReactPlayground codeText={Samples.GridEmptyValue} />
    </div>
  );
}

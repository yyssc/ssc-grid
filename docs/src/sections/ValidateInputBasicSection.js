import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ValidateInputBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="validate-input-description">ValidateInput组件</Anchor> <small><code>&lt;ValidateInput&gt;</code></small>
      </h2>
      <h3><Anchor id="validate-input-basic">输入框校验</Anchor></h3>
      <p>通过参数<code>type: 'email'</code>来指定校验类型为Email地址</p>
      <ReactPlayground codeText={Samples.ValidateInputBasic} />
    </div>
  );
}

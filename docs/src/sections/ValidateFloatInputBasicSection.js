import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ValidateFloatInputBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="validate-float-input-description">ValidateFloatInput组件</Anchor> <small><code>&lt;ValidateFloatInput&gt;</code></small>
      </h2>
      <h3><Anchor id="validate-float-input-basic">输入框校验</Anchor></h3>
      <ReactPlayground codeText={Samples.ValidateFloatInputBasic} />
    </div>
  );
}

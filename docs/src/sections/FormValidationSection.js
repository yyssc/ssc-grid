import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-validation">数据校验</Anchor></h3>
      <p></p>
      <ReactPlayground codeText={Samples.FormValidation} />
      <ReactPlayground codeText={Samples.FormValidation2} />
    </div>
  );
}

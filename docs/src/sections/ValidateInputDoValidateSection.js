import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ValidateInputDoValidateSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="validate-input-do-validate">主动校验</Anchor></h3>
      <ReactPlayground codeText={Samples.ValidateInputDoValidate} />
    </div>
  );
}

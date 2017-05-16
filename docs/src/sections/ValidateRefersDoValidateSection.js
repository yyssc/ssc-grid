import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ValidateRefersDoValidateSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="validate-refers-do-validate">主动校验</Anchor></h3>
      <ReactPlayground codeText={Samples.ValidateRefersDoValidate} />
    </div>
  );
}

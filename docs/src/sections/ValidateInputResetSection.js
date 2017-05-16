import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ValidateInputResetSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="validate-input-reset">重置文本框</Anchor></h3>
      <ReactPlayground codeText={Samples.ValidateInputReset} />
    </div>
  );
}

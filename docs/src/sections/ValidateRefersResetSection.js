import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ValidateRefersResetSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="validate-refers-reset">重置参照</Anchor></h3>
      <ReactPlayground codeText={Samples.ValidateRefersReset} />
    </div>
  );
}

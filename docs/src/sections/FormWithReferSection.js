import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-with-refer">参照</Anchor></h3>
      <p>带有参照的表单</p>
      <ReactPlayground codeText={Samples.FormWithRefer} />
    </div>
  );
}

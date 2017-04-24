import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormDisabledFieldsSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-disabled-fields">禁用表单字段</Anchor></h3>
      <p>通过<code>fieldModel.disabled</code>属性来禁用对应字段</p>
      <ReactPlayground codeText={Samples.FormDisabledFields} />
    </div>
  );
}

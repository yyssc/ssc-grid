import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-custom-field">自定义类型的字段</Anchor></h3>
      <p>自定义类型的字段</p>
      <ReactPlayground codeText={Samples.FormCustomField} />
    </div>
  );
}

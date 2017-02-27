import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function TextFieldBasicSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="text-field-validation">输入框校验</Anchor></h3>
      <p>通过参数<code>validationType="email"</code>来指定校验类型为Email地址</p>
      <ReactPlayground codeText={Samples.TextFieldValidation} />
    </div>
  );
}

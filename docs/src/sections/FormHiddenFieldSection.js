import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-hidden-field">隐藏字段</Anchor></h3>
      <p>使用<code>type: 'hidden'</code>参数可以将字段设置为隐藏，类似于input标签type=hidden</p>
      <ReactPlayground codeText={Samples.FormHiddenField} />
    </div>
  );
}

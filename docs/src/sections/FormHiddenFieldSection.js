import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-hidden-field">隐藏字段</Anchor></h3>
      <p>使用<code>hidden: true</code>参数可以将字段设置为隐藏。</p>
      <p>隐藏字段不仅仅不显示在UI上，同样不会被渲染到DOM中，只会存在于Form组件的state中</p>
      <ReactPlayground codeText={Samples.FormHiddenField} />
    </div>
  );
}

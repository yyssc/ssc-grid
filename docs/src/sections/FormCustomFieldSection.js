import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormCustomFieldSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-custom-field">自定义类型的字段</Anchor></h3>
      <p>演示了“文本框”、“下拉菜单”和“参照”三种自定义类型的字段。</p>
      <p>通过下拉菜单可以设置参照的refCode参数，从而显示不同的参照。</p>
      <ReactPlayground codeText={Samples.FormCustomField} />
    </div>
  );
}

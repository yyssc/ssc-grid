import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ValidateRefersBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="validate-refers-description">ValidateRefers组件</Anchor> <small><code>&lt;ValidateRefers&gt;</code></small>
      </h2>
      <h3><Anchor id="validate-refers-basic">参照校验</Anchor></h3>
      <p>通过指定<code>validators</code>属性，<code>&lt;ValidateInput&gt;</code>组件支持如下内置校验类型：</p>
      <p>
        <ul>
          <li><code>required</code>: 必输项</li>
        </ul>
      </p>
      <p>通过指定参数<code>type: 'required'</code>来指定校验类型为必输项</p>
      <pre><code>{`[
  {
    type: 'required',
  }
]`}</code></pre>
      <p>使用内置校验类型，默认的提示信息也是内置的。如果需要自定义提示信息，可以使用<code>helpText</code></p>
      <p>比如对字符长度做校验</p>
      <pre><code>{`[
  {
    type: 'required',
    helpText: (value, validator) =>
    '自定义提示：' +
    '您输入的内容是：\${value}，',
  }
]`}</code></pre>
      <p>通过指定<code>type: 'custom'</code>还可以使用自定义校验，然后提供校验函数</p>
      <pre><code>{`[
  {
    type: 'custom',
    matchFunc: value => value.length > 5,
    helpText: (value, validator) =>
    '自定义提示：' +
    '您输入的文字是：\${value}，字符长度必须大于5',
  }
]`}</code></pre>
      <ReactPlayground codeText={Samples.ValidateRefersBasic} />
    </div>
  );
}

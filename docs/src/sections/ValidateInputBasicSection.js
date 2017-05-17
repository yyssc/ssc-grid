import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function ValidateInputBasicSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="validate-input-description">ValidateInput组件</Anchor> <small><code>&lt;ValidateInput&gt;</code></small>
      </h2>
      <h3><Anchor id="validate-input-basic">输入框校验</Anchor></h3>
      <p>通过指定<code>validators</code>属性，<code>&lt;ValidateInput&gt;</code>组件支持如下内置校验类型：</p>
      <ul>
        <li><code>currency</code>: 货币</li>
        <li><code>decimal</code>: 数字</li>
        <li><code>email</code>: 电子邮件地址</li>
        <li><code>int</code>: 整数</li>
        <li><code>length</code>: 字符长度</li>
        <li><code>mobilePhone</code>: 手机号</li>
        <li><code>required</code>: 必输项</li>
      </ul>
      <p>通过指定参数<code>type: 'email'</code>来指定校验类型为Email地址</p>
      <pre><code>{`[
  {
    type: 'email',
  }
]`}</code></pre>
      <p>使用内置校验类型，默认的提示信息也是内置的。如果需要自定义提示信息，可以使用<code>helpText</code></p>
      <p>比如对字符长度做校验</p>
      <pre><code>{`[
  {
    type: 'length',
    options: { min: 3, max: 6 },
    helpText: (value, validator) =>
      '自定义提示：' +
      '您输入的邮件地址是：\${value}，' +
      '请确保邮件地址长度在\${validatos.options.min}和\${validatos.options.max}之间',
  }
]`}</code></pre>
      <p><code>validators</code>属性的类型是数组，也就是支持多重校验</p>
      <p>比如校验email类型，并且字符长度在3到6范围内</p>
      <pre><code>{`[
  {
    type: 'email',
  },
  {
    type: 'length',
    options: { min: 3, max: 6 },
  },
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
      <ReactPlayground codeText={Samples.ValidateInputBasic} />
    </div>
  );
}

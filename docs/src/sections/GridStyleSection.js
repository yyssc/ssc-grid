import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridStyleSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-style">表格样式</Anchor></h3>
      <p>沿用bootstrap的样式，具体参照
      <a href="http://getbootstrap.com/css/#tables-striped">Striped rows</a>等</p>
      <p>通过添加<code>bordered</code>为表格和其中的每个单元格增加边框。</p>
      <p>通过添加<code>striped</code>可以给表体之内的每一行增加斑马条纹样式。</p>
      <p>通过添加<code>condensed</code>可以让表格更加紧凑，单元格中的内补（padding）均会减半。</p>
      <p>通过添加<code>hover</code>可以让表体中的每一行对鼠标悬停状态作出响应</p>
      <ReactPlayground codeText={Samples.GridStyle} />
    </div>
  );
}

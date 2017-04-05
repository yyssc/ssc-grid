import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-operation">带操作列的表格</Anchor></h3>
      <p>可以通过<code>operationColumn</code>参数来对操作列进行定制</p>
      <p><code>operationColumn.align = left/right</code>指定操作列在表格的左侧还是右侧</p>
      <p><code>operationColumn.className</code>指定操作列的CSS 类名</p>
      <p><code>operationColumn.text</code>指定操作列头的文字</p>
      <ReactPlayground codeText={Samples.GridOperation} />
    </div>
  );
}

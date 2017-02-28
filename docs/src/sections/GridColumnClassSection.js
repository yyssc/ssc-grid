import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridColumnClassSection() {
  const code = `.table-head-jine {
  width: 100px;
}`;
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-column-class">列类名</Anchor></h3>
      <p>定义列的className，方便添加样式，比如定义列宽</p>
      <p>在传入的参数<code>columnsModel</code>中添加<code>className</code>来定义HTML class。
      会被添加到<code>&lt;th&gt;</code>上。</p>
      <p>比如下面例子中，可以通过为<code>.table-head-jine</code>添加样式来设定列宽</p>
      <pre><code>{code}</code></pre>
      <ReactPlayground codeText={Samples.GridColumnClass} />
    </div>
  );
}

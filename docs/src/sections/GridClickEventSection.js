import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridClickEventSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-click-event">鼠标点击事件</Anchor></h3>
      <ReactPlayground codeText={Samples.GridClickEvent} />
    </div>
  );
}

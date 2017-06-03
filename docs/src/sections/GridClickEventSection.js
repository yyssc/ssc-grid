import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridClickEventSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-click-event">Mouse click events</Anchor></h3>
      <p>
        The event handlers below are all triggered by events in the bubbling phase.
        This means <code>onCellClick</code> will be called before <code>onRowClick</code>,
        because <code>onCellClick</code> is registered on <code>td</code> tag
        and <code>onRowClick</code> is registered on <code>tr</code> tag.
      </p>
      <ReactPlayground codeText={Samples.GridClickEvent} />
    </div>
  );
}

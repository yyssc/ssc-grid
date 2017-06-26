import React from 'react';
import { FormattedMessage } from 'react-intl';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridColumnAlignSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="grid-column-align">
        <FormattedMessage
          id="doc.sections.grid-column-align.title"
          description="Example sections grid-column-align title"
          defaultMessage="Table body column alignment"
        />
      </Anchor></h3>
      <p>
        <FormattedMessage
          id="doc.sections.grid-column-align.p1"
          description="Example sections grid-column-align paragraph"
          defaultMessage={`The align attribute of columnsModel specifies the horizontal alignment of the content in all cells in one column.
align: 'right' is the shorthand or columnClassName: 'text-right'`}
        />
      </p>
      <p>提供三种对齐方式：<code>left, center, right</code></p>
      <p>对于<code>type: 'double'</code>的情况，默认使用右对齐</p>
      <ReactPlayground codeText={Samples.GridColumnAlign} />
      <p>
        <FormattedMessage
          id="doc.sections.grid-column-align.p.align-vs-formatter"
          description="Example sections grid-column-align paragraph"
          defaultMessage={`The align attribute will override the default alignment for cells.
And the columnClassName attribute will override all other alignments.`}
        />
      </p>
      <ReactPlayground codeText={Samples.GridColumnAlign2} />
    </div>
  );
}

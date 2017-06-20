import React from 'react';
import { FormattedMessage } from 'react-intl';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function GridSection() {
  return (
    <div className="bs-docs-section">
      <h2 className="page-header">
        <Anchor id="grid-description">
          <FormattedMessage
            id="doc.sections.grid-basic.description"
            description="Example sections grid-basic description"
            defaultMessage="Grid component (table component)"
          />
        </Anchor> <small><code>&lt;Grid&gt;</code></small>
      </h2>

      <h3><Anchor id="grid-basic">
        <FormattedMessage
          id="doc.sections.grid-basic.title"
          description="Example sections grid-basic title"
          defaultMessage="Simple table"
        />
      </Anchor></h3>
      <p>
        <FormattedMessage
          id="doc.sections.grid-basic.p1"
          description="Example sections grid-basic paragraph"
          defaultMessage="Use tableData prop to import table data."
        />
      </p>
      <p>
        <FormattedMessage
          id="doc.sections.grid-basic.p2"
          description="Example sections grid-basic paragraph"
          defaultMessage="Import Grid component from ssc-grid:"
        />
        <code>{`import { Grid } from 'ssc-grid'`}</code>
      </p>
      <ReactPlayground codeText={Samples.GridBasic} />
    </div>
  );
}

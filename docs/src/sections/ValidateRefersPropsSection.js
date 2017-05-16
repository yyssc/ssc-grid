import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';

export default function ValidateRefersPropsSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="validate-refers-props">属性</Anchor></h3>
      <PropTable component="ValidateRefers"/>
    </div>
  );
}

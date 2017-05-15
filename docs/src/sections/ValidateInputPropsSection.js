import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';

export default function ValidateInputPropsSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="validate-input-props">属性</Anchor></h3>
      <PropTable component="ValidateInput"/>
    </div>
  );
}

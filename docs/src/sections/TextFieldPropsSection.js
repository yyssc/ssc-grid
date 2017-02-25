import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';

export default function TextFieldPropsSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="text-field-props">属性</Anchor></h3>
      <PropTable component="TextField"/>
    </div>
  );
}

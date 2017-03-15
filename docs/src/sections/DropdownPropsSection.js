import React from 'react';

import Anchor from '../Anchor';
import PropTable from '../PropTable';

export default function DropdownSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="dropdown-props">属性</Anchor></h3>
      <PropTable component="Dropdown"/>
    </div>
  );
}

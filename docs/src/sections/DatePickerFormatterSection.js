import React from 'react';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function DatePickerFormatterSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="date-picker-formatter">DatePicker格式化</Anchor></h3>
      <p></p>
      <ReactPlayground codeText={Samples.DatePickerFormatter} />
    </div>
  );
}

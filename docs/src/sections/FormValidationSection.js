import React from 'react';
import { FormattedMessage } from 'react-intl';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

export default function FormSection() {
  return (
    <div className="bs-docs-section">
      <h3><Anchor id="form-validation">
        <FormattedMessage
          id="doc.sections.form-validation.title"
          description="Example sections form-validation title"
          defaultMessage="Form validation"
        />
      </Anchor></h3>
      <p>
        <FormattedMessage
          id="doc.sections.form-validation.p1"
          description="Example sections form-validation paragraph"
          defaultMessage="No description."
        />
      </p>
      <ReactPlayground codeText={Samples.FormValidation} />
      <p>
        <FormattedMessage
          id="doc.sections.form-validation.p2"
          description="Example sections form-validation paragraph"
          defaultMessage="No description."
        />
      </p>
      <ReactPlayground codeText={Samples.FormValidation2} />
      <p>
        <FormattedMessage
          id="doc.sections.form-validation.p3"
          description="Example sections form-validation paragraph"
          defaultMessage="Call submit() from ref, will show validation state on form controls, then if successing in validation, will call onSubmit() callback."
        />
      </p>
      <ReactPlayground codeText={Samples.FormValidation3} />
    </div>
  );
}

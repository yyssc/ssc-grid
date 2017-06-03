import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import zh from 'react-intl/locale-data/zh';

import Anchor from '../Anchor';
import ReactPlayground from '../ReactPlayground';
import Samples from '../Samples';

addLocaleData([...en, ...fr, ...zh]);
const messages = {
  zh: {
    'doc.grid-click-event.title': '鼠标点击事件',
    'doc.grid-click-event.body': '先调用onCellClick然后再调用onRowClick',
  }
};

export default function GridClickEventSection({ locale }) {
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
    >
      <div className="bs-docs-section">
        <h3>
          <Anchor id="grid-click-event">
            <FormattedMessage
              id="doc.grid-click-event.title"
              description="Mouse click event documents"
              defaultMessage={`Mouse click events`}
            />
          </Anchor>
        </h3>
        <p>
          <FormattedMessage
              id="doc.grid-click-event.body"
              description="Mouse click event documents"
              defaultMessage={`The event handlers below are all triggered by events in the bubbling phase.
  This means {onCellClick} will be called before {onRowClick},
  because {onCellClick} is registered on {td} tag
  and {onRowClick} is registered on {tr} tag.`}
              values={{
                onCellClick: <code>onCellClick</code>,
                onCellDoubleClick: <code>onCellClick</code>,
                onRowClick: <code>onCellClick</code>,
                onRowDoubleClick: <code>onCellClick</code>,
                td: <code>td</code>,
                tr: <code>tr</code>,
              }}
          />
        </p>
        <ReactPlayground codeText={Samples.GridClickEvent} />
      </div>
    </IntlProvider>
  );
}

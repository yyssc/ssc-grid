import React from 'react';
import createReactClass from 'create-react-class';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import zh from 'react-intl/locale-data/zh';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

addLocaleData([...en, ...fr, ...zh]);

const messages = {
  zh: {
    'doc.not-found-page.page-header.title': '404',
    'doc.not-found-page.page-header.sub-title': '页面没有找到',
  },
};

const NotFoundPage = createReactClass({
  render() {
    return (
      <IntlProvider
        locale={'en'}
        messages={messages.en}
      >
        <div>
          <NavMain activePage="" />

          <PageHeader
            subTitle=""
            titleFormatMessageId="doc.not-found-page.page-header.title"
            titleFormatMessageDescription="Page header title"
            titleFormatMessageDefaultMessage="404"
            subTitleFormatMessageId="doc.not-found-page.page-header.sub-title"
            subTitleFormatMessageDescription="Page header sub-title"
            subTitleFormatMessageDefaultMessage="Hmmm this is awkward."
          />

          <PageFooter />
        </div>
      </IntlProvider>
    );
  }
});

export default NotFoundPage;

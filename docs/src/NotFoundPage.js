import React from 'react';
import createReactClass from 'create-react-class';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

const NotFoundPage = createReactClass({
  render() {
    return (
        <div>
          <NavMain activePage="" />

          <PageHeader
            title="404"
            subTitle="Hmmm this is awkward." />

          <PageFooter />
        </div>
      );
  }
});

export default NotFoundPage;

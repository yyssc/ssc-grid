import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <NavMain activePage="home" />

        <main className="bs-docs-masthead" id="content" role="main">
          <div className="container">
            <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline"></span>
            <p className="lead">SSC 3.0 React组件库</p>
          </div>
        </main>

        <PageFooter />
      </div>
    );
  }
}

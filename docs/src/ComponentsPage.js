import React from 'react';
import AutoAffix from 'react-overlays/lib/AutoAffix';
import Waypoint from 'react-waypoint';

// import Nav from '../../src/Nav';
// import NavItem from '../../src/NavItem';
import { Nav, NavItem } from 'react-bootstrap';

import Anchor from './Anchor';
import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';
import SubNav from './SubNav';

import GridSection from './sections/GridSection';

// order matters
/* eslint-disable indent */
const sections = {
  layout: '#page-layout',
    grid: '#grid'
};
/* eslint-enable indent */

let ScrollSpy = ({ href, onBefore, onAfter }) => (
  <Waypoint
    onEnter={({ previousPosition }) => (
      previousPosition === Waypoint.above && onBefore(href)
    )}
    onLeave={({ currentPosition }) => (
      currentPosition === Waypoint.above && onAfter(href)
    )}
    topOffset={10}
    bottomOffset={-10}
  />
);

const ComponentsPage = React.createClass({
  getInitialState() {
    return {
      activeNavItemHref: null
    };
  },

  getMain() {
    return this.refs.main;
  },

  handleNavItemSelect(key, e) {
    window.location = e.target.href;
  },

  componentDidMount() {
    this.afterSections = {};
    Object.keys(sections).forEach(
      key => this.afterSections[sections[key]] = false
    );

    const { hash } = window.location;
    if (this.afterSections[hash] !== undefined) {
      for (const href of Object.keys(this.afterSections)) {
        this.afterSections[href] = true;

        if (href === hash) {
          this.setActiveNavItem();
          break;
        }
      }
    }
  },

  setActiveNavItem() {
    let activeNavItemHref = null;

    for (const href of Object.keys(this.afterSections)) {
      if (!this.afterSections[href]) {
        break;
      }

      activeNavItemHref = href;
    }

    this.setState({ activeNavItemHref });
  },

  renderScrollSpy(href) {
    return (
      <ScrollSpy
        href={href}
        onBefore={this.onBefore}
        onAfter={this.onAfter}
      />
    );
  },

  onBefore(href) {
    this.afterSections[href] = false;
    this.updateActiveHref();
  },

  onAfter(href) {
    this.afterSections[href] = true;
    this.updateActiveHref();
  },

  updateActiveHref() {
    if (this.updateActiveHrefHandle != null) {
      return;
    }

    this.updateActiveHrefHandle = setTimeout(() => {
      this.updateActiveHrefHandle = null;
      this.setActiveNavItem();
    });
  },

  render() {
    return (
      <div>
        <NavMain activePage="components" />

        <PageHeader
          title="Components"
          subTitle=""
        />

        <div ref="main" className="container bs-docs-container">
          <div className="row">
            <div className="col-md-9" role="main">
              {this.renderScrollSpy(sections.layout)}
              <div className="bs-docs-section">
                <h1 className="page-header">
                  <Anchor id="page-layout">Page layout</Anchor>
                </h1>

                <p className="lead">The components in this section offer different ways to structure and present data on your page.</p>
              </div>

              {this.renderScrollSpy(sections.grid)}
              <GridSection />
            </div>


            <div className="col-md-3 bs-docs-sidebar-holder">
              <AutoAffix
                viewportOffsetTop={20}
                container={this.getMain}
              >
                <div
                  className="bs-docs-sidebar hidden-print"
                  role="complementary"
                >
                  <Nav
                    className="bs-docs-sidenav"
                    activeHref={this.state.activeNavItemHref}
                    onSelect={this.handleNavItemSelect}
                  >
                    <SubNav href={sections.layout} text="Page layout">
                      <NavItem href={sections.grid}>Grid system</NavItem>
                    </SubNav>
                  </Nav>

                  <a className="back-to-top" href="#top">
                    Back to top
                  </a>
                </div>
              </AutoAffix>
            </div>
          </div>
        </div>
        <PageFooter ref="footer" />
      </div>
    );
  }
});

export default ComponentsPage;

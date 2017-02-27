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

import FormBasicSection from './sections/FormBasicSection';
import FormValidationSection from './sections/FormValidationSection';
import FormPropsSection from './sections/FormPropsSection';
import GridBasicSection from './sections/GridBasicSection';
import GridOperationSection from './sections/GridOperationSection';
import GridPaginationSection from './sections/GridPaginationSection';
import GridPropsSection from './sections/GridPropsSection';
import GridSelectionSection from './sections/GridSelectionSection';
import TextFieldBasicSection from './sections/TextFieldBasicSection';
import TextFieldValidationSection from './sections/TextFieldValidationSection';
import TextFieldPropsSection from './sections/TextFieldPropsSection';

// order matters 顺序很重要！！
/* eslint-disable indent */
const sections = {
  grid: '#grid',
    gridBasic: '#grid-basic',
    gridPagination: '#grid-pagination',
    gridOperation: '#grid-operation',
    gridSelection: '#grid-selection',
    gridProps: '#grid-props',
  form: '#form',
    formBasic: '#form-basic',
    formValidation: '#form-validation',
    formProps: '#form-props',
  textField: '#text-field',
    textFieldBasic: '#text-field-basic',
    textFieldValidation: '#text-field-validation',
    textFieldProps: '#text-field-props'
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
          title="组件列表"
          subTitle=""
        />

        <div ref="main" className="container bs-docs-container">
          <div className="row">
            <div className="col-md-9" role="main">

              { /* Grid */ }

              {this.renderScrollSpy(sections.grid)}
              <div className="bs-docs-section">
                <h1 className="page-header">
                  <Anchor id="grid">Grid组件</Anchor>
                </h1>

                <p className="lead"></p>
              </div>

              {this.renderScrollSpy(sections.gridBasic)}
              <GridBasicSection />
              {this.renderScrollSpy(sections.gridPagination)}
              <GridPaginationSection />
              {this.renderScrollSpy(sections.gridOperation)}
              <GridOperationSection />
              {this.renderScrollSpy(sections.gridSelection)}
              <GridSelectionSection />
              {this.renderScrollSpy(sections.gridProps)}
              <GridPropsSection />

              { /* Form */ }

              {this.renderScrollSpy(sections.form)}
              <div className="bs-docs-section">
                <h1 className="page-header">
                  <Anchor id="form">Form组件</Anchor>
                </h1>

                <p className="lead"></p>
              </div>

              {this.renderScrollSpy(sections.formBasic)}
              <FormBasicSection />
              {this.renderScrollSpy(sections.formValidation)}
              <FormValidationSection />
              {this.renderScrollSpy(sections.formProps)}
              <FormPropsSection />

              { /* TextField */ }

              {this.renderScrollSpy(sections.textField)}
              <div className="bs-docs-section">
                <h1 className="page-header">
                  <Anchor id="text-field">TextField组件</Anchor>
                </h1>

                <p className="lead"></p>
              </div>

              {this.renderScrollSpy(sections.textFieldBasic)}
              <TextFieldBasicSection />
              {this.renderScrollSpy(sections.textFieldValidation)}
              <TextFieldValidationSection />
              {this.renderScrollSpy(sections.textFieldProps)}
              <TextFieldPropsSection />
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
                    <SubNav href={sections.grid} text="Grid组件">
                      <NavItem href={sections.gridBasic}>简单表格</NavItem>
                      <NavItem href={sections.gridPagination}>分页</NavItem>
                      <NavItem href={sections.gridOperation}>操作列</NavItem>
                      <NavItem href={sections.gridSelection}>行选择</NavItem>
                      <NavItem href={sections.gridProps}>属性</NavItem>
                    </SubNav>

                    <SubNav href={sections.form} text="Form组件">
                      <NavItem href={sections.formBasic}>简单表单</NavItem>
                      <NavItem href={sections.formValidation}>表单验证</NavItem>
                      <NavItem href={sections.formProps}>属性</NavItem>
                    </SubNav>

                    <SubNav href={sections.textField} text="TextField组件">
                      <NavItem href={sections.textFieldBasic}>简单文本框</NavItem>
                      <NavItem href={sections.textFieldValidation}>校验</NavItem>
                      <NavItem href={sections.textFieldProps}>属性</NavItem>
                    </SubNav>
                  </Nav>

                  <a className="back-to-top" href="#top">
                    回到顶部
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

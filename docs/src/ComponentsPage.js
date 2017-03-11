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

// 请按照字母顺序排序
import DatePicker2BasicSection from './sections/DatePicker2BasicSection';
import DatePicker2FormatterSection from './sections/DatePicker2FormatterSection';
import DatePicker2YearMonthDropdownSection from './sections/DatePicker2YearMonthDropdownSection';
import DatePicker2PropsSection from './sections/DatePicker2PropsSection';
import DatePickerBasicSection from './sections/DatePickerBasicSection';
import DatePickerFormatterSection from './sections/DatePickerFormatterSection';
import DatePickerPropsSection from './sections/DatePickerPropsSection';
import FormBasicSection from './sections/FormBasicSection';
import FormValidationSection from './sections/FormValidationSection';
import FormWithReferSection from './sections/FormWithReferSection';
import FormPropsSection from './sections/FormPropsSection';
import GridBasicSection from './sections/GridBasicSection';
import GridCellFormatterSection from './sections/GridCellFormatterSection';
import GridColumnAlignSection from './sections/GridColumnAlignSection';
import GridColumnClassSection from './sections/GridColumnClassSection';
import GridEmptyValueSection from './sections/GridEmptyValueSection';
import GridLocalSearchSection from './sections/GridLocalSearchSection';
import GridOperationSection from './sections/GridOperationSection';
import GridPaginationSection from './sections/GridPaginationSection';
import GridPropsSection from './sections/GridPropsSection';
import GridSelectionSection from './sections/GridSelectionSection';
import GridStyleSection from './sections/GridStyleSection';
import MonthPickerBasicSection from './sections/MonthPickerBasicSection';
import MonthPickerPropsSection from './sections/MonthPickerPropsSection';
import TextFieldBasicSection from './sections/TextFieldBasicSection';
import TextFieldValidationSection from './sections/TextFieldValidationSection';
import TextFieldPropsSection from './sections/TextFieldPropsSection';
import YearPickerBasicSection from './sections/YearPickerBasicSection';
import YearPickerPropsSection from './sections/YearPickerPropsSection';

// order matters 顺序很重要！！
// 请遵循按照文章的段落顺序，而不是字母顺序
/* eslint-disable indent */
const sections = {
  grid: '#grid',
    gridBasic: '#grid-basic',
    gridPagination: '#grid-pagination',
    gridOperation: '#grid-operation',
    gridSelection: '#grid-selection',
    gridColumnClass: '#grid-column-class',
    gridColumnAlign: '#grid-column-align',
    gridCellFormatter: '#grid-cell-formatter',
    gridLocalSearch: '#grid-local-search',
    gridStyle: '#grid-style',
    gridEmptyValue: '#grid-empty-value',
    gridProps: '#grid-props',
  form: '#form',
    formBasic: '#form-basic',
    formValidation: '#form-validation',
    formWithRefer: '#form-with-refer',
    formProps: '#form-props',
  textField: '#text-field',
    textFieldBasic: '#text-field-basic',
    textFieldValidation: '#text-field-validation',
    textFieldProps: '#text-field-props',
  datePicker: '#date-picker',
    datePickerBasic: '#date-picker-basic',
    datePickerFormatter: '#date-picker-formatter',
    datePickerProps: '#date-picker-props',
  datePicker2: '#date-picker2',
    datePicker2Basic: '#date-picker2-basic',
    datePicker2Formatter: '#date-picker2-formatter',
    datePicker2YearMonthDropdown: '#date-picker2-year-month-dropdown',
    datePicker2Props: '#date-picker2-props',
  monthPicker: '#month-picker',
    monthPickerBasic: '#month-picker-basic',
    monthPickerProps: '#month-picker-props',
  yearPicker: '#year-picker',
    yearPickerBasic: '#year-picker-basic',
    yearPickerProps: '#year-picker-props'
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
              {this.renderScrollSpy(sections.gridColumnClass)}
              <GridColumnClassSection />
              {this.renderScrollSpy(sections.gridColumnAlign)}
              <GridColumnAlignSection />
              {this.renderScrollSpy(sections.gridCellFormatter)}
              <GridCellFormatterSection />
              {this.renderScrollSpy(sections.gridLocalSearch)}
              <GridLocalSearchSection />
              {this.renderScrollSpy(sections.gridStyle)}
              <GridStyleSection />
              {this.renderScrollSpy(sections.gridEmptyValue)}
              <GridEmptyValueSection />
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
              {this.renderScrollSpy(sections.formWithRefer)}
              <FormWithReferSection />
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

              { /* DatePicker */ }

              {this.renderScrollSpy(sections.datePicker)}
              <div className="bs-docs-section">
                <h1 className="page-header">
                  <Anchor id="date-picker">DatePicker组件</Anchor>
                </h1>

                <p className="lead"></p>
              </div>

              {this.renderScrollSpy(sections.datePickerBasic)}
              <DatePickerBasicSection />
              {this.renderScrollSpy(sections.datePickerFormatter)}
              <DatePickerFormatterSection />
              {this.renderScrollSpy(sections.datePickerProps)}
              <DatePickerPropsSection />

              { /* DatePicker2 */ }

              {this.renderScrollSpy(sections.datePicker2)}
              <div className="bs-docs-section">
                <h1 className="page-header">
                  <Anchor id="date-picker2">DatePicker2组件</Anchor>
                </h1>

                <p className="lead"></p>
              </div>

              {this.renderScrollSpy(sections.datePicker2Basic)}
              <DatePicker2BasicSection />
              {this.renderScrollSpy(sections.datePicker2Formatter)}
              <DatePicker2FormatterSection />
              {this.renderScrollSpy(sections.datePicker2YearMonthDropdown)}
              <DatePicker2YearMonthDropdownSection />
              {this.renderScrollSpy(sections.datePicker2Props)}
              <DatePicker2PropsSection />

              { /* MonthPicker */ }

              {this.renderScrollSpy(sections.monthPicker)}
              <div className="bs-docs-section">
                <h1 className="page-header">
                  <Anchor id="month-picker">MonthPicker组件</Anchor>
                </h1>

                <p className="lead"></p>
              </div>

              {this.renderScrollSpy(sections.monthPickerBasic)}
              <MonthPickerBasicSection />
              {this.renderScrollSpy(sections.monthPickerProps)}
              <MonthPickerPropsSection />

              { /* YearPicker */ }

              {this.renderScrollSpy(sections.yearPicker)}
              <div className="bs-docs-section">
                <h1 className="page-header">
                  <Anchor id="year-picker">YearPicker组件</Anchor>
                </h1>

                <p className="lead"></p>
              </div>

              {this.renderScrollSpy(sections.yearPickerBasic)}
              <YearPickerBasicSection />
              {this.renderScrollSpy(sections.yearPickerProps)}
              <YearPickerPropsSection />
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
                    <SubNav href={sections.grid} text="Grid">
                      <NavItem href={sections.gridBasic}>简单表格</NavItem>
                      <NavItem href={sections.gridPagination}>分页</NavItem>
                      <NavItem href={sections.gridOperation}>操作列</NavItem>
                      <NavItem href={sections.gridSelection}>行选择</NavItem>
                      <NavItem href={sections.gridColumnClass}>列类名</NavItem>
                      <NavItem href={sections.gridColumnAlign}>列对齐方式</NavItem>
                      <NavItem href={sections.gridCellFormatter}>单元格格式化</NavItem>
                      <NavItem href={sections.gridLocalSearch}>本地搜索</NavItem>
                      <NavItem href={sections.gridStyle}>样式</NavItem>
                      <NavItem href={sections.gridEmptyValue}>演示空值</NavItem>
                      <NavItem href={sections.gridProps}>属性</NavItem>
                    </SubNav>

                    <SubNav href={sections.form} text="Form">
                      <NavItem href={sections.formBasic}>简单表单</NavItem>
                      <NavItem href={sections.formValidation}>表单验证</NavItem>
                      <NavItem href={sections.formWithRefer}>参照</NavItem>
                      <NavItem href={sections.formProps}>属性</NavItem>
                    </SubNav>

                    <SubNav href={sections.textField} text="TextField">
                      <NavItem href={sections.textFieldBasic}>简单文本框</NavItem>
                      <NavItem href={sections.textFieldValidation}>校验</NavItem>
                      <NavItem href={sections.textFieldProps}>属性</NavItem>
                    </SubNav>

                    <SubNav href={sections.datePicker} text="DatePicker">
                      <NavItem href={sections.datePickerBasic}>简单DatePicker</NavItem>
                      <NavItem href={sections.datePickerFormatter}>DatePicker格式化</NavItem>
                      <NavItem href={sections.datePickerProps}>属性</NavItem>
                    </SubNav>

                    <SubNav href={sections.datePicker2} text="DatePicker2">
                      <NavItem href={sections.datePicker2Basic}>简单DatePicker2</NavItem>
                      <NavItem href={sections.datePicker2Formatter}>格式化</NavItem>
                      <NavItem href={sections.datePicker2YearMonthDropdown}>年份、月份下拉选择</NavItem>
                      <NavItem href={sections.datePicker2Props}>属性</NavItem>
                    </SubNav>

                    <SubNav href={sections.monthPicker} text="MonthPicker">
                      <NavItem href={sections.monthPickerBasic}>简单MonthPicker</NavItem>
                      <NavItem href={sections.monthPickerProps}>属性</NavItem>
                    </SubNav>

                    <SubNav href={sections.yearPicker} text="YearPicker">
                      <NavItem href={sections.yearPickerBasic}>简单YearPicker</NavItem>
                      <NavItem href={sections.yearPickerProps}>属性</NavItem>
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

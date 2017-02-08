import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Grid from '../src/Grid';

function getTableData() {
  return {
    'startIndex': 1,
    'totalItems': 3,
    'items': [
      {'id': 3, 'cols': [
        {'value': '263X2016111400000081'},
        {'value': '会议费借款单'},
        {'value': '保存'},
        {'value': '2.00'},
        {'value': '2016-11-14'}
      ]},
      {'id': 1, 'cols': [
        {'value': 'D32016091200000022'},
        {'value': '付款单'},
        {'value': '保存'},
        {'value': '12.00'},
        {'value': '2016-09-12'}
      ]},
      {'id': 2, 'cols': [
        {'value': '263X2016083000000025'},
        {'value': '差旅费借款单'},
        {'value': '暂存'},
        {'value': '100.00'},
        {'value': '2016-08-30'}
      ]}
    ]
  };
}

function getCols() {
  return [
    {'type': 'text', 'label': '单据编号'},
    {'type': 'text', 'label': '单据类型'},
    {'type': 'text', 'label': '单据状态'},
    {'type': 'money', 'label': '金额'},
    {'type': 'text', 'label': '单据日期'}
  ];
}

describe('<Grid>', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        cols={getCols()}
        itemsPerPage={5}
      />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "admin-table" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        cols={getCols()}
        itemsPerPage={5}
        className="admin-table"
      >Grid content</Grid>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'admin-table');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        cols={getCols()}
        itemsPerPage={5}
      className="bob"/>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
  });
});

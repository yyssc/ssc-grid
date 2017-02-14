import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Grid from '../src/Grid';

function getTableData() {
  return [
    {
      danjubianhao: '263X2016111400000081',
      danjuleixing: '会议费借款单',
      danjuzhuangtai: '保存',
      jine: '2.00',
      danjuriqi: '2016-11-14'
    },
    {
      danjubianhao: 'D32016091200000022',
      danjuleixing: '付款单',
      danjuzhuangtai: '保存',
      jine: '12.00',
      danjuriqi: '2016-09-12'
    },
    {
      danjubianhao: '263X2016083000000025',
      danjuleixing: '差旅费借款单',
      danjuzhuangtai: '暂存',
      jine: '100.00',
      danjuriqi: '2016-08-30'
    }
  ];
}

function getCols() {
  return [
    {'type': 'string', id: 'danjubianhao', 'label': '单据编号'},
    {'type': 'string', id: 'danjuleixing', 'label': '单据类型'},
    {'type': 'string', id: 'danjuzhuangtai', 'label': '单据状态'},
    {'type': 'double', id: 'jine', 'label': '金额'},
    {'type': 'date', id: 'danjuriqi', 'label': '单据日期'}
  ];
}

describe('<Grid>', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        columnsModel={getCols()}
        itemsPerPage={5}
      />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "admin-table" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        columnsModel={getCols()}
        itemsPerPage={5}
        className="admin-table"
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'admin-table');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        columnsModel={getCols()}
        itemsPerPage={5}
      className="bob"/>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
  });
});

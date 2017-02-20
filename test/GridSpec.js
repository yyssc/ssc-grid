import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Grid from '../src/Grid';

function getTableData() {
  return [
    {
      id: '00000081',
      danjubianhao: '263X2016111400000081',
      name: '测试名称1',
      danjuleixing: '会议费借款单',
      danjuzhuangtai: '保存',
      jine: '2.00',
      danjuriqi: '2016-11-14'
    },
    {
      id: '00000022',
      name: '测试名称2',
      danjuleixing: '付款单',
      danjuzhuangtai: '保存',
      jine: '12.00',
      danjuriqi: '2016-09-12'
    },
    {
      id: '000000025',
      name: '测试名称3',
      danjuleixing: '差旅费借款单',
      danjuzhuangtai: '暂存',
      jine: '100.00',
      danjuriqi: '2016-08-30'
    }
  ];
}

function getCols() {
  return [
    {type: 'string', id: 'id', label: '主键', hidden: true},
    {type: 'string', id: 'danjubianhao', label: '单据编号'},
    {type: 'string', id: 'name', label: '名称', hidden: true},
    {type: 'string', id: 'danjuleixing', label: '单据类型'},
    {type: 'string', id: 'danjuzhuangtai', label: '单据状态'},
    {type: 'double', id: 'jine', label: '金额'},
    {type: 'date', id: 'danjuriqi', label: '单据日期'}
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

  it('Should hide id and name column', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        columnsModel={getCols()}
        itemsPerPage={5}
      />
    );
    let node = ReactDOM.findDOMNode(instance); // <div> root node
    let table = node.querySelector('table'); // <table>
    let ths = table.querySelectorAll('th'); // <th>s
    // 测试表头
    assert.equal(getCols()[1].label, ths[0].textContent); // 单据编号
    assert.equal(getCols()[3].label, ths[1].textContent);
    assert.equal(getCols()[4].label, ths[2].textContent);
    assert.equal(getCols()[5].label, ths[3].textContent);
    assert.equal(getCols()[6].label, ths[4].textContent);
    // 测试表体的第一行
    let tbody = table.querySelector('tbody'); // <tbody>
    let trs = tbody.querySelectorAll('tr'); // <tr>s
    let tr0tds = trs[0].querySelectorAll('td'); // first <tr> -> <td>s
    assert.equal(getTableData()[0].danjubianhao, tr0tds[0].textContent);
    assert.equal(getTableData()[0].danjuleixing, tr0tds[1].textContent);
    assert.equal(getTableData()[0].danjuzhuangtai, tr0tds[2].textContent);
    assert.equal(getTableData()[0].jine, tr0tds[3].textContent);
    assert.equal(getTableData()[0].danjuriqi, tr0tds[4].textContent);
  });
});

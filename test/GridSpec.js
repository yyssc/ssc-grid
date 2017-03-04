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
      danjuriqi: '2016-11-14',
      zuzhi: {
        id: '22EA0EB9-FABA-4224-B290-5D041A1DF773',
        code: '0403',
        name: '委外部3'
      }
    },
    {
      id: '00000022',
      name: '测试名称2',
      danjuleixing: '付款单',
      danjuzhuangtai: '保存',
      jine: '12.00',
      danjuriqi: '2016-09-12',
      zuzhi: {
        id: '22EA0EB9-FABA-4224-B290-5D041A1DF773',
        code: '0403',
        name: '委外部3'
      }
    },
    {
      id: '000000025',
      name: '测试名称3',
      danjuleixing: '差旅费借款单',
      danjuzhuangtai: '暂存',
      jine: '100.00',
      danjuriqi: '2016-08-30',
      zuzhi: null
    }
  ];
}

// 一共8列，应该显示6列，有2列是隐藏的
function getCols() {
  return [
    {type: 'string', id: 'id', label: '主键', hidden: true},
    {type: 'string', id: 'danjubianhao', label: '单据编号', className: 'table-head-danjubianhao'},
    {type: 'string', id: 'name', label: '名称', hidden: true},
    {type: 'string', id: 'danjuleixing', label: '单据类型'},
    {type: 'string', id: 'danjuzhuangtai', label: '单据状态'},
    {type: 'double', id: 'jine', label: '金额'},
    {type: 'date', id: 'danjuriqi', label: '单据日期'},
    {type: 'ref', id: 'zuzhi', label: '组织'}
  ];
}

describe('<Grid>', () => {

  // helper function

  function getTableHead(instance) {
    let node = ReactDOM.findDOMNode(instance); // <div> root node
    let table = node.querySelector('table'); // <table>
    return table.querySelector('thead'); // <thead>
  }

  function getTableBody(instance) {
    let node = ReactDOM.findDOMNode(instance); // <div> root node
    let table = node.querySelector('table'); // <table>
    return table.querySelector('tbody'); // <tbody>
  }

  // 得到行号为index（从0开始）的行DOM节点
  function getTableRow(instance, index) {
    let tbody = getTableBody(instance);
    let trs = tbody.querySelectorAll('tr');
    return trs[index];
  }

  it('列模型为空，表体数据为空，不应该报错', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[]}
        tableData={[]}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('列模型不为空，表体数据为空，应该显示表头，不显示表体', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getCols()}
        tableData={[]}
      />
    );
    getTableHead(instance); // <thead>
  });

  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getCols()}
        tableData={getTableData()}
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
    let thead = getTableHead(instance); // <thead>
    let ths = thead.querySelectorAll('th'); // <th>s
    // 测试表头
    assert.equal(getCols()[1].label, ths[0].textContent); // 单据编号
    assert.equal(getCols()[3].label, ths[1].textContent);
    assert.equal(getCols()[4].label, ths[2].textContent);
    assert.equal(getCols()[5].label, ths[3].textContent);
    assert.equal(getCols()[6].label, ths[4].textContent);
    assert.equal(getCols()[7].label, ths[5].textContent); // 组织
    // 测试表体的第一行
    let tr0tds = getTableRow(instance, 0).querySelectorAll('td'); // first <tr> -> <td>s
    assert.equal(getTableData()[0].danjubianhao, tr0tds[0].textContent); // 单据编号
    assert.equal(getTableData()[0].danjuleixing, tr0tds[1].textContent);
    assert.equal(getTableData()[0].danjuzhuangtai, tr0tds[2].textContent);
    assert.equal(getTableData()[0].jine, tr0tds[3].textContent);
    assert.equal(getTableData()[0].danjuriqi, tr0tds[4].textContent);
    assert.equal(getTableData()[0].zuzhi.name, tr0tds[5].textContent); // 组织
    // 测试参照value为null的情况
    let tr2tds = getTableRow(instance, 2).querySelectorAll('td'); // third <tr> -> <td>s
    assert.equal(getTableData()[2].zuzhi, null); // 组织
    assert.equal(tr2tds[5].textContent, ''); // 组织
  });

  it('应该正确显示参照的值', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        columnsModel={getCols()}
        itemsPerPage={5}
      />
    );
    // 第一行，由于参照是一个对象（而不是字符串）zuzhi，所以应该显示zuzhi.name
    let tr0tds = getTableRow(instance, 0).querySelectorAll('td'); // first <tr> -> <td>s
    assert.equal(getTableData()[0].zuzhi.name, tr0tds[5].textContent); // 组织
    // 第三行有参照的值不是一个对象，而是null，应该转换成空字符串
    let tr2tds = getTableRow(instance, 2).querySelectorAll('td'); // third <tr> -> <td>s
    assert.equal(getTableData()[2].zuzhi, null); // 组织
    assert.equal(tr2tds[5].textContent, ''); // 组织
  });

  it('应该显示操作列', () => {
    const CustomComponent = React.createClass({
      handleUpdate() {},
      handleDelete() {},
      render() {
        return (<td>
          <span onClick={this.handleUpdate}
            className="glyphicon glyphicon-pencil"></span>
          <span onClick={this.handleDelete}
            className="glyphicon glyphicon-trash"></span>
        </td>);
      }
    });

    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getCols()}
        tableData={getTableData()}
        operationColumn={{}}
        operationColumnClass={CustomComponent}
      />
    );

    // 第一行所有<td>
    let tr0tds = getTableRow(instance, 0).querySelectorAll('td'); // first <tr> -> <td>s
    // 最后一列，有两个span，也就是两个操作按钮
    assert.equal(tr0tds[6].querySelectorAll('span').length, 2);
  });

  it('应该在<th>上显示正确的className', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getCols()}
        tableData={getTableData()}
      />
    );
    let thead = getTableHead(instance);
    assert.equal(thead.querySelectorAll('th')[0].className, 'table-head-danjubianhao');
    assert.equal(thead.querySelectorAll('th')[1].className, '');
  });

  it('应该正常渲染并且不报警告当id重复的时候', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'string', id: 'id', label: '主键'},
          {type: 'ref', id: 'classifyid', label: '银行类别'},
          {type: 'string', id: 'classifyid', label: '账户性质'}
        ]}
        tableData={[
          { id: '00000081', classifyid: {
            "id": "1DCEF67B-C1BC-4BBF-A97C-B39FF3910A7A",
            "code": "111",
            "name": "测试银行类别" }, accountproperty: null },
          { id: '00000082', classifyid: {
            "id": "1DCEF67B-C1BC-4BBF-A97C-B39FF3910A7B",
            "code": "112",
            "name": "测试银行类别2" }, accountproperty: null }
        ]}
      />
    );
    let tr0 = getTableRow(instance, 0);
    let tr1 = getTableRow(instance, 1);
    // 第三列应该显示为[object Object]
    assert.equal(tr0.querySelectorAll('td')[2].textContent, '[object Object]');
    assert.equal(tr1.querySelectorAll('td')[2].textContent, '[object Object]');
  });

});

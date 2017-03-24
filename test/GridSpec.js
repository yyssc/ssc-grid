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

  function getTableHeadColumn(instance, index) {
    let ths = getTableHead(instance).querySelectorAll('th');
    return ths[index];
  }

  // 获得指定列头中的文本
  // <th> -> textContent
  function getTableHeadColumnContent(instance, index) {
    return getTableHeadColumn(instance, index).textContent;
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

  // 获得单元格<td>节点
  function getTableCell(instance, rowIndex, columnIndex) {
    let trN = getTableRow(instance, rowIndex); // <tr> node
    let tds = trN.querySelectorAll('td'); // <td> node list
    return tds[columnIndex];
  }

  // 获得单元格中的内容，类型为string
  function getTableCellContent(instance, rowIndex, columnIndex) {
    return getTableCell(instance, rowIndex, columnIndex).textContent;
  }

  /**
   * 将组件渲染到DOM中，是append的模式，所以每次调用都会创建一个新的<TextField>节点
   * 通过instance.state可以获取到组件的状态。
   * ```jsx
   * let instance = ReactTestUtils.renderIntoDocument(
   *   <TextField />
   * );
   * ```
   * 如果需要渲染到指定节点中。
   * 如果组件外部的数据更新了，仍然再次调用ReactDOM.render()方法，将新的数据通过
   * props传进组件。调用了两次ReactDOM.render()方法，但是只有第一次会调用组件的
   * 构造函数。
   * 仍然可以通过component.state获取到<TextField>组件的状态
   * ```
   * let node = document.createElement('div');
   * let component = ReactDOM.render(
   *   <TextField />, node
   * );
   * ReactDOM.render(
   *   <TextField value="123" />, node
   * );
   * ```
   */

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

  it('表格体，无论columnModel是什么类型，当单元格为null，都不应该报错', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'string', id: 'zifuchuan', label: '字符串'},
          {type: 'double', id: 'shuangjingdufudianshu', label: '双精度浮点数'},
          {type: 'date', id: 'riqi', label: '日期'},
          {type: 'enum', id: 'meiju', label: '枚举'},
          {type: 'ref', id: 'canzhao', label: '参照'}
        ]}
        tableData={[
          { zifuchuan: null, shuangjingdufudianshu: null, riqi: null, meiju: null, canzhao: null },
          { zifuchuan: null, shuangjingdufudianshu: null, riqi: null, meiju: null, canzhao: null }
        ]}
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
            'id': '1DCEF67B-C1BC-4BBF-A97C-B39FF3910A7A',
            'code': '111',
            'name': '测试银行类别' }, accountproperty: null },
          { id: '00000082', classifyid: {
            'id': '1DCEF67B-C1BC-4BBF-A97C-B39FF3910A7B',
            'code': '112',
            'name': '测试银行类别2' }, accountproperty: null }
        ]}
      />
    );
    let tr0 = getTableRow(instance, 0);
    let tr1 = getTableRow(instance, 1);
    // 第三列应该显示为[object Object]
    assert.equal(tr0.querySelectorAll('td')[2].textContent, '[object Object]');
    assert.equal(tr1.querySelectorAll('td')[2].textContent, '[object Object]');
  });

  it('通过props更新表格数据，应该重新渲染为新数据', () => {
    let node = document.createElement('div');
    let mockColumnsModel;
    let mockTableBody;
    let component;

    mockColumnsModel = [
      {type: 'string', id: 'id', label: '主键'},
      {type: 'string', id: 'name', label: '名称'}
    ];
    mockTableBody = [
      { id: '0', name: 'n1' },
      { id: '1', name: 'n2' }
    ];
    component = ReactDOM.render(
      <Grid
        columnsModel={mockColumnsModel}
        tableData={mockTableBody}
      />, node
    );
    // 通过component.state可以获取到组件的状态
    assert.equal(getTableHeadColumnContent(component, 0), '主键');
    assert.equal(getTableHeadColumnContent(component, 1), '名称');
    assert.equal(getTableCellContent(component, 0, 0), '0');
    assert.equal(getTableCellContent(component, 0, 1), 'n1');
    assert.equal(getTableCellContent(component, 1, 0), '1');
    assert.equal(getTableCellContent(component, 1, 1), 'n2');

    // 修改数据，重新渲染
    mockColumnsModel = [
      {type: 'double', id: 'i2d', label: '主2键'},
      {type: 'double', id: 'n2ame', label: '名2称'}
    ];
    mockTableBody = [
      { i2d: '111', n2ame: '111000' },
      { i2d: '222', n2ame: '222000' }
    ];
    component = ReactDOM.render(
      <Grid
        columnsModel={mockColumnsModel}
        tableData={mockTableBody}
      />, node
    );
    assert.equal(getTableHeadColumnContent(component, 0), '主2键');
    assert.equal(getTableHeadColumnContent(component, 1), '名2称');
    assert.equal(getTableCellContent(component, 0, 0), '111');
    assert.equal(getTableCellContent(component, 0, 1), '111000');
    assert.equal(getTableCellContent(component, 1, 0), '222');
    assert.equal(getTableCellContent(component, 1, 1), '222000');
  });

  it('当传入为string[0]类型，并且值为""/null/undefined，UI上显示空字符串', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'string', id: 'name', label: '名称'}
        ]}
        tableData={[
          {name: ''},
          {name: null},
          {name: undefined},
          {}
        ]}
      />
    );
    assert.equal(getTableCellContent(instance, 0, 0), '');
    assert.equal(getTableCellContent(instance, 1, 0), '');
    assert.equal(getTableCellContent(instance, 2, 0), '');
    assert.equal(getTableCellContent(instance, 3, 0), '');
  });

  it('当传入为double[2]类型，并且值为""/null/undefined，UI上显示空字符串', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'double', id: 'jine', label: '金额'}
        ]}
        tableData={[
          {name: ''},
          {name: null},
          {name: undefined},
          {}
        ]}
      />
    );
    assert.equal(getTableCellContent(instance, 0, 0), '');
    assert.equal(getTableCellContent(instance, 1, 0), '');
    assert.equal(getTableCellContent(instance, 2, 0), '');
    assert.equal(getTableCellContent(instance, 3, 0), '');
  });

  it('当传入为date[3]类型，并且值为""/null/undefined，UI上显示空字符串', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'date', id: 'riqi', label: '日期'}
        ]}
        tableData={[
          { riqi: ''},
          { riqi: null},
          { riqi: undefined},
          {}
        ]}
      />
    );
    assert.equal(getTableCellContent(instance, 0, 0), '');
    assert.equal(getTableCellContent(instance, 1, 0), '');
    assert.equal(getTableCellContent(instance, 2, 0), '');
    assert.equal(getTableCellContent(instance, 3, 0), '');
  });

  it('当传入为boolean[4]类型，并且值为""/null/undefined，UI上显示空字符串', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'boolean', id: 'sex', label: '性别'}
        ]}
        tableData={[
          {name: ''},
          {name: null},
          {name: undefined},
          {}
        ]}
      />
    );
    assert.equal(getTableCellContent(instance, 0, 0), '');
    assert.equal(getTableCellContent(instance, 1, 0), '');
    assert.equal(getTableCellContent(instance, 2, 0), '');
    assert.equal(getTableCellContent(instance, 3, 0), '');
  });

  it('当传入为ref[5]类型，并且值为""/null/undefined，UI上显示空字符串', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'ref', id: 'pk_org', label: '组织'}
        ]}
        tableData={[
          {name: ''},
          {name: null},
          {name: undefined},
          {}
        ]}
      />
    );
    assert.equal(getTableCellContent(instance, 0, 0), '');
    assert.equal(getTableCellContent(instance, 1, 0), '');
    assert.equal(getTableCellContent(instance, 2, 0), '');
    assert.equal(getTableCellContent(instance, 3, 0), '');
  });

  it('当传入为enum[6]类型，并且值为""/null/undefined，UI上显示空字符串', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'enum', id: 'danjuleixing', label: '单据类型'}
        ]}
        tableData={[
          {name: ''},
          {name: null},
          {name: undefined},
          {}
        ]}
      />
    );
    assert.equal(getTableCellContent(instance, 0, 0), '');
    assert.equal(getTableCellContent(instance, 1, 0), '');
    assert.equal(getTableCellContent(instance, 2, 0), '');
    assert.equal(getTableCellContent(instance, 3, 0), '');
  });

  it('通过props更新表格数据，左侧checkbox的状态应该被清空', () => {
    let node = document.createElement('div');
    let tableNode;
    let row0Checkbox;
    let component;

    let mockColumnsModelOld = [
      {type: 'string', id: 'id', label: '主键'},
      {type: 'string', id: 'name', label: '名称'}
    ];
    let mockTableBodyOld = [
      { id: '0', name: 'n1' },
      { id: '1', name: 'n2' }
    ];
    component = ReactDOM.render(
      <Grid
        columnsModel={mockColumnsModelOld}
        tableData={mockTableBodyOld}
        selectRow={{
          mode: 'checkbox',
          onSelect: () => {},
          onSelectAll: () => {}
        }}
      />, node
    );
    tableNode = ReactDOM.findDOMNode(component);
    row0Checkbox = tableNode.querySelectorAll('input')[1];
    // row0Checkbox = tableNode.querySelectorAll('input[type="checkbox"]');
    // row0Checkbox = tableNode.querySelectorAll('input[type="checkbox"][checked="checked"]');
    // row0Checkbox.checked = true;
    ReactTestUtils.Simulate.change(row0Checkbox, {target: {checked: true}});
    // assert.equal(row0Checkbox.selected, true);
    // assert.equal(tableNode.querySelectorAll('input[type="checkbox"][checked="checked"]').length, 1);
    assert.equal(component.state.selectedRowsObj[0].selected, true);

    // 修改数据，重新渲染
    let mockColumnsModelNew = [
      {type: 'double', id: 'i2d', label: '主2键'},
      {type: 'double', id: 'n2ame', label: '名2称'}
    ];
    let mockTableBodyNew = [
      { i2d: '111', n2ame: '111000' },
      { i2d: '222', n2ame: '222000' }
    ];
    component = ReactDOM.render(
      <Grid
        columnsModel={mockColumnsModelNew}
        tableData={mockTableBodyNew}
        selectRow={{
          mode: 'checkbox',
          onSelect: () => {},
          onSelectAll: () => {}
        }}
      />, node
    );
    tableNode = ReactDOM.findDOMNode(component);
    row0Checkbox = tableNode.querySelectorAll('input')[1];
    // assert.equal(row0Checkbox.selected, false);
    assert.equal(component.state.selectedRowsObj[0].selected, false);
  });

  it('应该正确设置表格内的状态', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'double', id: 'jine', label: '金额'}
        ]}
        tableData={[
          {jine: ''},
          {jine: null},
          {jine: undefined},
          {jine: 123}
        ]}
      />
    );
    assert.equal(component.state.viewedTableData[0].jine, '');
    assert.equal(component.state.viewedTableData[1].jine, null);
    assert.equal(component.state.viewedTableData[2].jine, undefined);
    assert.equal(component.state.viewedTableData[3].jine, 123);
  });

});

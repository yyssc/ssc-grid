import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import Grid from '../src/Grid';
import { getTableCell, getTableHeadColumn } from './helpers';

const getFakeColumnsModel = () => ([
  {type: 'string', id: 'code', label: '编号'},
  {type: 'string', id: 'name', label: '名称'},
  {type: 'boolean', id: 'enable', label: '启用'},
]);

const getFakeTableBodyData = () => ([
  { code: '00000081', name: '测试名称1', enable: false },
  { code: '00000022', name: '测试名称2', enable: true },
  { code: '00000025', name: '测试名称3', enable: false }
]);

describe('<Grid> Row selection', () => {

  it('应该正确显示checkbox', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        selectRow={{
          mode: 'checkbox',
          onSelect: () => {},
          onSelectAll: () => {}
        }}
      />
    );
    assert.equal(getTableHeadColumn(instance, 0).querySelector('input').type, 'checkbox');
    assert.equal(getTableCell(instance, 0, 0).querySelector('input').type, 'checkbox');
    assert.equal(getTableCell(instance, 1, 0).querySelector('input').type, 'checkbox');
    assert.equal(getTableCell(instance, 2, 0).querySelector('input').type, 'checkbox');
  });

  it('onBeforeSelect返回false的时候，checkbox不应该被选中', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        selectRow={{
          mode: 'checkbox',
          onBeforeSelect: (rowIdx, rowObj) => rowObj.enable,
          onSelect: () => {},
          onSelectAll: () => {}
        }}
      />
    );
    let row0checkbox = getTableCell(component, 0, 0).querySelector('input');
    let row1checkbox = getTableCell(component, 1, 0).querySelector('input');
    ReactTestUtils.Simulate.change(row0checkbox, {target: {checked: true}});
    ReactTestUtils.Simulate.change(row1checkbox, {target: {checked: true}});
    assert.equal(component.state.selectedRowsObj[0].selected, false);
    assert.equal(component.state.selectedRowsObj[1].selected, true);
    assert.equal(row0checkbox.checked, false);
    assert.equal(row1checkbox.checked, true);
  });

  it('onBeforeSelectAll返回false的时候，所有checkbox不应该被选中', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        selectRow={{
          mode: 'checkbox',
          onBeforeSelectAll: () => false,
          onSelect: () => {},
          onSelectAll: () => {}
        }}
      />
    );
    let headCheckbox = getTableHeadColumn(component, 0).querySelector('input');
    ReactTestUtils.Simulate.change(headCheckbox, {target: {checked: true}});
    assert.equal(component.state.isHeadRowSelected, false);
    assert.equal(component.state.selectedRowsObj[0].selected, false);
    assert.equal(component.state.selectedRowsObj[1].selected, false);
    assert.equal(headCheckbox.checked, false);
  });

  it('onBeforeSelectAll返回true的时候，所有checkbox都应该被选中', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        selectRow={{
          mode: 'checkbox',
          onBeforeSelectAll: () => true,
          onSelect: () => {},
          onSelectAll: () => {}
        }}
      />
    );
    let headCheckbox = getTableHeadColumn(component, 0).querySelector('input');
    ReactTestUtils.Simulate.change(headCheckbox, {target: {checked: true}});
    assert.equal(component.state.isHeadRowSelected, true);
    assert.equal(component.state.selectedRowsObj[0].selected, true);
    assert.equal(component.state.selectedRowsObj[1].selected, true);
    assert.equal(headCheckbox.checked, true);
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

  // https://github.com/yyssc/ssc-grid/issues/83
  it('Cannot read property selected of undefined', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        selectRow={{
          mode: 'checkbox',
          onSelect: () => {},
          onSelectAll: () => {}
        }}
      />
    );
    // TypeError: Cannot read property 'selected' of undefined
    component.select('name', 'not exist name', true);
  });

  // https://github.com/yyssc/ssc-grid/issues/84
  it('select method can not trigger "select all" checkbox on table header', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        selectRow={{
          mode: 'checkbox',
        }}
      />
    );

    let headCheckbox = getTableHeadColumn(component, 0).querySelector('input');
    let row0checkbox = getTableCell(component, 0, 0).querySelector('input');
    let row1checkbox = getTableCell(component, 1, 0).querySelector('input');
    let row2checkbox = getTableCell(component, 2, 0).querySelector('input');

    // select all rows
    component.select('code', '00000081', true);
    component.select('code', '00000022', true);
    component.select('code', '00000025', true);

    // all checkbox in table body is checked
    assert.equal(component.state.selectedRowsObj[0].selected, true);
    assert.equal(component.state.selectedRowsObj[1].selected, true);
    assert.equal(component.state.selectedRowsObj[2].selected, true);
    assert.equal(row0checkbox.checked, true);
    assert.equal(row1checkbox.checked, true);
    assert.equal(row2checkbox.checked, true);

    // checkbox in table header is checked
    assert.equal(component.state.isHeadRowSelected, true);
    assert.equal(headCheckbox.checked, true);

    component.select('code', '00000081', false);

    assert.equal(component.state.selectedRowsObj[0].selected, false);
    assert.equal(component.state.selectedRowsObj[1].selected, true);
    assert.equal(component.state.selectedRowsObj[2].selected, true);
    assert.equal(row0checkbox.checked, false);
    assert.equal(row1checkbox.checked, true);
    assert.equal(row2checkbox.checked, true);

    assert.equal(component.state.isHeadRowSelected, false);
    assert.equal(headCheckbox.checked, false);
  });

});

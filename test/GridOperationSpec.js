import React from 'react';
import createReactClass from 'create-react-class';
import ReactTestUtils from 'react-addons-test-utils';

import Grid from '../src/Grid';
import { getTableCell, getTableHeadColumn } from './helpers';

const CustomComponent = createReactClass({
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

const getFakeColumnsModel = () => ([
  {type: 'string', id: 'code', label: '编号'},
  {type: 'string', id: 'name', label: '名称'},
]);

const getFakeTableBodyData = () => ([
  { code: '00000081', name: '测试名称1' },
  { code: '00000022', name: '测试名称2' },
  { code: '00000025', name: '测试名称3' }
]);

describe('<Grid>操作列', () => {

  it('应该显示操作列', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        operationColumn={{}}
        operationColumnClass={CustomComponent}
      />
    );
    // 最后一列，有两个span，也就是两个操作按钮
    assert.equal(getTableCell(instance, 0, 2).querySelectorAll('span').length, 2);
  });

  it('应该正确设置操作列类名', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        operationColumn={{
          className: 'test-class-name'
        }}
        operationColumnClass={CustomComponent}
      />
    );
    assert.equal(getTableHeadColumn(instance, 2).className, 'test-class-name');
  });

  it('应该正确设置操作列文字', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={getFakeColumnsModel()}
        tableData={getFakeTableBodyData()}
        operationColumn={{
          text: '操作列头名称'
        }}
        operationColumnClass={CustomComponent}
      />
    );
    assert.equal(getTableHeadColumn(instance, 2).textContent, '操作列头名称');
  });

});

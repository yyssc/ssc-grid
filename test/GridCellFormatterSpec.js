import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Grid from '../src/Grid';
import { getTableCellContent } from './helpers';

describe('<Grid>单元格格式', () => {

  it('应该正确格式化boolean型', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          {type: 'boolean', id: 'b1', label: 'b1'},
          {type: 'boolean', id: 'b2', label: 'b2',
            formatter: {
              type: 'custom',
              callback: (value) => {
                // 如果用户提供的值是null，那么type就不是boolean了，产品层应该如何
                // 定义这行行为？
                // assert.equal(typeof value, 'boolean');
                return value ? '启用' : '禁用';
              }
            }
          }
        ]}
        tableData={[
          {b1: true, b2: true},
          {b1: false, b2: false},
          {b1: null, b2: null},
          {b1: '', b2: ''},
          {},
        ]}
      />
    );
    // true
    assert.equal(getTableCellContent(component, 0, 0), 'true');
    assert.equal(getTableCellContent(component, 0, 1), '启用');
    // false
    assert.equal(getTableCellContent(component, 1, 0), 'false');
    assert.equal(getTableCellContent(component, 1, 1), '禁用');
    // null
    assert.equal(getTableCellContent(component, 2, 0), '');
    assert.equal(getTableCellContent(component, 2, 1), '禁用');
    // ''
    assert.equal(getTableCellContent(component, 3, 0), '');
    assert.equal(getTableCellContent(component, 3, 1), '禁用');
    // undefined
    assert.equal(getTableCellContent(component, 4, 0), '');
    assert.equal(getTableCellContent(component, 4, 1), '禁用');
  });

});

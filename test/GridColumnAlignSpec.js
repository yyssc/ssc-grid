import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Grid from '../src/Grid';
import { getTableCell } from './helpers';

describe('<Grid> columns alignment', () => {

  it('Columns alignment', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          // string
          { type: 'string', id: 's0', label: 's0' },
          { type: 'string', id: 's1', label: 's1', align: 'left' },
          { type: 'string', id: 's2', label: 's2', align: 'center' },
          { type: 'string', id: 's3', label: 's3', align: 'right' },
          // double
          { type: 'double', id: 'd1', label: 'd1' },
          { type: 'double', id: 'd1', label: 'd1', align: 'left' },
          { type: 'double', id: 'd2', label: 'd2', align: 'center' },
          { type: 'double', id: 'd3', label: 'd3', align: 'right' },
        ]}
        tableData={[
          {/* { s0: 's0', s1: 's1' },*/}
        ]}
      />
    );
    // the default alignment for string type is left
    const td0 = getTableCell(component, 0, 0);
    assert.equal(td0.className, '');
    assert.equal(td0.style.textAlign, '');

    assert.equal(getTableCell(component, 0, 1).className, 'text-left');
    assert.equal(getTableCell(component, 0, 2).className, 'text-center');
    assert.equal(getTableCell(component, 0, 3).className, 'text-right');

    // the default alignment for double type is right
    const td4 = getTableCell(component, 0, 4);
    assert.equal(td4.className, 'text-right');
    assert.equal(td4.style.textAlign, '');

    // align attribute will override the default alignment
    assert.equal(getTableCell(component, 0, 5).className, 'text-left');
    assert.equal(getTableCell(component, 0, 6).className, 'text-center');
    assert.equal(getTableCell(component, 0, 7).className, 'text-right');
  });

  it('Formatter should not change the default styles for double type', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Grid
        columnsModel={[
          { type: 'string', id: 'id', label: '主键' },
          { type: 'double', id: 'jine1', label: '金额1' },
          { type: 'double', id: 'jine2', label: '金额2', formatter: {
            type: 'custom',
            callback: value => value
          } },
        ]}
        tableData={[{ id: '11', jine1: '1.00', jine2: '2.00' }]}
      />
    );
    const td1 = getTableCell(component, 0, 1);
    assert.equal(td1.className, 'text-right');
    const td2 = getTableCell(component, 0, 2);
    assert.equal(td2.className, 'text-right');
  });

});

import {assert} from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Grid from '../../src/Grid.js';

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
    {'type': 'text', 'label': '金额'},
    {'type': 'text', 'label': '单据日期'}
  ];
}

describe('Grid', () => {
  it('Should be rendered on the server side', () => {
    assert.doesNotThrow(function renderOnServerSide() {
      return ReactDOMServer.renderToString(
        <Grid
          tableData={getTableData()}
          cols={getCols()}
          itemsPerPage={5}
        />
      );
    });
  });
});

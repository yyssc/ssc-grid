import {assert} from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Grid from '../../src/Grid.js';

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

describe('Grid', () => {
  it('Should be rendered on the server side', () => {
    assert.doesNotThrow(function renderOnServerSide() {
      return ReactDOMServer.renderToString(
        <Grid
          tableData={getTableData()}
          columnsModel={getCols()}
          itemsPerPage={5}
        />
      );
    });
  });
});

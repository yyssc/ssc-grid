import {assert} from 'chai';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Grid from '../../src/Grid.js';

function getTableData() {
  return {
    'currentItemCount': 5,
    'startIndex': 1,
    'totalItems': 22,
    'items': [
      {
        'id': 4,
        'col1': 'row5, col1',
        'col2': 'row5, col2',
        'col3': 'row5, col3',
        'cols': [
          {
            'type': 'text',
            'label': 'id',
            'value': '4'
          },
          {
            'type': 'text',
            'label': 'col1',
            'value': 'row5, col1'
          },
          {
            'type': 'text',
            'label': 'col2',
            'value': 'row5, col2'
          },
          {
            'type': 'text',
            'label': 'col3',
            'value': 'row5, col3'
          }
        ]
      }
    ]
  };
}

describe('Grid', () => {
  it('Should be rendered on the server side', () => {
    assert.doesNotThrow(function renderOnServerSide() {
      return ReactDOMServer.renderToString(
        <Grid
          tableData={getTableData()}
          onPagination={()=>{}}
          onSelectOne={()=>{}}
          onEdit={()=>{}}
          itemsPerPage={5}
        />
      );
    });
  });
});

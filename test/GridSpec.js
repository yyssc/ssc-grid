import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Grid from '../src/Grid';

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

describe('<Grid>', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        onPagination={()=>{}}
        onSelectOne={()=>{}}
        onEdit={()=>{}}
        itemsPerPage={5}
      />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "admin-table" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        onPagination={()=>{}}
        onSelectOne={()=>{}}
        onEdit={()=>{}}
        itemsPerPage={5}
        className="admin-table"
      >Grid content</Grid>
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'admin-table');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Grid
        tableData={getTableData()}
        onPagination={()=>{}}
        onSelectOne={()=>{}}
        onEdit={()=>{}}
        itemsPerPage={5}
      className="bob"/>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
  });
});

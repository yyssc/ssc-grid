import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Tree from '../src/Tree';

const treeData = [
  {
    'title': '0-0-label',
    'key': '0-0-key',
    'children': [
      {
        'title': '0-0-0-label',
        'key': '0-0-0-key',
        'children': [
          {
            'title': '0-0-0-0-label',
            'key': '0-0-0-0-key'
          },
          {
            'title': '0-0-0-1-label',
            'key': '0-0-0-1-key'
          },
          {
            'title': '0-0-0-2-label',
            'key': '0-0-0-2-key'
          }
        ]
      },
      {
        'title': '0-0-1-label',
        'key': '0-0-1-key',
        'children': [
          {
            'title': '0-0-1-0-label',
            'key': '0-0-1-0-key'
          },
          {
            'title': '0-0-1-1-label',
            'key': '0-0-1-1-key'
          },
          {
            'title': '0-0-1-2-label',
            'key': '0-0-1-2-key'
          }
        ]
      },
      {
        'title': '0-0-2-label',
        'key': '0-0-2-key'
      }
    ]
  },
  {
    'title': '0-1-label',
    'key': '0-1-key',
    'children': [
      {
        'title': '0-1-0-label',
        'key': '0-1-0-key',
        'children': [
          {
            'title': '0-1-0-0-label',
            'key': '0-1-0-0-key'
          },
          {
            'title': '0-1-0-1-label',
            'key': '0-1-0-1-key'
          },
          {
            'title': '0-1-0-2-label',
            'key': '0-1-0-2-key'
          }
        ]
      },
      {
        'title': '0-1-1-label',
        'key': '0-1-1-key',
        'children': [
          {
            'title': '0-1-1-0-label',
            'key': '0-1-1-0-key'
          },
          {
            'title': '0-1-1-1-label',
            'key': '0-1-1-1-key'
          },
          {
            'title': '0-1-1-2-label',
            'key': '0-1-1-2-key'
          }
        ]
      },
      {
        'title': '0-1-2-label',
        'key': '0-1-2-key'
      }
    ]
  },
  {
    'title': '0-2-label',
    'key': '0-2-key'
  }
];

describe('<Tree>', () => {

  // helper function

  it('应该正常显示树', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Tree
        className="myCls"
        showLine
        checkable
        defaultExpandAll
        treeData={treeData}
      />
    );
    let node = ReactDOM.findDOMNode(component);
    assert.equal(node.querySelectorAll('li').length, 21);
  });

});

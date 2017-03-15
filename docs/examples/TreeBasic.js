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

const TreeBasicExample = React.createClass({
  render() {
    return (
      <Tree
        className="myCls"
        showLine
        checkable
        defaultExpandAll
        treeData={treeData}
      />
    );
  }

});

ReactDOM.render(<TreeBasicExample />, mountNode);

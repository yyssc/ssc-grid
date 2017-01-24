const tableData = {
  'currentItemCount': 5,
  'startIndex': 1,
  'totalItems': 22,
  'items': [
    {
      'id': 1,
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

const gridInstance = (
  <Grid
    paging
    tableData={tableData} itemsPerPage={5}
    onPagination={()=>{}}
    onSelectOne={()=>{}}
    onEdit={()=>{}}
  />
);

ReactDOM.render(gridInstance, mountNode);

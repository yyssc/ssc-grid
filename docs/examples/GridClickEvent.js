const mockTableBodyData = [
  {id: '11', danjubianhao: '263X2016111400000081', jine: '2.00'},
  {id: '22', danjubianhao: 'D3201609120000000022', jine: '12.00'},
  {id: '33', danjubianhao: '263X2016083000000025', jine: '100.00'}
];

const mockColumnsModel = [
  {type: 'string', id: 'id', label: '主键'},
  {type: 'string', id: 'danjubianhao', label: '单据编号'},
  {type: 'double', id: 'jine', label: '金额'}
];

const GridClickEventExample = React.createClass({
  handleRowDoubleClick(event, rowObj) {
    alert('被点击行的数据：\n' + JSON.stringify(rowObj, null, '  '));
  },
  render() {
    return (
      <Grid
        columnsModel={mockColumnsModel} tableData={mockTableBodyData}
        onRowDoubleClick={this.handleRowDoubleClick}
      />
    );
  }
});

ReactDOM.render(<GridClickEventExample />, mountNode);

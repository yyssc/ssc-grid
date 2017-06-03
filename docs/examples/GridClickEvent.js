const mockTableColumnsModel = [
  {type: 'string', id: 'id', label: 'ID'},
  {type: 'string', id: 'note_id', label: 'Note ID'},
  {type: 'double', id: 'money', label: 'Money'}
];

const mockTableBodyData = [
  {id: '11', note_id: '263X2016111400000081', money: '2.00'},
  {id: '22', note_id: 'D3201609120000000022', money: '12.00'},
  {id: '33', note_id: '263X2016083000000025', money: '100.00'}
];

// printing helper
const toJSON = obj => JSON.stringify(obj, null, '  ');
const cellCallbackParamsToJSON = (colIdx, columnModel, rowIdx, rowObj) => (`callback params:
colIdx = ${colIdx};
columnModel = ${toJSON(columnModel)};
rowIdx = ${rowIdx};
rowObj = ${toJSON(rowObj)};`);
const rowCallbackParamsToJSON = (rowObj) => (`callback params:
rowObj = ${toJSON(rowObj)};`);

const GridClickEventExample = React.createClass({
  handleCellClick(event, colIdx, columnModel, rowIdx, rowObj) {
    alert(`Click on a cell, ${cellCallbackParamsToJSON(
      colIdx, columnModel, rowIdx, rowObj)}`);
  },
  handleCellDoubleClick(event, colIdx, columnModel, rowIdx, rowObj) {
    alert(`Double click on a cell, ${cellCallbackParamsToJSON(
      colIdx, columnModel, rowIdx, rowObj)}`);
  },
  handleRowClick(event, rowObj) {
    alert(`Click on a row, ${rowCallbackParamsToJSON(rowObj)}`);
  },
  handleRowDoubleClick(event, rowObj) {
    alert(`Double click on a row, ${rowCallbackParamsToJSON(rowObj)}`);
  },
  render() {
    return (
      <Grid
        columnsModel={mockTableColumnsModel}
        tableData={mockTableBodyData}
        onCellClick={this.handleCellClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onRowClick={this.handleRowClick}
        onRowDoubleClick={this.handleRowDoubleClick}
      />
    );
  }
});

ReactDOM.render(<GridClickEventExample />, mountNode);

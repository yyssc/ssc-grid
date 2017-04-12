const mockColumnsData = [
  {type: 'string', id: 'id', label: '主键'},
  {type: 'string', id: 'danjubianhao', label: '单据编号'},
  {type: 'double', id: 'jine', label: '金额'},
  {type: 'boolean', id: 'enable', label: '启用' }
];

const mockTableData = [
  { id: '11', danjubianhao: '263X', jine: '2.00', enable: false },
  { id: '22', danjubianhao: 'D320', jine: '12.00', enable: true },
  { id: '33', danjubianhao: '263X', jine: '100.00', enable: false }
];

const GridSelectionBeforeSelectExample = React.createClass({
  handleBeforeSelect(rowIdx, rowObj /* , selected, event, selectedRows */) {
    if (rowObj.enable === true) {
      return true;
    }
    alert('只有状态为“启用”才能够被选中！');
    // return false;
  },

  handleSelect(rowIdx, rowObj, selected, event, selectedRows) {
    alert('被选中的数据：\n' + JSON.stringify(selectedRows, null, '  '));
  },

  handleSelectAll(/* tableData, selected , event, selectedRowsObj */) {
  },

  render() {
    return (
      <Grid
        columnsModel={mockColumnsData}
        tableData={mockTableData}
        selectRow={{
          mode: 'checkbox',
          onBeforeSelect: this.handleBeforeSelect,
          onSelect: this.handleSelect,
          onSelectAll: this.handleSelectAll
        }}
      />
    );
  }
});

ReactDOM.render(<GridSelectionBeforeSelectExample />, mountNode);

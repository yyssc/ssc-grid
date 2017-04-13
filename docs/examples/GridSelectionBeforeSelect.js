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

  handleBeforeSelectAll(tableData, selected, /* event */) {
    // 取消勾选的时候不进行判断
    if (selected === false) {
      return true;
    }
    // 所有行都是“启用”才可以进行全选操作
    if (tableData.reduce((acc, row) => acc && row.enable) === true) {
      return true;
    }
    alert('只有所有状态全是“启用”才能够进行全选！');
    // return false;
  },

  handleSelect(rowIdx, rowObj, selected, event, selectedRows) {
    if (selected === true) {
      alert('被选中的数据：\n' + JSON.stringify(selectedRows, null, '  '));
    }
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
          onBeforeSelectAll: this.handleBeforeSelectAll,
          onSelect: this.handleSelect,
          onSelectAll: this.handleSelectAll
        }}
      />
    );
  }
});

ReactDOM.render(<GridSelectionBeforeSelectExample />, mountNode);

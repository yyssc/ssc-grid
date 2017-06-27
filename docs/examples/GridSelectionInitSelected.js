const mockColumnsData = [
  {type: 'string', id: 'danjubianhao', 'label': '单据编号'},
  {type: 'double', id: 'jine', 'label': '金额'}
];

const mockTableData = [
  {
    danjubianhao: '263X2016111400000081',
    jine: '2.00'
  },
  {
    danjubianhao: 'D32016091200000022',
    jine: '12.00'
  },
  {
    danjubianhao: '263X20160830000000345',
    jine: '100.00'
  },
  {
    danjubianhao: '263X2016083000002340025',
    jine: '10430.00'
  },
  {
    danjubianhao: '263X201608300005600025',
    jine: '1400.00'
  },
  {
    danjubianhao: '263X2016083000567000025',
    jine: '1070.00'
  },
  {
    danjubianhao: '263X2016083000234000025',
    jine: '1800.00'
  }
];

const GridSelectionInitSelectedExample = React.createClass({
  getInitialState() {
    return {
      // {0: {selected: true}} 说明选择了第1行
      selectedRowsObj: {},
    };
  },

  componentWillMount() {
    // 初始状态是全部未选中
    const selectedRowsObj = {};
    mockTableData.forEach((item, index) => {
      selectedRowsObj[index] = {
        selected: false,
      };
    });

    this.setState({
      selectedRowsObj,
    });
  },

  handleSelect(rowIdx, rowObj, selected, event, selectedRows) {
    const { selectedRowsObj } = this.state;
    selectedRowsObj[rowIdx] = { selected };
    this.setState({
      selectedRowsObj
    });
    if (selected === true) {
      alert('被选中的数据：\n' + JSON.stringify(selectedRows, null, '  '));
    }
  },

  handleSelectAll(tableData, selected/* , event, selectedRowsObj */) {
    let selectedRowsObj = {};
    tableData.forEach((row, idx) => {
      selectedRowsObj[idx] = { selected };
    });
    this.setState({
      selectedRowsObj
    });
  },

  render() {
    return (
      <Grid
        tableData={mockTableData}
        columnsModel={mockColumnsData}
        selectRow={{
          mode: 'checkbox',
          selected: {
            0: { selected: true },
            2: { selected: true },
          },
          onSelect: this.handleSelect,
          onSelectAll: this.handleSelectAll
        }}
      />
    );
  }
});

ReactDOM.render(<GridSelectionInitSelectedExample />, mountNode);

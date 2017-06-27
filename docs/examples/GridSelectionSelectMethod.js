const mockColumnsData = [
  {type: 'string', id: 'ticket_id', 'label': '单据编号'},
  {type: 'double', id: 'money', 'label': '金额'}
];

const mockTableData = [
  {
    ticket_id: '263X2016111400000081',
    money: '2.00'
  },
  {
    ticket_id: 'D32016091200000022',
    money: '12.00'
  },
  {
    ticket_id: '263X20160830000000345',
    money: '100.00'
  },
  {
    ticket_id: '263X2016083000002340025',
    money: '10430.00'
  },
  {
    ticket_id: '263X201608300005600025',
    money: '1400.00'
  },
  {
    ticket_id: '263X2016083000567000025',
    money: '1070.00'
  },
  {
    ticket_id: '263X2016083000234000025',
    money: '1800.00'
  }
];

const GridSelectionSelectMethodExample = React.createClass({
  getInitialState() {
    return {
      ticket_id: '', // textbox
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

  handleChange(event) {
    this.setState({
      ticket_id: event.target.value,
    });
  },

  handleClick() {
    this.gridRef.select('ticket_id', this.state.ticket_id, true);
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
      <div>
        <label>ticket_id</label>
        <input value={this.state.ticket_id} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Select row</button>
        <Grid
          ref={(c) => { this.gridRef = c; }}
          tableData={mockTableData}
          columnsModel={mockColumnsData}
          selectRow={{
            mode: 'checkbox',
            onSelect: this.handleSelect,
            onSelectAll: this.handleSelectAll
          }}
        />
      </div>
    );
  }
});

ReactDOM.render(<GridSelectionSelectMethodExample />, mountNode);

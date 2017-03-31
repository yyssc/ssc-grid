const mockColumnsData = [
  {type: 'string', id: 'danjubianhao', 'label': '单据编号'},
  {type: 'double', id: 'jine', 'label': '金额'}
];

// 每个分页显示三行数据
const ItemsPerPage = 3;

// 伪造AJAX请求，并返回分页后的数据
function fakeAjax(startIndex, itemPerPage) {
  const db = [
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
  let index;
  let items = [];
  for (index = startIndex; index < (startIndex + itemPerPage); index++) {
    if (!db[index]) continue;
    items.push(db[index]);
  }
  return {
    items,
    totalItems: db.length
  };
}

const GridSelectionExample = React.createClass({
  getInitialState() {
    return {
      tableData: [],
      // {0: {selected: true}} 说明选择了第1行
      selectedRowsObj: {}
    };
  },

  componentWillMount() {
    // 页面初始化的时候，首次AJAX请求，从index为0开始获取数据
    const response = fakeAjax(0, ItemsPerPage);

    // 初始状态是全部未选中
    const selectedRowsObj = {};
    response.items.forEach((item, index) => {
      selectedRowsObj[index] = {
        selected: false
      };
    });

    this.setState({
      tableData: response.items,
      selectedRowsObj
    });
  },

  handleSelect(rowIdx, rowObj, selected/* , event, selectedRowsObj */) {
    const { selectedRowsObj } = this.state;
    selectedRowsObj[rowIdx] = { selected };
    this.setState({
      selectedRowsObj
    });
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
        tableData={this.state.tableData} columnsModel={mockColumnsData}
        selectRow={{
          mode: 'checkbox',
          onSelect: this.handleSelect,
          onSelectAll: this.handleSelectAll
        }}
      />
    );
  }
});

ReactDOM.render(<GridSelectionExample />, mountNode);

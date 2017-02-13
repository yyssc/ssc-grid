const mockColumnsData = [
  {key: 'string', 'label': '单据编号'},
  {key: 'double', 'label': '金额'}
];

// 每个分页显示三行数据
const ItemsPerPage = 3;

// 伪造AJAX请求，并返回分页后的数据
function fakeAjax(startIndex, itemPerPage) {
  const db = [
    {'id': 11, 'cols': [
      {'value': '263X2016111400000081'}, {'value': '2.00'}
    ]},
    {'id': 22, 'cols': [
      {'value': 'D32016091200000022'}, {'value': '12.00'}
    ]},
    {'id': 33, 'cols': [
      {'value': '263X20160830000000345'}, {'value': '100.00'}
    ]},
    {'id': 44, 'cols': [
      {'value': '263X2016083000002340025'}, {'value': '10430.00'}
    ]},
    {'id': 55, 'cols': [
      {'value': '263X201608300005600025'}, {'value': '1400.00'}
    ]},
    {'id': 66, 'cols': [
      {'value': '263X2016083000567000025'}, {'value': '1070.00'}
    ]},
    {'id': 77, 'cols': [
      {'value': '263X2016083000234000025'}, {'value': '1800.00'}
    ]}
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

const GridExample = React.createClass({
  getInitialState() {
    return {
      tableData: [],
      totalPage: 1,
      activePage: 1
    };
  },

  componentWillMount() {
    // 页面初始化的时候，首次AJAX请求，从index为0开始获取数据
    const response = fakeAjax(0, ItemsPerPage);

    // 计算需要多少个页面
    const totalPage = Math.ceil(response.totalItems / ItemsPerPage);

    // 页面初始化的时候从“第1页”开始显示
    const activePage = 1;

    this.setState({
      tableData: response.items,
      totalPage,
      activePage
    });
  },

  // 如果当前页面是“第2页”，那么`nextPage=3`
  handlePagination(nextPage) {
    // 通过组件返回的下一个页面的号码，计算出下一个页面第一行的index
    const startIndex = (nextPage - 1) * ItemsPerPage;

    // 发起AJAX请求，获取下一页的数据
    const response = fakeAjax(startIndex, ItemsPerPage);

    this.setState({
      tableData: response.items,
      activePage: nextPage
    });
  },

  render() {
    return (
      <Grid
        tableData={this.state.tableData} cols={mockColumnsData}
        paging
        totalPage={this.state.totalPage}
        activePage={this.state.activePage}
        onPagination={this.handlePagination}
      />
    );
  }
});

ReactDOM.render(<GridExample />, mountNode);

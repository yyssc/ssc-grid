const tableData = [
  {
    id: '11',
    danjubianhao: '263X2016111400000081',
    danjuleixing: '2632',
    jine: '2.00',
    danjuriqi: '2016-11-14',
    qiyong: true,
    xingbie: 'male',
    zuzhi: '组织1'
  },
  {
    id: '22',
    danjubianhao: 'D32016091200000022',
    danjuleixing: 'D3',
    jine: '12.00',
    danjuriqi: '2016-09-12',
    qiyong: false,
    xingbie: 'female',
    zuzhi: '组织2'
  },
  {
    id: '33',
    danjubianhao: '263X2016083000000025',
    danjuleixing: '2631',
    jine: '100.00',
    danjuriqi: '2016-08-30',
    qiyong: true,
    xingbie: 'male',
    zuzhi: '组织3'
  }
];

const mockColumnsData = [
  {type: 'string', id: 'id', label: '主键'},
  {type: 'string', id: 'danjubianhao', label: '单据编号'},
  {type: 'enum', id: 'danjuleixing', label: '单据类型',
    data: [
      {key: '2631', value: '差旅费借款单'},
      {key: '2632', value: '会议费借款单'},
      {key: 'D3', value: '付款单'}
    ]
  },
  {type: 'double', id: 'jine', label: '金额'},
  {type: 'date', id: 'danjuriqi', label: '单据日期'},
  {type: 'boolean', id: 'qiyong', label: '启用'},
  {type: 'enum', id: 'xingbie', label: '性别', data: [
    {
      key: 'male',
      value: '男'
    },
    {
      key: 'female',
      value: '女'
    }
  ]},
  {type: 'ref', id: 'zuzhi', label: '组织'}
];

const CustomComponent = React.createClass({
  handleUpdate(event) {
    alert(`CustomComponent, handleUpdate,\n
      Row index is: ${this.props.rowIdx},\n
      Row obj.id is: ${this.props.rowObj.id}`);
    event.preventDefault();
  },

  handleDelete(event) {
    alert(`CustomComponent, handleDelete,\n
      Row index is: ${this.props.rowIdx},\n
      Row obj.id is: ${this.props.rowObj.id}`);
    event.preventDefault();
  },

  render() {
    return (
      <td>
        <span onClick={this.handleUpdate}
          className="glyphicon glyphicon-pencil"></span>
        <span onClick={this.handleDelete}
          className="glyphicon glyphicon-trash"></span>
      </td>
    );
  }
});

const GridOperationExample = React.createClass({
  getInitialState() {
    return {
    };
  },

  render() {
    return (
      <Grid columnsModel={mockColumnsData} tableData={tableData}
        operationColumn={{}}
        operationColumnClass={CustomComponent}
      />
    );
  }

});

ReactDOM.render(<GridOperationExample />, mountNode);

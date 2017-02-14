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

const GridOperationExample = React.createClass({
  getInitialState() {
    return {
    };
  },

  handleEdit(rowIdx, row, event) {
    alert(`Row index is: ${rowIdx}`);
    event.preventDefault();
  },

  handleRemove(rowIdx, row, event) {
    alert(`Row index is: ${rowIdx}`);
    event.preventDefault();
  },

  render() {
    return (
      <Grid columnsModel={mockColumnsData} tableData={tableData} operateColumn
        onEdit={this.handleEdit}
        onRemove={this.handleRemove}
      >
        {/* <td><input type='button' onClick={this.handleClick} value='修改' /></td> */}
      </Grid>
    );
  }

});

ReactDOM.render(<GridOperationExample />, mountNode);

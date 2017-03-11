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

const mockTableData = [
  {}, // 空行
  {
    id: undefined,
    danjubianhao: undefined,
    danjuleixing: undefined,
    jine: undefined,
    danjuriqi: undefined,
    qiyong: undefined,
    xingbie: undefined,
    zuzhi: undefined
  },
  {
    id: null,
    danjubianhao: null,
    danjuleixing: null,
    jine: null,
    danjuriqi: null,
    qiyong: null,
    xingbie: null,
    zuzhi: null
  }
];


const GridStyleExample = React.createClass({
  render() {
    return (
      <Grid bordered columnsModel={mockColumnsData} tableData={mockTableData} />
    );
  }
});

ReactDOM.render(<GridStyleExample />, mountNode);

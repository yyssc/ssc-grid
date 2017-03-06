const tableData = [
  {
    id: '11',
    name: '测试名称1',
    danjubianhao: '263X2016111400000081',
    danjuleixing: '2632',
    jine: '2.00',
    danjuriqi: '2016-11-14',
    qiyong: true,
    xingbie: 'male',
    zuzhi: {
      id: '22EA0EB9-FABA-4224-B290-5D041A1DF773',
      code: '0403',
      name: '委外部3'
    }
  },
  {
    id: '22',
    name: '测试名称2',
    danjubianhao: 'D32016091200000022',
    danjuleixing: 'D3',
    jine: '12.00',
    danjuriqi: '2016-09-12',
    qiyong: false,
    xingbie: 'female',
    zuzhi: {
      id: '22EA0EB9-FABA-4224-B290-5D041A1DF772',
      code: '0402',
      name: '委外部2'
    }
  },
  {
    id: '33',
    name: '测试名称3',
    danjubianhao: '263X2016083000000025',
    danjuleixing: '2631',
    jine: '100.00',
    danjuriqi: '2016-08-30',
    qiyong: true,
    xingbie: null,
    zuzhi: null
  }
];

const mockColumnsData = [
  {type: 'string', id: 'id', label: '主键'},
  {type: 'string', id: 'name', label: '名称', hidden: true},
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

const gridInstance = (
  <Grid columnsModel={mockColumnsData} tableData={tableData} />
);

ReactDOM.render(gridInstance, mountNode);

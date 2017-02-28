const tableData = [
  {
    id: '11',
    danjubianhao: '263X2016111400000081',
    jine: '2.00',
    danjuriqi: '2016-11-14',
    danjuriqi2: new Date('2016-11-14').toISOString(),
    danjuriqi3: new Date('2016-11-14').toISOString(),
    qiyong: true
  },
  {
    id: '22',
    danjubianhao: 'D32016091200000022',
    jine: '12.00',
    danjuriqi: '2016-09-12',
    danjuriqi2: new Date('2016-09-12').toISOString(),
    danjuriqi3: new Date('2016-09-12').toISOString(),
    qiyong: false
  },
  {
    id: '33',
    danjubianhao: '263X2016083000000025',
    jine: '100.00',
    danjuriqi: '2016-08-30',
    danjuriqi2: new Date('2016-08-30').toISOString(),
    danjuriqi3: new Date('2016-08-30').toISOString(),
    qiyong: true
  }
];

const mockColumnsData = [
  {type: 'string', id: 'id', label: '主键'},
  {type: 'string', id: 'danjubianhao', label: '单据编号'},
  {type: 'double', id: 'jine', label: '金额'},
  {type: 'date', id: 'danjuriqi', label: '单据日期'},
  {type: 'date', id: 'danjuriqi2', label: '单据日期2', formatter: {}},
  {type: 'date', id: 'danjuriqi3', label: '单据日期3', formatter: { format: 'dddd, MMMM Do YYYY, h:mm:ss a' }},
  {type: 'boolean', id: 'qiyong', label: '启用'}
];

const GridColumnAlignExample = React.createClass({
  render() {
    return (
      <Grid columnsModel={mockColumnsData} tableData={tableData} />
    );
  }
});

ReactDOM.render(<GridColumnAlignExample />, mountNode);

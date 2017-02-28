const tableData = [
  {
    id: '11',
    danjubianhao: '263X2016111400000081',
    jine: '2.00',
    danjuriqi: '2016-11-14',
    qiyong: true,
    zuzhi: '组织1'
  },
  {
    id: '22',
    danjubianhao: 'D32016091200000022',
    jine: '12.00',
    danjuriqi: '2016-09-12',
    qiyong: false,
    zuzhi: '组织2'
  },
  {
    id: '33',
    danjubianhao: '263X2016083000000025',
    jine: '100.00',
    danjuriqi: '2016-08-30',
    qiyong: true,
    zuzhi: '组织3'
  }
];

const mockColumnsData = [
  {type: 'string', id: 'id', label: '主键(left)', align: 'left'},
  {type: 'string', id: 'danjubianhao', label: '单据编号(center)', align: 'center'},
  {type: 'double', id: 'jine', label: '金额(right)', align: 'right'},
  {type: 'date', id: 'danjuriqi', label: '单据日期(center)', align: 'center'},
  {type: 'boolean', id: 'qiyong', label: '启用(left)', align: 'left'},
  {type: 'ref', id: 'zuzhi', label: '组织(center)', align: 'center'}
];

const GridColumnAlignExample = React.createClass({
  render() {
    return (
      <Grid columnsModel={mockColumnsData} tableData={tableData} />
    );
  }
});

ReactDOM.render(<GridColumnAlignExample />, mountNode);

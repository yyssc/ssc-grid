const tableData = [
  {
    id: '11',
    name: '测试名称1',
    danjubianhao: '263X2016111400000081',
    jine: '2.00',
    danjuriqi: '2016-11-14',
    qiyong: true
  },
  {
    id: '22',
    name: '测试名称2',
    danjubianhao: 'D32016091200000022',
    jine: '12.00',
    danjuriqi: '2016-09-12',
    qiyong: false
  },
  {
    id: '33',
    name: '测试名称3',
    danjubianhao: '263X2016083000000025',
    jine: '100.00',
    danjuriqi: '2016-08-30',
    qiyong: true
  }
];

const mockColumnsData = [
  {type: 'string', id: 'name', label: '名称', columnClassName: 'table-column-name'},
  {type: 'string', id: 'danjubianhao', label: '单据编号'},
  {type: 'double', id: 'jine', label: '金额', columnClassName: 'table-column-jine'},
  {type: 'date', id: 'danjuriqi', label: '单据日期'},
  {type: 'boolean', id: 'qiyong', label: '启用', columnClassName: 'table-column-qiyong'}
];

const styles = `th.table-column-jine {
  width: 300px;
}
td.table-column-jine {
  font-style: italic;
}`;

const gridInstance = (
  <div>
    <style>{styles}</style>
    <Grid columnsModel={mockColumnsData} tableData={tableData} />
  </div>
);

ReactDOM.render(gridInstance, mountNode);

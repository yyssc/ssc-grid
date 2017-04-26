const tableData = [
  {
    id: '11',
    danjubianhao: '263X2016111400000081',
    jine: '2.00',
    enable: true
  },
  {
    id: '22',
    danjubianhao: 'D32016091200000022',
    jine: '12.00',
    enable: false
  },
  {
    id: '33',
    danjubianhao: '263X2016083000000025',
    jine: '100.00',
    enable: true
  }
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
      <div>
        <span onClick={this.handleUpdate}
          className="glyphicon glyphicon-pencil"></span>
        <span onClick={this.handleDelete}
          className="glyphicon glyphicon-trash"></span>
      </div>
    );
  }
});

const mockColumnsData = [
  { type: 'string', id: 'id', label: '主键' },
  { type: 'string', id: 'danjubianhao', label: '单据编号',
    floatOperationComponent: CustomComponent },
  { type: 'double', id: 'jine', label: '金额' },
  { type: 'boolean', id: 'enable', label: '启用' }
];

const GridOperationExample = React.createClass({
  getInitialState() {
    return {
    };
  },

  render() {
    return (
      <Grid
        columnsModel={mockColumnsData}
        tableData={tableData}
      />
    );
  }

});

ReactDOM.render(<GridOperationExample />, mountNode);

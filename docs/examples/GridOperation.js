const tableData = [
  {
    id: '11',
    danjubianhao: '263X2016111400000081',
    jine: '2.00',
  },
  {
    id: '22',
    danjubianhao: 'D32016091200000022',
    jine: '12.00',
  },
  {
    id: '33',
    danjubianhao: '263X2016083000000025',
    jine: '100.00',
  }
];

const mockColumnsData = [
  {type: 'string', id: 'id', label: '主键'},
  {type: 'string', id: 'danjubianhao', label: '单据编号'},
  {type: 'double', id: 'jine', label: '金额'},
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
        operationColumn={{
          className: 'operation',
          text: '操作列'
        }}
        operationColumnClass={CustomComponent}
      />
    );
  }

});

ReactDOM.render(<GridOperationExample />, mountNode);

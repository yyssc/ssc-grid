const tableData = [
  { money: 1.00, money2: 1.00, money3: 1.00 },
];

const mockColumnsData = [
  // the default alignment for double type is right
  { type: 'double', id: 'money', label: 'Money' },
  // align attribute will override the default alignment for double type
  { type: 'double', id: 'money2', label: 'Money(align: left)', align: 'left' },
  // columnClassName will override the default alignment for double type, and also align attribute
  { type: 'double', id: 'money3', label: 'Money(align: center)', align: 'left', columnClassName: 'text-center' },
];

const GridColumnAlign2Example = React.createClass({
  render() {
    return (
      <Grid
        bordered
        columnsModel={mockColumnsData}
        tableData={tableData}
      />
    );
  }
});

ReactDOM.render(<GridColumnAlign2Example />, mountNode);

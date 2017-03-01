const DatePickerFormatterExample = React.createClass({
  getInitialState() {
    const now = new Date().toISOString();
    return {
      values: [now, now, now, now]
    };
  },
  handleChange(index, value, /* formattedValue */) {
    const { values } = this.state;
    values[index] = value;
    this.setState({ values });
  },
  render() {
    return (<div>
      <DatePicker dateFormat="MM/DD/YYYY" value={this.state.values[0]} onChange={this.handleChange.bind(this, 0)} />
      <DatePicker dateFormat="YYYY/MM/DD" value={this.state.values[1]} onChange={this.handleChange.bind(this, 1)} />
      <DatePicker dateFormat="MM-DD-YYYY" value={this.state.values[2]} onChange={this.handleChange.bind(this, 2)} />
      <DatePicker dateFormat="DD MM YYYY" value={this.state.values[3]} onChange={this.handleChange.bind(this, 3)} />
    </div>);
  }
});

ReactDOM.render(<DatePickerFormatterExample />, mountNode);

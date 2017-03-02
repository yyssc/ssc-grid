const MonthPickerExample = React.createClass({
  getInitialState() {
    const value = '2016-02';
    return {
      value
    };
  },
  handleChange(value, formattedValue) {
    this.setState({
      value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
      formattedValue // Formatted String, ex: "11/19/2016"
    });
  },
  render() {
    return (<MonthPicker
      value={this.state.value}
      onChange={this.handleChange}
    />);
  }
});

ReactDOM.render(<MonthPickerExample />, mountNode);

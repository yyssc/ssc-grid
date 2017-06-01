const DatePicker2Example = React.createClass({
  getInitialState() {
    const value = new Date('2017-02-14').toISOString();
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
    return (<DatePicker2
      value={this.state.value}
      onChange={this.handleChange}
    />);
  }
});

ReactDOM.render(<DatePicker2Example />, mountNode);

const YearPickerExample = React.createClass({
  getInitialState() {
    const value = '2016';
    return {
      value
    };
  },
  handleChange(value, formattedValue) {
    this.setState({
      value, // ISO String, ex: "2016"
      formattedValue // Formatted String, ex: "2016年"
    });
  },
  render() {
    return (<YearPicker
      value={this.state.value}
      onChange={this.handleChange}
    />);
  }
});

ReactDOM.render(<YearPickerExample />, mountNode);

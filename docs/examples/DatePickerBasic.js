const DatePickerExample = React.createClass({
  getInitialState() {
    const value = new Date().toISOString();
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
  componentDidUpdate() {
    // Access ISO String and formatted values from the DOM.
    // const hiddenInputElement = document.getElementById('example-datepicker');
    // console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    // console.log(hiddenInputElement.getAttribute('data-formattedvalue')); // Formatted String, ex: "11/19/2016"
  },
  render() {
    return (<DatePicker
      id="example-datepicker"
      value={this.state.value}
      onChange={this.handleChange}
    />);
  }
});

ReactDOM.render(<DatePickerExample />, mountNode);

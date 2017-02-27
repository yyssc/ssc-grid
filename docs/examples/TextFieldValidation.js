const TextFieldValidationExample = React.createClass({
  render() {
    return (
      <TextField
        validationType="email"
        value="foo@bar.com"
      />
    );
  }
});

ReactDOM.render(<TextFieldValidationExample />, mountNode);

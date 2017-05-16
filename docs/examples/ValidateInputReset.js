const ValidateInputResetExample = React.createClass({
  handleClick() {
    this.validateInputRef.reset();
  },
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>重置文本框</button>
        <ValidateInput
          ref={(c) => this.validateInputRef = c}
          validators={[
            { type: 'required' },
          ]}
        />
      </div>
    );
  }
});

ReactDOM.render(<ValidateInputResetExample />, mountNode);

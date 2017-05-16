const ValidateInputDoValidateExample = React.createClass({
  handleClick() {
    let result = this.validateInputRef.doValidate();
    alert('校验状态为:' + (result ? '成功' : '失败'));
  },
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>主动校验</button>
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

ReactDOM.render(<ValidateInputDoValidateExample />, mountNode);

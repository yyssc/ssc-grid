const ValidateRefersResetExample = React.createClass({
  handleClick() {
    this.validateRefersRef.reset();
  },
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>重置参照</button>
        <ValidateRefers
          ref={(c) => this.validateRefersRef = c}
          validators={[
            { type: 'required' },
          ]}
          referConditions={{
            refCode: 'user',
            refType: 'tree',
            rootName: '部门主管',
          }}
          referDataUrl="http://127.0.0.1:3009/userCenter/queryUserAndDeptByDeptPk"
          selected={[]}
        />
      </div>
    );
  }
});

ReactDOM.render(<ValidateRefersResetExample />, mountNode);

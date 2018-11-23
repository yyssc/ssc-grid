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
          referDataUrl="http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON"
          selected={[]}
        />
      </div>
    );
  }
});

ReactDOM.render(<ValidateRefersResetExample />, mountNode);

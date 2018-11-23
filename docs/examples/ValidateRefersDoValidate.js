const ValidateRefersDoValidateExample = React.createClass({
  handleClick() {
    let result = this.validateRefersRef.doValidate();
    alert('校验状态为:' + (result ? '成功' : '失败'));
  },
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>主动校验</button>
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

ReactDOM.render(<ValidateRefersDoValidateExample />, mountNode);

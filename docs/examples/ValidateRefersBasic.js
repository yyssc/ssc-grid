const ValidateRefersBasicExample = React.createClass({
  render() {
    return (
      <div>
        <h3>演示内置校验类型</h3>
        <p>验证必选字段</p>
        <ValidateRefers
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

ReactDOM.render(<ValidateRefersBasicExample />, mountNode);

const ValidateRefersBasicExample = React.createClass({
  _renderMenuItemChildren(option, props, index) {
    let label = option.name;
    return (<span title={label} key={index}>{label} </span>);
  },
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
          referDataUrl="http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON"
          selected={[]}
          renderMenuItemChildren={this._renderMenuItemChildren}
        />
      </div>
    );
  }
});

ReactDOM.render(<ValidateRefersBasicExample />, mountNode);

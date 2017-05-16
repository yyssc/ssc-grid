const ValidateInputBasicExample = React.createClass({
  render() {
    return (
      <div>
        <h3>演示内置校验类型</h3>
        <p>验证货币格式</p>
        <ValidateInput
          validators={[
            { type: 'currency' },
          ]}
          value="99.99"
        />
        <p>验证数字格式</p>
        <ValidateInput
          validators={[
            { type: 'decimal' },
          ]}
          value="1.23"
        />
        <p>验证邮箱格式</p>
        <ValidateInput
          validators={[
            { type: 'email' },
          ]}
          value="foo@bar.com"
        />
        <p>验证整数格式</p>
        <ValidateInput
          validators={[
            { type: 'int' },
          ]}
          value="123"
        />
        <p>验证手机号</p>
        <ValidateInput
          validators={[
            { type: 'mobilePhone' },
          ]}
          value="13210254539"
        />
        <h3>演示内置校验类型的自定义提示文字</h3>
        <p>验证邮箱格式，使用自定义错误提示</p>
        <ValidateInput
          validators={[
            {
              type: 'email',
              helpText: value => `这里是Email类型的自定义错误提示，您输入的${value}不符合规范！`
            },
          ]}
          value="foo@bar.com"
        />
        <h3>演示自定义校验类型</h3>
        <p>自定义验证格式，使用自定义错误提示</p>
        <ValidateInput
          validators={[
            {
              type: 'custom',
              helpText: value => `您输入的“${value}”必须大于5个字符！`,
              matchFunc: value => value.length > 5
            },
          ]}
          value="abcdefg"
        />
      </div>
    );
  }
});

ReactDOM.render(<ValidateInputBasicExample />, mountNode);

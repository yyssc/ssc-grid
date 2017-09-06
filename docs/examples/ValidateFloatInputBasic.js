const ValidateFloatInputBasicExample = React.createClass({
  render() {
    return (
      <div>
        缺省值
        <ValidateFloatInput />
        给定初始值
        <ValidateFloatInput value="123" />
        必选项
        <ValidateFloatInput required />
        数值长度校验
        <ValidateFloatInput min={1} max={9} />
      </div>
    );
  }
});

ReactDOM.render(<ValidateFloatInputBasicExample />, mountNode);

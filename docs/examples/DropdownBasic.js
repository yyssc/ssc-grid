const DropdownExample = React.createClass({
  getInitialState() {
    return {
    };
  },

  handleSelect(/* selectedItem, event */) {
  },

  render() {
    const data = [
      {id: 'zh_CN', name: '简体中文'},
      {id: 'en_US', name: '英文美国'}
    ];
    return (
      <Dropdown
        dropdownId="dropdown-example"
        defaultTitle="请选择"
        data={data}
        onSelect={this.handleSelect}
      />
    );
  }

});

ReactDOM.render(<DropdownExample />, mountNode);

const mockFieldsModel = [
  {type: 'string', id: 'danjubianhao', 'label': '单据编号'},
  {type: 'string', id: 'jine', 'label': '金额'},
  {type: 'string', id: 'danjuriqi', label: '单据日期'},
  {type: 'string', id: 'qiyong', label: '启用'},
  {type: 'string', id: 'zuzhi', label: '组织'}
];

const mockFormData = {
  danjubianhao: 'abc123',
  jine: '12.00',
  danjuriqi: '2017-02-14',
  qiyong: false,
  zuzhi: '用友'
};

const F0rmExample = React.createClass({
  getInitialState() {
    return {
      foo: 'bar'
    };
  },

  handleBlur(/* index, fieldModel, value */) {
  },

  handleChange(event, fieldId) {
    const newState = {
      formData: {}
    };
    newState.formData[fieldId] = event.target.value;
    this.setState(newState);
  },

  handleSubmit(event, formData) {
    alert('提交的数据: F0rm.state.formData: \n' + JSON.stringify(
      formData,
      null, '  '));
    event.preventDefault();
  },

  render() {
    return (
      <F0rm
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<F0rmExample />, mountNode);

const mockFieldsModel = [
  {type: 'string', id: 'danjubianhao', 'label': '单据编号'},
  {type: 'enum', id: 'danjuleixing', 'label': '单据类型', 'placeholder': '请选择单据类型',
    data: [
      {key: '2631', value: '差旅费借款单'},
      {key: '2632', value: '会议费借款单'},
      {key: 'D3', value: '付款单'}
    ]
  },
  {type: 'double', id: 'jine', 'label': '金额'},
  {type: 'date', id: 'danjuriqi', label: '单据日期'},
  {type: 'boolean', id: 'qiyong', label: '启用'},
  {type: 'ref', id: 'zuzhi', label: '组织'}
];

const mockFormData = {
  danjubianhao: 'abc123',
  danjuleixing: 'D3',
  jine: '12.00',
  danjuriqi: new Date('2017-02-14').toISOString(),
  qiyong: false,
  zuzhi: '用友'
};

const FormExample = React.createClass({
  getInitialState() {
    return {
      formData: {}
    };
  },

  handleBlur(/* index, fieldModel, value */) {
  },

  handleChange(fieldId, value) {
    const newState = { ...this.state };
    newState.formData[fieldId] = value;
    this.setState(newState);
  },

  handleSubmit(event, formData) {
    alert('提交的数据: Form.state.formData: \n' + JSON.stringify(
      formData,
      null, '  '));
    event.preventDefault();
  },

  render() {
    return (
      <Form
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<FormExample />, mountNode);

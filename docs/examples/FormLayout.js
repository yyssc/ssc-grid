const mockFieldsModel = [
  {type: 'hidden', id: 'formLayoutId', label: '主键'},
  {type: 'string', id: 'formLayoutDanjubianhao', label: '单据编号'},
  {type: 'hidden', id: 'formLayoutName2', label: '名称2'},
  {type: 'hidden', id: 'formLayoutName3', label: '名称3'},
  {type: 'hidden', id: 'formLayoutName4', label: '名称4'},
  {type: 'enum', id: 'formLayoutDanjuleixing', label: '单据类型', placeholder: '请选择单据类型',
    data: [
      {key: '2631', value: '差旅费借款单'},
      {key: '2632', value: '会议费借款单'},
      {key: 'D3', value: '付款单'}
    ]
  },
  {type: 'double', id: 'formLayoutJine', label: '金额'},
  {type: 'date', id: 'formLayoutDanjuriqi', label: '单据日期'},
  {type: 'boolean', id: 'formLayoutQiyong', label: '启用'}
];

const mockFormData = {
  formLayoutId: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
  formLayoutDanjubianhao: 'abc123',
  formLayoutName2: '名称2',
  formLayoutName3: '名称3',
  formLayoutName4: '名称4',
  formLayoutDanjuleixing: 'D3',
  formLayoutJine: '12.00',
  formLayoutDanjuriqi: new Date('2017-02-14').toISOString(),
  formLayoutQiyong: false
};

const FormLayoutExample = React.createClass({
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

  handleSubmit(formData) {
    alert('提交的数据: Form.state.formData: \n' + JSON.stringify(
      formData,
      null, '  '));
  },

  handleReset(/* event */) {
  },

  render() {
    return (
      <Form
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        layout={{
          columnCount: 3,
          columnWidth: 4
        }}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
        onReset={this.handleReset}
      />
    );
  }

});

ReactDOM.render(<FormLayoutExample />, mountNode);

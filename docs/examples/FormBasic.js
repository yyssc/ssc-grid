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
  {type: 'enum', id: 'xingbie', label: '性别', data: [
    {
      key: 'male',
      value: '男'
    },
    {
      key: 'female',
      value: '女'
    }
  ]},
  {type: 'ref', id: 'zuzhi', label: '组织'}
];

const mockFormData = {
  danjubianhao: 'abc123',
  danjuleixing: 'D3',
  jine: '12.00',
  danjuriqi: '2017-02-14',
  qiyong: false,
  xingbie: 'male',
  zuzhi: '用友'
};

const FormExample = React.createClass({
  getInitialState() {
    return {
    };
  },

  handleBlur(/* index, fieldModel, value */) {
  },

  handleSubmit(event, formData) {
    alert('提交的数据: \n' + JSON.stringify(
      formData,
      null, '  '));
    event.preventDefault();
  },

  render() {
    return (
      <Form
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<FormExample />, mountNode);

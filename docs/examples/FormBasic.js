const mockFormData = [
  {key: 'string', 'label': '单据编号'},
  {key: 'enum', 'label': '单据类型', 'placeholder': '请选择单据类型',
    data: [
      {key: '2631', value: '差旅费借款单'},
      {key: '2632', value: '会议费借款单'},
      {key: 'D3', value: '付款单'}
    ]
  },
  {key: 'double', 'label': '金额'},
  {key: 'date', label: '单据日期'},
  {key: 'boolean', label: '启用'},
  {key: 'enum', label: '性别', data: [
    {
      key: "male",
      value: "男"
    },
    {
      key: "female",
      value: "女"
    }
  ]},
  {key: 'ref', label: '组织（参照类型）'}
];

const FormExample = React.createClass({
  getInitialState() {
    return {
    };
  },

  handleBlur() {
  },

  handleSubmit(event, formData) {
    alert('提交的数据: \n' + JSON.stringify(
      formData.map(function createValue(field) {
        return field.value;
      }),
      null, '  '));
    event.preventDefault();
  },

  render() {
    return (
      <Form formDefaultData={mockFormData}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<FormExample />, mountNode);

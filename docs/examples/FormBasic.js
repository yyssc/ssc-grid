const formData = [
  {'type': 'string', 'label': '单据编号'},
  {'type': 'combo', 'label': '单据类型', 'placeholder': '请选择单据类型',
    cols: [
      {key: '2631', label: '差旅费借款单'},
      {key: '2632', label: '会议费借款单'},
      {key: 'D3', label: '付款单'}
    ]
  },
  {'type': 'money', 'label': '金额'}
];

const formInstance = (
  <Form formDefaultData={formData} />
);

ReactDOM.render(formInstance, mountNode);

const formData = [
  {'type': 'text', 'label': '单据编号'},
  {'type': 'text', 'label': '单据类型'},
  {'type': 'text', 'label': '单据状态'},
  {'type': 'money', 'label': '金额'},
  {'type': 'text', 'label': '单据日期'}
];

const formInstance = (
  <Form formDefaultData={formData} />
);

ReactDOM.render(formInstance, mountNode);

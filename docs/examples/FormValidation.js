const mockFieldsModel = [
  {type: 'string', id: 'id', label: '主键', hidden: true},
  {type: 'string', id: 'formValidationName', label: '名称',
    validators: [
      {type: 'required'},
      {type: 'length', options: {min: 3, max: 6}}
    ]
  },
  {type: 'string', id: 'formValidationDanjubianhao', label: '单据编号',
    validators: [
      {type: 'required'}
    ]
  },
  {type: 'string', id: 'formValidationEmail', label: '邮箱地址',
    validators: [
      {type: 'email'}
    ]
  },
  {type: 'ref', id: 'formValidationParentId', label: '上级部门',multiple: true,
    referConfig: {
      referConditions: {refCode: 'dept', refType: 'tree', rootName: '部门'},
      referDataUrl: 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'
    },
    validators: [
      {type: 'required'}
    ]
  },
  {type: 'enum', label: '账户性质', id: 'formValidationAccountProperty',
    data: [
      {key: 'BASE', value: '基本'},
      {key: 'NORMAL', value: '一般'},
      {key: 'TEMPORARY', value: '临时'},
      {key: 'SPECIAL', value: '专用'}
    ],
    validators: [
      {type: 'required'}
    ]
  }
];

const mockFormData = {
  formValidationName: '',
  formValidationDanjubianhao: '',
  formValidationEmail: '',
  formValidationParengId: null,
  formValidationAccountProperty: ''
};

const FormValidationExample = React.createClass({
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
    alert('提交的数据: formData: \n' + JSON.stringify(
      formData,
      null, '  '));
  },

  render() {
    return (
      <Form
        className="form-validation-example"
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<FormValidationExample />, mountNode);

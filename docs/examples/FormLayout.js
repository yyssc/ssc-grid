const mockLayout = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 3,
};

const mockFieldsModel = [
  {type: 'string', id: 'formLayoutId', label: '主键', hidden: true},
  {type: 'string', id: 'formLayoutDanjubianhao', label: '单据编号'},
  {type: 'string', id: 'formLayoutName2', label: '名称2', hidden: true},
  {type: 'string', id: 'formLayoutName3', label: '名称3', hidden: true},
  {type: 'string', id: 'formLayoutName4', label: '名称4', hidden: true},
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

  getLayoutFieldsModel(fieldsModel, columnCount) {
    let rowIdx = 0;
    let colIdx = 0;
    let layoutFieldsModel = [];
    fieldsModel.forEach((fieldModel) => {
      if (fieldModel.hidden === true) {
        return;
      }
      if (!layoutFieldsModel[rowIdx]) {
        layoutFieldsModel[rowIdx] = [];
      }
      if (colIdx === columnCount) {
        rowIdx++;
        colIdx = 0;
      } else {
        layoutFieldsModel[rowIdx].push(fieldModel);
        colIdx++;
      }
    });
    return layoutFieldsModel;
  },

  render() {
    return (
      <Form
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        layout={mockLayout}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
        onReset={this.handleReset}
      />
    );
  }

});

ReactDOM.render(<FormLayoutExample />, mountNode);

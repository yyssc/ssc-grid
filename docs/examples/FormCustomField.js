// 封装一个文本框作为自定义组件
const CustomTextFieldComponent = React.createClass({
  propTypes: {
    customFieldValue: React.PropTypes.string,
    onCustomFieldChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState() {
    return {
      value: this.props.customFieldValue
    };
  },
  handleChange(event) {
    let value = event.target.value;
    this.setState({ value });
    if (this.props.onCustomFieldChange) {
      this.props.onCustomFieldChange(value);
    }
  },
  render() {
    return (
      <input
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
});

const DropdownData = [
  {id: '2631', name: '差旅费借款单'},
  {id: '2632', name: '会议费借款单'},
  {id: 'D3', name: '付款单'}
];

// 封装一个下拉菜单作为自定义组件
const DropdownComponent = React.createClass({
  propTypes: {
    /**
     * Form组件传入的值
     * value = {id: '2631', name: '差旅费借款单'}
     */
    customFieldValue: React.PropTypes.object,
    onCustomFieldChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState() {
    return {
      /**
       * 下拉菜单的id，比如'2631'
       */
      dropdownId: this.props.customFieldValue.id
    };
  },
  handleChange(event) {
    let dropdownId = event.target.value;
    this.setState({
      dropdownId
    });
    if (this.props.onCustomFieldChange) {
      let value = DropdownData.find(item => item.id === dropdownId);
      this.props.onCustomFieldChange(value);
    }
  },
  render() {
    return (
      <FormControl componentClass="select"
        value={this.state.dropdownId}
        onChange={this.handleChange}
      >
        {DropdownData.map(
          opt => <option key={opt.id} value={opt.id}>{opt.name}</option>
        )}
      </FormControl>
    );
  }
});

// 封装一个参照组件作为自定义组件
const ReferComponent = React.createClass({
  propTypes: {
    /**
     * Form表单组件传入的值
     * ```js
     * [{
     *   id: 'G001ZM0000BASEDOCDEFAULTORG000000000',
     *   code: '0001',
     *   name: '默认组织'
     * }]
     * ```
     */
    customFieldValue: React.PropTypes.array,
    /**
     * 自定义类型字段发生变化的时候
     * @param {Object} value 参照值，比如
     * ```js
     * [{
     *   id: 'G001ZM0000BASEDOCDEFAULTORG000000000',
     *   code: '0001',
     *   name: '默认组织'
     * }]
     * ```
     */
    onCustomFieldChange: React.PropTypes.func
  },
  getDefaultProps() {
    return {
    };
  },
  getInitialState() {
    return {
    };
  },
  handleChange(selected) {
    // alert(JSON.stringify(selected));
    if (this.props.onCustomFieldChange) {
      this.props.onCustomFieldChange(selected);
    }
  },
  render() {
    const referConditions = {
      refCode: 'dept',
      refType: 'tree',
      rootName: '部门'
    };
    const referDataUrl = 'http://127.0.0.1:3009/refbase_ctr/queryRefJSON';
    return (
      <Refers
        disabled={false}
        minLength={0}
        align="justify"
        emptyLabel=""
        labelKey="name"
        onChange={this.handleChange}
        placeholder="请选择..."
        referConditions={referConditions}
        referDataUrl={referDataUrl}
        referType="list"
        defaultSelected={this.props.customFieldValue}
        ref={ref => this._myrefers = ref}
      />
    );
  }
});

const mockFieldsModel = [
  {type: 'string', id: 'id', label: '主键', hidden: true},
  {type: 'custom', id: 'name', label: '名称', component: CustomTextFieldComponent},
  {type: 'custom', id: 'danjuleixing', label: '单据类型',
    component: DropdownComponent, data: DropdownData},
  {type: 'custom', id: 'formCustomFieldParentId', label: '组织',
    component: ReferComponent}
];

const mockFormData = {
  id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
  name: '',
  danjuleixing: {
    id: 'D3',
    name: '付款单',
  },
  formCustomFieldParentId: [{
    code: 'fi',
    name: '财务部门',
    pid: '',
    id: '27A8CFA0-A8EF-4D0B-AF99-B31861849471',
    isLeaf: 'false'
  }]
};

const FormCustomFieldExample = React.createClass({
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

  render() {
    return (
      <Form
        className="form-custom-field-example"
        fieldsModel={mockFieldsModel}
        defaultData={mockFormData}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onBlur={this.handleBlur}
      />
    );
  }

});

ReactDOM.render(<FormCustomFieldExample />, mountNode);

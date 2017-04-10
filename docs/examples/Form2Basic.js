// const ReactBootstrap = require('react-bootstrap/lib/');

const Form2BasicExample = React.createClass({
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
      <ReactBootstrap.Grid>
        <Form2
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onBlur={this.handleBlur}
          onReset={this.handleReset}
        >
        <ReactBootstrap.Row>
          <ReactBootstrap.Col md={4}>
            <Field type="string" label="借款单位" value="东海天海光电有限公司" required />
          </ReactBootstrap.Col>
          <ReactBootstrap.Col md={4}>
            <Field type="string" label="单据编号" disabled />
          </ReactBootstrap.Col>
          <ReactBootstrap.Col md={4}>
            <Field type="string" label="单据状态" disabled />
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
        <ReactBootstrap.Row>
          <ReactBootstrap.Col md={4}>
            <Field type="date" label="单据日期" required />
          </ReactBootstrap.Col>
          <ReactBootstrap.Col md={4}>
            <Field type="string" label="币种" value="人民币" required />
          </ReactBootstrap.Col>
          <ReactBootstrap.Col md={4}>
            <Field type="double" label="合计金额" value="0.00" disabled required />
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
        <ReactBootstrap.Row>
          <ReactBootstrap.Col md={12}>
            <ReactBootstrap.Button type="submit">
              提交
            </ReactBootstrap.Button>
          </ReactBootstrap.Col>
        </ReactBootstrap.Row>
        </Form2>
      </ReactBootstrap.Grid>
    );
  }

});

ReactDOM.render(<Form2BasicExample />, mountNode);

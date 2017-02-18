import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';

function getFieldsModel() {
  return [
    {type: 'string', id: 'danjubianhao', label: '单据编号'},
    {type: 'enum', id: 'danjuleixing', label: '单据类型', placeholder: '请选择单据类型',
      data: [
        {key: '2631', value: '差旅费借款单'},
        {key: '2632', value: '会议费借款单'},
        {key: 'D3', value: '付款单'}
      ]
    },
    {type: 'string', id: 'danjuzhuangtai', label: '单据状态'},
    {type: 'double', id: 'jine', label: '金额'},
    {type: 'date', id: 'danjuriqi', label: '单据日期'},
    {type: 'boolean', id: 'qiyong', label: '启用'}
  ];
}

function getDefaultFormData() {
  return {
    danjubianhao: '123',
    danjuleixing: 'D3',
    danjuzhuangtai: '保存',
    jine: '12.00',
    danjuriqi: new Date('2017-02-14').toISOString(),
    qiyong: false
  };
}

describe('<Form>', () => {
  it('uses "form" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
      />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'FORM');
  });

  it('has "admin-form" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
        className="admin-form"
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'admin-form');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
      className="bob"/>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
  });

  it('Should change input value', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
      />
    );

    // 修改表单中第一个文本框“单据编号”中的值
    const node = ReactDOM.findDOMNode(instance);
    // const firstInputNode = node.querySelector('input');
    const firstInputNode = node.querySelectorAll('input')[0];
    firstInputNode.value = 'test';
    ReactTestUtils.Simulate.change(firstInputNode);
    assert.equal(firstInputNode.value, 'test');
    assert.equal(instance.state.formData.danjubianhao, 'test');
  });
});

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';

function getFieldsModel() {
  return [
    {'type': 'string', id: 'danjubianhao', 'label': '单据编号'},
    {'type': 'string', id: 'danjuleixing', 'label': '单据类型'},
    {'type': 'string', id: 'danjuzhuangtai', 'label': '单据状态'},
    {'type': 'double', id: 'jine', 'label': '金额'},
    {'type': 'string', id: 'danjuriqi', 'label': '单据日期'}
  ];
}

function getDefaultFormData() {
  return {
    danjubianhao: '123',
    danjuleixing: '类型1',
    danjuzhuangtai: '保存',
    jine: '12.00',
    danjuriqi: new Date('2017-02-14').toISOString()
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
});

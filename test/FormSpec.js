import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';

function getDefaultFormData() {
  return [
    {'type': 'text', 'label': '单据编号'},
    {'type': 'text', 'label': '单据类型'},
    {'type': 'text', 'label': '单据状态'},
    {'type': 'money', 'label': '金额'},
    {'type': 'text', 'label': '单据日期'}
  ];
}

describe('<Form>', () => {
  it('uses "div" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        formDefaultData={getDefaultFormData()}
      />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "admin-form" class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        formDefaultData={getDefaultFormData()}
        className="admin-form"
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).className, 'admin-form');
  });

  it('Should merge additional classes passed in', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        formDefaultData={getDefaultFormData()}
      className="bob"/>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
  });
});

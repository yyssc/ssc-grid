import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';
import { getForm } from './helpers';

describe('<Form>自定义布局', () => {

  it('应该显示自定义布局', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'hidden', id: 'id', 'label': '主键'},
          {type: 'string', id: 'danjubianhao', label: '单据编号'},
          {type: 'hidden', id: 'name2', label: '名称2'},
          {type: 'hidden', id: 'name3', label: '名称3'},
          {type: 'hidden', id: 'name4', label: '名称4'}
        ]}
        defaultData={{
          id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
          danjubianhao: '123',
          name2: '名称2',
          name3: '名称3',
          name4: '名称4'
        }}
        layout={{
          columnCount: 3,
          columnWidth: 4
        }}
      />
    );
    let form = getForm(instance);
    assert.equal(form.querySelectorAll('.row').length, 2);
    assert.equal(form.querySelectorAll('.col-md-4').length, 1);
  });

  it('属性改变了应该更新UI', () => {
    let node = document.createElement('div');
    let fakeFieldsModel = [];
    let fakeDefaultData = {};
    let component = ReactDOM.render(
      <Form
        fieldsModel={fakeFieldsModel}
        defaultData={fakeDefaultData}
        layout={{
          columnCount: 3,
          columnWidth: 4
        }}
      />, node
    );
    fakeFieldsModel = [
      {type: 'hidden', id: 'id', 'label': '主键'},
      {type: 'string', id: 'danjubianhao', label: '单据编号'},
      {type: 'hidden', id: 'name2', label: '名称2'},
      {type: 'hidden', id: 'name3', label: '名称3'},
      {type: 'hidden', id: 'name4', label: '名称4'}
    ];
    fakeDefaultData = {
      id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
      danjubianhao: '123',
      name2: '名称2',
      name3: '名称3',
      name4: '名称4'
    };
    component = ReactDOM.render(
      <Form
        fieldsModel={fakeFieldsModel}
        defaultData={fakeDefaultData}
        layout={{
          columnCount: 3,
          columnWidth: 4
        }}
      />, node
    );
    let form = getForm(component);
    assert.equal(form.querySelectorAll('.row').length, 2);
    assert.equal(form.querySelectorAll('.col-md-4').length, 1);
  });

});

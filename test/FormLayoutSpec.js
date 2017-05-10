import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';
import { getForm } from './helpers';

describe('<Form>自定义布局', () => {

  it('默认应该使用fluid样式', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[]}
        defaultData={{}}
        layout={{
          columnCount: 3,
          columnWidth: 4
        }}
      />
    );
    let form = getForm(instance);
    // 使用bootstrap grid system的fluid布局，可以让container的width不是固定的像素
    // <Form>
    //   <div class="containter-fluid">
    assert.equal(form.querySelectorAll('.container-fluid').length, 1);
  });

  it('应该显示自定义布局', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'id', 'label': '主键', hidden: true},
          {type: 'string', id: 'danjubianhao', label: '单据编号'},
          {type: 'string', id: 'name2', label: '名称2', hidden: true},
          {type: 'string', id: 'name3', label: '名称3', hidden: true},
          {type: 'string', id: 'name4', label: '名称4', hidden: true}
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

  it('在label和input之间显示空格', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'danjubianhao', label: '单据编号'},
          {type: 'string', id: 'name2', label: '名称2'},
          {type: 'string', id: 'name3', label: '名称3'},
          {type: 'string', id: 'name4', label: '名称4'},
        ]}
        defaultData={{
          danjubianhao: '123',
          name2: '名称2',
          name3: '名称3',
          name4: '名称4',
        }}
        layout={{
          columnCount: 2,
          columnWidth: 6,
        }}
      />
    );
    let form = getForm(instance);
    let formGroup = form.querySelector('.form-group');
    assert.equal(formGroup.textContent, '单据编号 ');
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
      {type: 'string', id: 'id', 'label': '主键', hidden: true},
      {type: 'string', id: 'danjubianhao', label: '单据编号'},
      {type: 'string', id: 'name2', label: '名称2', hidden: true},
      {type: 'string', id: 'name3', label: '名称3', hidden: true},
      {type: 'string', id: 'name4', label: '名称4', hidden: true}
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

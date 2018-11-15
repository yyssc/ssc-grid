import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';
import { getForm } from './helpers';

function getFieldsModel() {
  return [
    /*  0 */{type: 'string', id: 'id', label: '主键', hidden: true},
    /*  1 */{type: 'string', id: 'danjubianhao', label: '单据编号'},
    /*  2 */{type: 'string', id: 'name2', label: '名称2', hidden: true},
    /*  3 */{type: 'string', id: 'name3', label: '名称3', hidden: true},
    /*  4 */{type: 'string', id: 'name4', label: '名称4', hidden: true},
    /*  5 */{type: 'enum', id: 'danjuleixing', label: '单据类型', placeholder: '请选择单据类型',
               data: [
                 {key: '2631', value: '差旅费借款单'},
                 {key: '2632', value: '会议费借款单'},
                 {key: 'D3', value: '付款单'}
               ]
             },
    /*  6 */{type: 'string', id: 'danjuzhuangtai', label: '单据状态'},
    /*  7 */{type: 'double', id: 'jine', label: '金额'},
    /*  8 */{type: 'date', id: 'danjuriqi', label: '单据日期'},
    /*  9 */{type: 'boolean', id: 'qiyong', label: '启用'},
    /* 10 */{type: 'ref', id: 'zuzhi', label: '组织',
              referConfig: {
                referConditions: {
                  refCode: 'dept',
                  refType: 'tree',
                  rootName: '部门'
                },
                referDataUrl: 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'
              }
            },
    /* 11 */{type: 'ref', id: 'zhuguan', label: '主管',
              referConfig: {
                referConditions: {
                  refCode: 'dept',
                  refType: 'tree',
                  rootName: '部门'
                },
                referDataUrl: 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'
              }
            },
    /* 12 */{type: 'ref', id: 'shangjibumen', label: '上级部门',
              referConfig: {
                referConditions: {
                  refCode: 'dept',
                  refType: 'tree',
                  rootName: '部门'
                },
                referDataUrl: 'http://172.20.4.220/ficloud/refbase_ctr/queryRefJSON'
              }
            },
    /* 13 */{type: 'ref', id: 'shangjibumen2', label: '上级部门2' }
  ];
}

function getDefaultFormData() {
  return {
    id: '22EA0EB9-FABA-4224-B290-4D041A1DF773',
    danjubianhao: '123',
    name2: '名称2',
    name3: '名称3',
    name4: '名称4',
    danjuleixing: 'D3',
    danjuzhuangtai: '保存',
    jine: '12.00',
    danjuriqi: new Date('2017-02-14').toISOString(),
    qiyong: false,
    zuzhi: {
      id: '02EDD0F9-F384-43BF-9398-5E5781DAC5D0',
      code: '0502',
      name: '二车间',
    },
    zhuguan: null,
    shangjibumen: {
      id: '',
      code: '',
      name: ''
    },
    shangjibumen2: null
  };
}

describe('<Form>自定义布局', () => {

  /**
   * test all field type
   */

  it('应该正常显示，当fieldsModel有定义，但是defaultData为空的时候', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={{}}
        layout={{}}
      />
    );
    // 一个14个字段定义，4个隐藏，10个可显示字段，还有一个
    // form-group，这个form-group包含了“取消”和“保存”两个按钮
    assert.equal(getForm(instance).querySelectorAll('.form-group').length, 11);
  });

  it('uses "form" by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
        layout={{}}
      />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'FORM');
  });

  it('默认应该使用fluid样式', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[]}
        defaultData={{}}
        layout={{}}
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
          {type: 'string', id: 'name2', label: '名称2'},
          {type: 'string', id: 'name3', label: '名称3'},
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
          xs: 12,
          sm: 6,
          md: 6,
          lg: 3,
        }}
      />
    );
    let form = getForm(instance);
    assert.equal(form.querySelectorAll('.row').length, 2);
    assert.equal(form.querySelectorAll('.col-md-6').length, 3);
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
          xs: 12,
          sm: 6,
          md: 6,
          lg: 3,
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
          xs: 12,
          sm: 6,
          md: 6,
          lg: 3,
        }}
      />, node
    );
    fakeFieldsModel = [
      {type: 'string', id: 'id', 'label': '主键', hidden: true},
      {type: 'string', id: 'danjubianhao', label: '单据编号'},
      {type: 'string', id: 'name2', label: '名称2'},
      {type: 'string', id: 'name3', label: '名称3'},
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
          xs: 12,
          sm: 6,
          md: 6,
          lg: 3,
        }}
      />, node
    );
    let form = getForm(component);
    assert.equal(form.querySelectorAll('.row').length, 2);
    assert.equal(form.querySelectorAll('.col-md-6').length, 3);
  });

});

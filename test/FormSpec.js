import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';

function getFieldsModel() {
  return [
    /* 0 */{type: 'string', id: 'id', 'label': '主键', hidden: true},
    /* 1 */{type: 'string', id: 'danjubianhao', label: '单据编号'},
    /* 2 */{type: 'string', id: 'name2', label: '名称2', hidden: true},
    /* 3 */{type: 'string', id: 'name3', label: '名称3', hidden: true},
    /* 4 */{type: 'string', id: 'name4', label: '名称4', hidden: true},
    /* 5 */{type: 'enum', id: 'danjuleixing', label: '单据类型', placeholder: '请选择单据类型',
              data: [
                {key: '2631', value: '差旅费借款单'},
                {key: '2632', value: '会议费借款单'},
                {key: 'D3', value: '付款单'}
              ]
            },
    /* 6 */{type: 'string', id: 'danjuzhuangtai', label: '单据状态'},
    /* 7 */{type: 'double', id: 'jine', label: '金额'},
    /* 8 */{type: 'date', id: 'danjuriqi', label: '单据日期'},
    /* 9 */{type: 'boolean', id: 'qiyong', label: '启用'}
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
    qiyong: false
  };
}

describe('<Form>', () => {

  // helper function

  function getForm(instance) {
    return ReactDOM.findDOMNode(instance);
  }

  function getInput(instance, index) {
    const node = ReactDOM.findDOMNode(instance);
    return node.querySelectorAll('input')[index];
  }

  it('应该正常显示，当传入空数组和空对象的时候', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[]}
        defaultData={{}}
      />
    );
    assert.equal(getForm(instance).querySelectorAll('.form-group').length, 0);
  });

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

  it('应该按照fieldModel和defaultData正确显示出所有form元素，并且不显示隐藏元素', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
      />
    );

    // input的值应该和输入的默认值相同。
    assert.equal(getInput(instance, 0).value, getDefaultFormData().danjubianhao);
    assert.equal(getInput(instance, 2).value, getDefaultFormData().jine);
    // select（下拉框）的值应该和输入的默认值相同
    let form = getForm(instance);
    form.querySelectorAll('.form-group')[1].querySelectorAll('option').forEach(opt => {
      if (opt.value === 'D3') {
        assert.equal(opt.selected, true);
      }
    });
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

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';

function getFieldsModel() {
  return [
    /*  0 */{type: 'string', id: 'id', 'label': '主键', hidden: true},
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
                referDataUrl: 'http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON'
              }
            },
    /* 11 */{type: 'ref', id: 'zhuguan', label: '主管',
              referConfig: {
                referConditions: {
                  refCode: 'dept',
                  refType: 'tree',
                  rootName: '部门'
                },
                referDataUrl: 'http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON'
              }
            },
    /* 12 */{type: 'ref', id: 'shangjibumen', label: '上级部门',
              referConfig: {
                referConditions: {
                  refCode: 'dept',
                  refType: 'tree',
                  rootName: '部门'
                },
                referDataUrl: 'http://10.3.14.239/ficloud/refbase_ctr/queryRefJSON'
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

describe('<Form>', () => {

  // helper function

  function getForm(instance) {
    return ReactDOM.findDOMNode(instance);
  }

  function getInput(instance, index) {
    const node = ReactDOM.findDOMNode(instance);
    return node.querySelectorAll('input')[index];
  }

  function getSubmitButton(component) {
    let formNode = getForm(component);
    return formNode.querySelector('button[type=submit]');
  }

  it('应该正常显示，当传入空数组和空对象的时候', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[]}
        defaultData={{}}
      />
    );
    // 应该只有一个form-group，这个form-group包含了“取消”和“保存”两个按钮
    assert.equal(getForm(instance).querySelectorAll('.form-group').length, 1);
  });

  it('应该正常显示，当fieldsModel有定义，但是defaultData为空的时候', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={{}}
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
    // 默认的form是左右布局，左侧是label，右侧是input
    assert.equal(ReactDOM.findDOMNode(instance).className, 'admin-form form-horizontal');
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
    let formGroups = form.querySelectorAll('.form-group');
    if (!formGroups) {
      // console.log('formGroups not defined');
      return;
    }
    let formGroups1 = formGroups[1];
    if (!formGroups1) {
      // console.log('formGroups1 not defined');
      return;
    }
    let options = formGroups1.querySelectorAll('option');
    if (!options) {
      // console.log('options not defined');
      return;
    }
    // options.forEach(opt => {
    //   console.log('option', opt);
    //   if (opt.value === 'D3') {
    //     assert.equal(opt.selected, true);
    //   }
    // });

    // form.querySelectorAll('.form-group')[1].querySelectorAll('option').forEach(opt => {
    //   if (opt.value === 'D3') {
    //     assert.equal(opt.selected, true);
    //   }
    // });
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

  it('表单中必选项初始内容为空，验证初始状态应该是未知', () => {
    let text0;
    let text1;
    let component = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'name0', label: '名称0', validation: {type: 'required'}},
          {type: 'string', id: 'name1', label: '名称1', validation: {type: 'required'}}
        ]}
        defaultData={{name0: '', name1: ''}}
      />
    );
    // 提交按钮
    let submitButton = getSubmitButton(component);

    // 初始的时候，保存按钮状态不应该是disabled
    assert.strictEqual(submitButton.disabled, false);

    // 模拟鼠标点击提交按钮，提交按钮状态应该变成disabled
    ReactTestUtils.Simulate.click(submitButton);
    //assert.strictEqual(submitButton.disabled, true);

    // 初始验证状态应该是未知
    assert.strictEqual(component.state.fieldsValidationState.name0, null);
    assert.strictEqual(component.state.fieldsValidationState.name1, null);

    // 在表单中第一个文本框中输入内容，第一个文本框应该验证成功
    text0 = getInput(component, 0);
    text0.value = 'test';
    ReactTestUtils.Simulate.change(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, true);
    assert.strictEqual(component.state.fieldsValidationState.name1, null);

    // 在表单中第二个文本框中输入内容，第二个文本框应该验证成功
    text1 = getInput(component, 1);
    text1.value = 'test';
    ReactTestUtils.Simulate.change(text1);
    assert.strictEqual(component.state.fieldsValidationState.name0, true);
    assert.strictEqual(component.state.fieldsValidationState.name1, true);

    // 清空表单中第一个文本框中的内容，第一个文本框应该验证失败
    text0 = getInput(component, 0);
    text0.value = '';
    ReactTestUtils.Simulate.change(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, false);
    assert.strictEqual(component.state.fieldsValidationState.name1, true);
  });

  it('表单中必填项初始有内容，后被清空，应该验证失败', () => {
    let text0;
    let text1;
    let component = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'string', id: 'name0', label: '名称0', validation: {type: 'required'}},
          {type: 'string', id: 'name1', label: '名称1', validation: {type: 'required'}}
        ]}
        defaultData={{name0: 'test0', name1: 'test1'}}
      />
    );

    // 初始验证状态应该是验证状态未知
    assert.strictEqual(component.state.fieldsValidationState.name0, null);
    assert.strictEqual(component.state.fieldsValidationState.name1, null);

    // 清空表单中第一个文本框中的内容，第一个文本框应该验证失败
    text0 = getInput(component, 0);
    text0.value = '';
    ReactTestUtils.Simulate.change(text0);
    assert.strictEqual(component.state.fieldsValidationState.name0, false);
    assert.strictEqual(component.state.fieldsValidationState.name1, null);
  });

});

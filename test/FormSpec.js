import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Form from '../src/Form';
import { getForm, getInput, getResetButton, getSubmitButton } from './helpers';

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

describe('<Form>', () => {

  // helper function

  /**
   * 只运行一个测试
   * it.only('', () => {});
   */

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

    let form = getForm(instance);
    let options = form.querySelectorAll('.form-group')[1].querySelectorAll('option');
    for (let i = 0; i < options.length; ++i) {
      let item = options[i];  // Calling myNodeList.item(i) isn't necessary in JavaScript
      if (item.value === 'D3') {
        assert.equal(item.selected, true);
      }
    }
  });

  it('应该将下拉菜单正确设置为输入的默认值', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={[
          {type: 'enum', id: 'danjuleixing', label: '单据类型',
            data: [
              {key: '2631', value: '差旅费借款单'},
              {key: '2632', value: '会议费借款单'},
              {key: 'D3', value: '付款单'}
            ]
          }
        ]}
        defaultData={{
          danjuleixing: 'D3'
        }}
      />
    );
    assert.equal(component.state.formData.danjuleixing, 'D3');

    // select（下拉框）的值应该和输入的默认值相同
    let form = getForm(component);
    let formGroups = form.querySelectorAll('.form-group');
    let options = formGroups[0].querySelectorAll('option');
    for (let i = 0; i < options.length; ++i) {
      let item = options[i];  // Calling myNodeList.item(i) isn't necessary in JavaScript
      if (item.value === 'D3') {
        assert.equal(item.selected, true);
      } else {
        assert.equal(item.selected, false);
      }
    }
    // printType(options);
    // printChromeVersion();
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

  it('通过props更新表单中的数据，应该重新渲染为新数据', () => {
    let node = document.createElement('div');
    let mockColumnsModel;
    let mockDefaultData;
    let component;

    mockColumnsModel = [
      {type: 'string', id: 'name', label: '名称'},
      {type: 'string', id: 'code', label: '编码'}
    ];
    mockDefaultData = { id: '0', name: 'n1', code: 'c1' };
    component = ReactDOM.render(
      <Form
        fieldsModel={mockColumnsModel}
        defaultData={mockDefaultData}
      />, node
    );
    assert.equal(component.state.formData.name, 'n1');
    assert.equal(component.state.formData.code, 'c1');
    assert.equal(component.state.formData.n2ame, undefined);
    assert.equal(component.state.formData.c2ode, undefined);
    assert.equal(getInput(component, 0).value, 'n1');
    assert.equal(getInput(component, 1).value, 'c1');

    // 修改数据，重新渲染
    mockColumnsModel = [
      {type: 'string', id: 'n2ame', label: '名2称'},
      {type: 'string', id: 'c2ode', label: '编2码'}
    ];
    mockDefaultData = { id: '0', n2ame: 'n2n', c2ode: 'c2c' };
    component = ReactDOM.render(
      <Form
        fieldsModel={mockColumnsModel}
        defaultData={mockDefaultData}
      />, node
    );
    assert.equal(component.state.formData.name, undefined);
    assert.equal(component.state.formData.code, undefined);
    assert.equal(component.state.formData.n2ame, 'n2n');
    assert.equal(component.state.formData.c2ode, 'c2c');
    assert.equal(getInput(component, 0).value, 'n2n');
    assert.equal(getInput(component, 1).value, 'c2c');
  });

  it('隐藏提交按钮', () => {
    let mockColumnsModel;
    let mockDefaultData;

    mockColumnsModel = [
      {type: 'string', id: 'name', label: '名称'},
      {type: 'string', id: 'code', label: '编码'}
    ];
    mockDefaultData = { id: '0', name: 'n1', code: 'c1' };
    const component = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={mockColumnsModel}
        defaultData={mockDefaultData}
        showSubmitButton={false}
      />
    );
    const component2 = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={mockColumnsModel}
        defaultData={mockDefaultData}
      />
    );
    const component3 = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={mockColumnsModel}
        defaultData={mockDefaultData}
        layout={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
        }}
        showSubmitButton={false}
      />
    );
    const component4 = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={mockColumnsModel}
        defaultData={mockDefaultData}
        layout={{
          xs: 12,
          sm: 6,
          md: 4,
          lg: 3,
        }}
      />
    );
    assert.equal(getForm(component).querySelectorAll('button').length, 0);
    assert.equal(getForm(component2).querySelectorAll('button').length, 2);
    assert.equal(getForm(component3).querySelectorAll('button').length, 0);
    assert.equal(getForm(component4).querySelectorAll('button').length, 2);
  });

  it('call submit() from ref', () => {
    let formRef = null;
    let instance = ReactTestUtils.renderIntoDocument(
      <Form
        ref={(c) => { formRef = c; }}
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
      />
    );
    formRef.submit();

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'FORM');
  });

  it('call getFieldModelById() from ref', () => {
    let formRef = null;
    ReactTestUtils.renderIntoDocument(
      <Form
        ref={(c) => { formRef = c; }}
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
      />
    );
    const fieldModel = formRef.getFieldModelById('id');

    assert.equal(fieldModel.hidden, true);
  });

  it('onChange', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
        onChange={() => {}}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'FORM');
  });

  it('click on reset button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
      />
    );
    const buttonNode = getResetButton(instance);
    ReactTestUtils.Simulate.click(buttonNode);
  });

  it('click on submit button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Form
        fieldsModel={getFieldsModel()}
        defaultData={getDefaultFormData()}
      />
    );
    const buttonNode = getSubmitButton(instance);
    ReactTestUtils.Simulate.click(buttonNode);
  });

});

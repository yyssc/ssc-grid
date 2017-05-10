import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Form from '../src/Form';
import { getForm, getInput } from './helpers';

describe('<Form>', () => {

  it('隐藏字段不应该渲染到DOM中，应该维护在state中', () => {
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
      />
    );

    // 渲染到DOM中的输入框应该只有一个
    assert.equal(getInput(instance, 0).value, '123');
    let form = getForm(instance);
    assert.equal(form.querySelectorAll('input').length, 1);
    // 但是Form组件的状态中应该维护所有隐藏字段的值
    assert.equal(instance.state.formData.id, '22EA0EB9-FABA-4224-B290-4D041A1DF773');
    assert.equal(instance.state.formData.danjubianhao, '123');
    assert.equal(instance.state.formData.name2, '名称2');
    assert.equal(instance.state.formData.name3, '名称3');
    assert.equal(instance.state.formData.name4, '名称4');

  });

});

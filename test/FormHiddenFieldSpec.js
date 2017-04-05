import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import Form from '../src/Form';
import { getInput } from './helpers';

describe('<Form>', () => {

  it('应该正确渲染type=hidden的字段', () => {
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
      />
    );

    // input的值应该和输入的默认值相同。
    assert.equal(getInput(instance, 0).value, '22EA0EB9-FABA-4224-B290-4D041A1DF773');
    assert.equal(getInput(instance, 0).type, 'hidden');
    assert.equal(getInput(instance, 1).value, '123');
    assert.notEqual(getInput(instance, 1).type, 'hidden');
    assert.equal(getInput(instance, 2).type, 'hidden');
    assert.equal(getInput(instance, 2).value, '名称2');
    assert.equal(getInput(instance, 3).type, 'hidden');
    assert.equal(getInput(instance, 3).value, '名称3');
    assert.equal(getInput(instance, 4).type, 'hidden');
    assert.equal(getInput(instance, 4).value, '名称4');

  });

});

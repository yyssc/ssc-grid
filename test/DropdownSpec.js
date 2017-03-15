import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Dropdown from '../src/Dropdown';

describe('<Dropdown>', () => {

  // helper function

  it('应该正常显示两个菜单项', () => {
    let data = [
      {id: 'zh_CN', name: '简体中文'},
      {id: 'en_US', name: '英文美国'}
    ];
    let component = ReactTestUtils.renderIntoDocument(
      <Dropdown
        dropdownId="dropdown-example"
        defaultTitle="请选择"
        data={data}
      />
    );
    let node = ReactDOM.findDOMNode(component);
    assert.equal(node.querySelectorAll('li').length, 2);
  });

});

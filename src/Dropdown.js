import React, { Component, PropTypes } from 'react';

import { DropdownButton, MenuItem } from 'react-bootstrap';

// YBZSAAS-461
// IE11不支持Array.prototype.find()
import 'core-js/fn/array/find';

/** 下拉菜单组件 */
export default class Dropdown extends Component {
  static propTypes = {
    dropdownId: PropTypes.string.isRequired,
    defaultTitle: PropTypes.string.isRequired,
    /**
     * 填充下拉菜单的数据
     * ```json
     * [
     *   {id: 'zh_CN', name: '简体中文'},
     *   {id: 'en_US', name: '英文美国'}
     * ]
     * ```
     */
    data: PropTypes.array.isRequired,
    /**
     * 当从下拉菜单选择一项的时候
     * @param {Object} selectedItem 被选中项{id: 'zh_CN', name: '简体中文'}
     * @param {Object} event
     */
    onSelect: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      dropdownTitle: this.props.defaultTitle
    };
  }

  componentWillMount() {
  }

  // 下拉菜单点击事件
  handleSelect(selectedItemId, event) {
    const { data } = this.props;
    let foundItem = data.find(item => item.id === selectedItemId);
    if (foundItem) {
      this.setState({
        dropdownTitle: foundItem.name
      });
    }
    if (this.props.onSelect) {
      this.props.onSelect(foundItem, event);
    }
  }

  render() {
    const { dropdownId, data } = this.props;

    return (
      <DropdownButton
        id={dropdownId}
        bsStyle="default"
        title={this.state.dropdownTitle}
        onSelect={this.handleSelect.bind(this)}
      >
        {
          data.map((item, index) => (
            <MenuItem
              key={'index-' + index + '-' + item.id}
              eventKey={item.id}
            >
              {item.name}
            </MenuItem>
          ))
        }
      </DropdownButton>
    );
  }
}

// import 'rc-tree-select/assets/index.less';
import TreeSelect from 'rc-tree-select';
import React, { Component, PropTypes } from 'react';

/**
 * Refer组件
 */

class Refer extends Component {
  static propTypes = {
    treeData: PropTypes.array.isRequired,
    inputValue: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired
  };

  static defaultProps = {
    inputValue: '0-0-0-label',
    value: '0-0-0-value1'

  };

  constructor(props) {
    super(props);
  }

  onSearch(/* value */) {
    // console.log(value, arguments);
  }

  onSelect() {
    // use onChange instead
    // console.log(arguments);
  }

  render() {
    const { treeData, inputValue, value } = this.props;
    return (
        <TreeSelect
          style={{ width: 300 }}
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
          placeholder={<i>请下拉选择</i>}
          searchPlaceholder="please search"
          showSearch allowClear treeLine
          inputValue={inputValue}
          value={value}
          treeData={treeData}
          treeNodeFilterProp="label"
          filterTreeNode={false}
          onSearch={this.onSearch}
          onDropdownVisibleChange={(v, info) => {
            // console.log('single onDropdownVisibleChange', v, info);
            // document clicked
            if (info.documentClickClose && this.state.value === '0-0-0-0-value') {
              return false;
            }
            return true;
          } }
          onSelect={this.onSelect}
        />
    );
  }
}

export default Refer;

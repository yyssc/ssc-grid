// import '../node_modules/rc-tree-select/assets/index.css';
import TreeSelect from 'rc-tree-select';
import React, { Component, PropTypes } from 'react';

/**
 * Refer组件
 */

class Refer extends Component {
  static propTypes = {
    tsOpen: PropTypes.bool,
    visible: PropTypes.bool,
    inputValue: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired
  };

  static defaultProps = {
    tsOpen: false,
    visible: false,
    inputValue: '0-0-0-label',
    value: '0-0-0-value1'
  };

  constructor(props) {
    super(props);
  }

  onSearch(/* value */) {
    // console.log(value, arguments);
  }

  onChange(value) {
    // console.log('onChange', arguments);
    this.setState({ value });
  }


  render() {
    // const {  } = this.props;
    return (
        <TreeSelect
          style={{ width: 300 }}
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
          placeholder={<i>请下拉选择</i>}
          searchPlaceholder="please search"
          showSearch allowClear treeLine
          inputValue={this.state.inputValue}
          value={this.state.value}
          treeData={{}}
          treeNodeFilterProp="label"
          filterTreeNode={false}
          onSearch={this.onSearch}
          open={this.state.tsOpen}
          onChange={(value) => {
            // console.log('onChange', arguments);
            if (value === '0-0-0-0-value') {
              this.setState({ tsOpen: true });
            } else {
              this.setState({ tsOpen: false });
            }
            this.setState({ value });
          } }
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

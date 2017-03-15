import React, { Component, PropTypes } from 'react';

// 将rc-tree封装起来
import * as RcTree from 'rc-tree';

/**
 * Tree控件
 */
export default class Tree extends Component {
  static defaultProps = {
  }

  static propTypes = {
    /**
     * 生成树所需要的JSON数据
     * ```
     * [
     *   {
     *     "title": "0-0-label",
     *     "key": "0-0-key",
     *     "children": [
     *       {
     *         "title": "0-0-0-label",
     *         "key": "0-0-0-key"
     *       }
     *     ]
     *   }
     * ]
     * ```
     */
    treeData: PropTypes.array.isRequired
  };

  state = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { treeData, ...rcTreeProps } = this.props;

    const loop = data => {
      return data.map((item) => {
        if (item.children) {
          return (
            <RcTree.TreeNode
              key={item.key} title={item.title}
              disableCheckbox={item.key === '0-0-0-key'}
            >
              {loop(item.children)}
            </RcTree.TreeNode>
          );
        }
        return <RcTree.TreeNode key={item.key} title={item.title} />;
      });
    };

    return (
      <RcTree.default
        {...rcTreeProps}
      >
        {loop(treeData)}
      </RcTree.default>
    );
  }
}

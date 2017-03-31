import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import elementType from 'react-prop-types/lib/elementType';

import { Table, Pagination } from 'react-bootstrap';

import GridRow from './GridRow';
import TextField from './TextField';

import { searchFor } from './utils/sscgridUtils';
import * as actions from './Grid.actions';

/**
 * Grid组件
 *
 * Options: https://datatables.net/reference/option/
 *
 * http://adazzle.github.io/react-data-grid
 *
 */

class Grid extends Component {

  static propTypes = {
    /**
     * 表格填充数据
     * `type: boolean`，数据类型是
     * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Boolean_literals">boolean literal</a>或者是
     * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Data_types">Boolean类型</a>
     * （注意和<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean">Boolean全局对象</a>区分）
     * `type: ref`，参照的值比较特殊，是一个object:
     * ```
     * pk_org: {
     *   id: '22EA0EB9-FABA-4224-B290-5D041A1DF773',
     *   code: '0403',
     *   name: '委外部'
     * }
     * ```
     */
    tableData: PropTypes.array.isRequired,
    /**
     * 表格模型，表头每一列的名称和类型，比如：
     * ```js
     * {
     *   id: 'code',
     *   type: 'string',
     *   label: '编码'
     * }
     * ```
     * 隐藏列
     * ```js
     * {
     *   hidden: true
     * }
     * ```
     * 自定义格式化
     * ```js
     * formatter: {
     *   type: 'custom',
     *   callback: value => `前缀_${value}_后缀`
     * }
     * ```
     */
    columnsModel: PropTypes.array.isRequired,
    /**
     * 分页
     */
    onPagination: PropTypes.func,
    /**
     * 是否启用行选择，复选框/单选框
     * 默认为`null`，不显示
     * ```json
     * {
     *   mode: 'checkbox',
     *   onSelect: (rowIdx, rowObj, isSelected, event) => {},
     *   onSelectAll: (tableData, isSelected, event) => {}
     * }
     * ```
     * `mode`，`checkbox`复选，`radio`单选
     * `onSelect()`，当选择单行的时候触发，参数：
     * - `@param {Number} rowIdx` 行index
     * - `@param {Object} rowObj` 行数据
     * - `@param {boolean} isSelected` 复选框/单选框选中状态true/false
     * - `@param {Event} event` Event对象
     * - `@param {Object} selectedRowsObj` 当前被选中的行，比如：
     *   ```js
     *   {
     *     0: {selected: true}, // 第一行被选中
     *     1: {selected: false} // 第二行未被选中
     *   }
     *   ```
     * `onSelectAll()`，当选择所有行的时候触发，参数：
     * - `@param {Object} tableData` 所有行的数据
     * - `@param {boolean} isSelected` 复选框/单选框选中状态true/false
     * - `@param {Event} event` Event对象
     * - `@param {Object} selectedRowsObj` 当前被选中的行，比如：
     *   ```js
     *   {
     *     0: {selected: true}, // 第一行被选中
     *     1: {selected: false} // 第二行未被选中
     *   }
     *   ```
     */
    selectRow: PropTypes.object,

    /**
     * 每一行是否显示操作按钮列
     * 默认的操作按钮在最右侧的列中，如果需要指定在左侧，可以通过
     * `align`参数来设置
     * ```
     * {
     *   align: 'left'
     * }
     * ```
     * 注意：当操作列和选择列同时存在的时候，选择列会显示在操作列的左侧
     */
    operationColumn: PropTypes.object,
    /**
     * 自定义的操作列组件
     * 除非指定了`operationColumn`参数，否则操作列不会显示出来
     */
    operationColumnClass: elementType,

    /**
     * 选择一个单元格
     */
    onCellChecked: PropTypes.func,
    /**
     * 是否显示分页
     */
    paging: PropTypes.bool,
    /**
     * 页面数量
     */
    totalPage: PropTypes.number,
    /**
     * 当前页面号
     */
    activePage: PropTypes.number,
    /**
     * 是否显示搜索框
     */
    localSearch: PropTypes.bool,
    /**
     * 当搜索框内容改变的时候
     */
    onSearchChange: PropTypes.func,
    /**
     * 直接映射ReactBootstrap的属性
     * http://getbootstrap.com/css/#tables-striped
     */
    striped: PropTypes.bool,
    /**
     * 直接映射ReactBootstrap的属性
     * http://getbootstrap.com/css/#tables-bordered
     */
    bordered: PropTypes.bool,
    /**
     * 直接映射ReactBootstrap的属性
     * http://getbootstrap.com/css/#tables-condensed
     */
    condensed: PropTypes.bool,
    /**
     * 直接映射ReactBootstrap的属性
     * http://getbootstrap.com/css/#tables-hover-rows
     */
    hover: PropTypes.bool,
    /**
     * 行双击事件
     * @param {Event} event
     * @param {Object} rowObj 行数据对象
     */
    onRowDoubleClick: PropTypes.func
  };

  static defaultProps = {
    selectRow: null,
    operationColumn: null, // 默认不显示操作列
    operationColumnClass: 'td', // 默认的操作列必须是<td>组件
    paging: false,
    /**
     * 直接映射ReactBootstrap的属性
     */
    striped: false,
    bordered: false,
    condensed: false,
    hover: false
  };

  constructor(props) {
    super(props);
    this.state = {
      /**
       * 存储所有行被选中的状态，通过key:value
       * 其中key就是row index，从0开始
       * 注意主结构为Object而不是Array
       * {
       *   0: { selected: true  }, 第一行被选中
       *   1: { selected: false }  第二行未被选中
       * }
       */
      selectedRowsObj: {},
      /**
       * 表头行（全选）被选中状态
       */
      isHeadRowSelected: false
    };

    /**
     * 初始化表体数据
     * props.tableData 用户传入的表体数据
     * state.viewedTableData 显示在UI上的表体数据
     * 因为Grid组件提供了本地搜索功能，所以props.tableData和state.viewedTableData
     * 可能是不一样的
     */
    this.state.viewedTableData = this.props.tableData;

    // 初始化的时候所有行都未被选中
    this.props.tableData.forEach((item, index) => {
      this.state.selectedRowsObj[index] = {
        selected: false
      };
    });

    // TODO 使用flags和bitmasks来存储行被选中的状态，可以降低操作状态的难度
    // 初始化0，相当于00000（对于5行来说）
    this.state.selectedFlags = 0;
  }

  componentWillReceiveProps(nextProps) {
    // 更新表格体数据
    this.setState({
      viewedTableData: nextProps.tableData
    });
    // 如果表格数据发生了变化，则清空行选中的状态
    // console.log('===', nextProps.tableData === this.state.viewedTableData);
    // console.log('==', nextProps.tableData == this.state.viewedTableData);
    if (nextProps.tableData !== this.state.viewedTableData) {
      this.setState(
        actions.updateAllRowsSelectedState(false)
      );
    }
  }

  handlePagination(eventKey) {
    if (this.props.onPagination) {
      this.props.onPagination(eventKey);
    }
  }

  // 选中一行
  // 1. 改变当前行被选中的状态
  // 2. (可能)改变表头行（全选）状态
  handleSelect(rowIdx, rowObj, isSelected, event) {
    const { selectRow } = this.props;
    const { selectedRowsObj } = this.state;
    selectedRowsObj[rowIdx] = {
      selected: isSelected
    };
    this.setState({
      selectedRowsObj
    });

    /**
     * 检查当前状态中是否所有行都被选中
     * @return {boolean} 如果是true说明所有行都被选中，否则有一行或者多行未被选中。
     */
    function isAllRowsSelected(obj) {
      let ret = true;
      let i;
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret = ret && obj[i].selected;
        }
      }
      return ret;
    }

    this.setState(
      actions.updateTableHeadRowSelectedState(
        isAllRowsSelected(selectedRowsObj)
      )
    );


    if (selectRow && selectRow.onSelect) {
      selectRow.onSelect(rowIdx, rowObj, isSelected, event, selectedRowsObj);
    }
  }

  // 当选中所有行的时候
  // 1. 同时改变所有行的选中状态
  // 2. 改变表头行（全选）状态
  handleSelectAll(event) {
    const { selectRow } = this.props;
    const isSelected = event.target.checked;

    // 在状态中选中所有行
    this.setState(
      actions.updateAllRowsSelectedState(isSelected)
    );

    // 在状态中选中table head row
    this.setState(
      actions.updateTableHeadRowSelectedState(isSelected)
    );

    if (selectRow && selectRow.onSelectAll) {
      let selectedRowsObj = {};

      this.state.viewedTableData.forEach((item, index) => {
        selectedRowsObj[index] = {};
        selectedRowsObj[index].selected = isSelected;
      });
      selectRow.onSelectAll(this.state.viewedTableData, isSelected, event,
        selectedRowsObj);
    }
  }

  handleCellChecked(rowIdx, colIdx) {
    if (this.props.onCellChecked) {
      this.props.onCellChecked(rowIdx, colIdx);
    }
  }

  // 搜索文本框内容改变之后，进行重新搜索
  handleSearchChange(event) {
    const searchText = event.target.value;
    this.setState({
      viewedTableData: searchFor(searchText, this.props.tableData)
    });
  }

  handleRowDoubleClick(event) {
    if (this.props.onRowDoubleClick) {
      this.props.onRowDoubleClick(event);
    }
  }

  render() {
    const { columnsModel,
      selectRow, operationColumn, className,
      operationColumnClass: CustomComponent
    } = this.props;

    // 直接映射react-bootstrap的属性
    const { striped, bordered, condensed, hover } = this.props;
    const reactBootstrapProps = { striped, bordered, condensed, hover };

    const { selectedRowsObj } = this.state;

    // 列模型不能为空，但是表体数据可以为空。
    // 当全部为空，只显示一个空div
    // 当只有表体数据为空，只显示表头
    if (!columnsModel || columnsModel.length === 0) {
      return (<div></div>);
    }

    const renderTableHeader = () => (
      columnsModel.map((col, key) => {
        let alignClass = '';
        // 一般数值型都是金额，所以默认右对齐
        // 但是会被column model中的align属性覆盖
        if (col.type === 'double') {
          alignClass = 'text-right';
        }
        // 使用Bootstrap的alignment class来进行对齐
        if (col.align) {
          alignClass = `text-${col.align}`;
        }
        // 之前的className只能设定th的class，现在改成使用columnClassName
        // 可以设定th和td的class
        // 由于新旧接口共存，所以需要根据优先级设定好
        const th = (
          <th key={key}
            className={classNames(alignClass, col.columnClassName, col.className)}
          >{col.label}</th>
        );
        return col.hidden === true ? null : th;
      })
    );

    const renderCheckboxHeader = () => (
      selectRow ? (<th>
        <input type="checkbox" checked={this.state.isHeadRowSelected}
          onChange={this.handleSelectAll.bind(this)} />
      </th>) : null
    );

    const pagination = (
      <Pagination className="pagination"
        prev
        next
        first
        last
        ellipsis
        items={this.props.totalPage}
        maxButtons={10}
        activePage={this.props.activePage}
        onSelect={this.handlePagination.bind(this)}
      />
    );

    const self = this;

    // var onRow = this.props.onRow;
    return (
      <div className={classNames(className)}>
        {this.props.localSearch ? <TextField
          onChange={this.handleSearchChange.bind(this)}
        /> : null}
        <Table {...reactBootstrapProps}>
          <thead>
            <tr>
              { renderCheckboxHeader() }
              { renderTableHeader() }
              { operationColumn ? <th>操作</th> : null }
            </tr>
          </thead>
          <tbody>
          {
            this.state.viewedTableData.map((row, rowIdx) => {
              let selected = false;

              // 该行是否被选中
              if (selectedRowsObj[rowIdx] && selectedRowsObj[rowIdx].selected) {
                selected = true;
              }

              return (<GridRow
                selectRow={selectRow}
                selectionMode={selectRow ? selectRow.mode : null}
                onSelect={selectRow ? self.handleSelect.bind(self) : null}
                selected={selected}
                operationColumn={operationColumn}
                operationColumnClass={CustomComponent}
                rowObj={row} key={rowIdx}
                columnsModel={columnsModel} rowIdx={rowIdx}
                onCellChecked={self.handleCellChecked.bind(self)}
                onRowDoubleClick={this.props.onRowDoubleClick}
              />);
            })
          }
          </tbody>
        </Table>
        {this.props.paging ? pagination : null}
      </div>
    );
  }
}

export default Grid;

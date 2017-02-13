import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Table, Pagination, Checkbox } from 'react-bootstrap';

import GridRow from './GridRow';

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
     */
    tableData: PropTypes.array.isRequired,
    /**
     * 表头每一列的名称
     */
    cols: PropTypes.array.isRequired,
    /**
     * 分页
     */
    onPagination: PropTypes.func,
    /**
     * 选择
     */
    onSelectOne: PropTypes.func,
    /**
     * 删除
     */
    onRemove: PropTypes.func,
    /**
     * 编辑
     */
    onEdit: PropTypes.func,
    /**
     * 是否在表格的最左边一列显示复选框
     */
    checkboxColumn: PropTypes.bool,
    /**
     * 是否在表格的最右边一列显示操作按钮
     */
    operateColumn: PropTypes.bool,
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
    activePage: PropTypes.number
  };

  static defaultProps = {
    checkboxColumn: false,
    operateColumn: false,
    paging: false
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedRows: {}
    };
  }

  handlePagination(eventKey) {
    if (this.props.onPagination) {
      this.props.onPagination(eventKey);
    }
  }

  handleSelectAll() {
  }

  handleSelectOne(rowIdx, checked) {
    if (this.props.onSelectOne) {
      this.props.onSelectOne(rowIdx, checked);
    }
  }

  handleEdit(rowIdx, rowData, event) {
    if (this.props.onEdit) {
      this.props.onEdit(rowIdx, rowData, event);
    }
  }

  handleRemove(rowIdx, rowData, event) {
    if (this.props.onRemove) {
      this.props.onRemove(rowIdx, rowData, event);
    }
  }

  handleCellChecked(rowIdx, colIdx) {
    if (this.props.onCellChecked) {
      this.props.onCellChecked(rowIdx, colIdx);
    }
  }

  render() {
    const { cols, tableData,
      checkboxColumn, operateColumn, className
    } = this.props;

    // 表格数据非空判断
    if (!tableData || tableData.length === 0) {
      return (<div></div>);
    }

    const renderTableHeader = () => (
      cols.map((col, key) => (
        <th key={key}>{col.label}</th>
      ))
    );

    const renderCheckboxHeader = () => (
      checkboxColumn ? <th><Checkbox onChange={this.handleSelectAll.bind(this)} /></th> : null
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
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              { renderCheckboxHeader() }
              { renderTableHeader() }
              { operateColumn ? <th>操作</th> : null }
            </tr>
          </thead>
          <tbody>
          {
            tableData.map((row, rowIdx) => {
              return (<GridRow
                checkboxColumn={checkboxColumn}
                operateColumn={operateColumn}
                row={row} key={rowIdx}
                cols={cols} rowIdx={rowIdx}
                onRowSelection={self.handleSelectOne.bind(self)}
                onEdit={self.handleEdit.bind(self)}
                onRemove={self.handleRemove.bind(self)}
                onCellChecked={self.handleCellChecked.bind(self)}
              >{this.props.children}
              </GridRow>);
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

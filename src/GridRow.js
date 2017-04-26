/* eslint-disable no-unused-vars */
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';
import elementType from 'react-prop-types/lib/elementType';
// import { Button } from 'react-bootstrap';

// 使用moment对单元格中的日期进行格式化
import moment from 'moment';
import 'moment/locale/zh-cn';

// 使用numeral对单元格中的数字进行格式化
import numeral from 'numeral';

// YBZSAAS-461
// IE11不支持Array.prototype.find()
import 'core-js/fn/array/find';

// load a locale
numeral.register('locale', 'chs', {
  delimiters: {
    thousands: ',',
    decimal: '.'
  },
  abbreviations: {
    thousand: '千',
    million: '百万',
    billion: '十亿',
    trillion: '兆'
  },
  ordinal: (/* number */) => {
    return '.';
  },
  currency: {
    symbol: '¥'
  }
});
// switch between locales
numeral.locale('chs');

/**
 * GridRow组件
 */

class GridRow extends Component {
  static propTypes = {
    /**
     * 用于指定列模型，比如每个字段的类型是什么，字段类型决定了单元格的样式。
     */
    columnsModel: PropTypes.array.isRequired,
    /**
     * 本行中每一列的数据
     * <pre><code>{
     *   id: '11',
     *   danjuleixing: '123'
     * }</code></pre>
     */
    rowObj: PropTypes.object.isRequired,
    /**
     * 表格中本行的index，从0开始，等同于key
     */
    rowIdx: PropTypes.number.isRequired,
    /**
     * 显示行选择复选框/单选框<br>
     * mode 默认是checkbox，也可以是radio
     * onSelect 当点击行最左侧的复选框/单选框的时候
     */
    selectRow: PropTypes.object,
    selectionMode: PropTypes.string,
    onSelect: PropTypes.func,
    /**
     * 该行是否被选择（单选框/复选框）
     * 默认未被选中
     * TODO 需要和selectRow属性合并
     */
    selected: PropTypes.bool,
    /**
     * 每一行是否显示操作按钮列<br>
     * 默认的操作按钮在最右侧的列中，如果需要指定在左侧，可以通过
     * <code>align</code>参数来设置<br>
     * <pre><code>{
     *   align: 'left'
     * }</code></pre>
     * 注意：当操作列和选择列同时存在的时候，选择列会显示在操作列的左侧
     */
    operationColumn: PropTypes.object,
    /**
     * 自定义的操作列组件<br>
     * 除非指定了<code>operationColumn</code>参数，否则操作列不会显示出来
     */
    operationColumnClass: elementType,
    /**
     * 行双击事件
     */
    onRowDoubleClick: PropTypes.func
  };

  static defaultProps = {
    selectable: true,
    selectRow: null,
    selectionMode: 'checkbox',
    selected: false,
    operationColumn: null
  };

  constructor(props) {
    super(props);
  }

  handleCheckboxChange(event) {
    const { onSelect } = this.props;
    const isSelected = event.target.checked;
    if (this.props.onSelect) {
      this.props.onSelect(isSelected, event);
    }
  }

  handleRowDoubleClick(rowObj, event) {
    if (this.props.onRowDoubleClick) {
      this.props.onRowDoubleClick(event, rowObj);
    }
  }

  /**
   * 日期类型格式化
   * @param {Object} columnModel
   *   columnModel.formatter:
   *     - undefined - 不进行格式化
   *     - {} - 进行格式化，使用默认格式化模板
   *     - { format: 'yy/mm/dd' } - 按照指定的模板进行格式化
   * @param {String} value 必须是非空的字符串
   */
  getDateFormat(columnModel, value) {
    let dateFormat = null;
    let cellContent = '';
    if (columnModel.formatter) {
      dateFormat = columnModel.formatter.format || 'YYYY-MM-DD';
      cellContent = moment(value).format(dateFormat);
    } else {
      cellContent = value;
    }
    return cellContent;
  }

  /**
   * 数字类型格式化
   * columnModel.formatter:
   * undefined - 不进行格式化
   * {} - 进行格式化，使用默认格式化模板
   * { format: '$0,0.00' } - 按照指定的模板进行格式化
   */
  getNumberFormat(columnModel, value) {
    let numFormat = null;
    let cellContent = '';
    if (columnModel.formatter) {
      numFormat = columnModel.formatter.format || '0,0.00';
      cellContent = numeral(value).format(numFormat);
    } else {
      cellContent = value;
    }
    return cellContent;
  }

  renderCells = () => {
    const { rowIdx, rowObj, columnsModel } = this.props;
    return columnsModel.map((columnModel, colIdx) => {
      let className = '';
      let cellContent = '';

      // value的可能不是string，比如参照类型，value的类型是object
      let value = rowObj[columnModel.id];

      // 如果用户提供了自定义格式化方式，首选指定方法
      if (columnModel.formatter && columnModel.formatter.type === 'custom') {
        cellContent = columnModel.formatter.callback(value);
      } else {
        // 根据不同类型，渲染成不同值
        switch (columnModel.type) {
          default:
          case 'string': // 0
            if (value === null || value === undefined) {
              cellContent = '';
            } else {
              cellContent = value;
            }
            break;
          case 'double': // 2 之前的金额类型
            className = 'text-right';
            if (value === null || value === undefined) {
              cellContent = '';
            } else {
              cellContent = this.getNumberFormat(columnModel, value);
            }
            break;
          case 'date': // 3
            // 传入的数据为空的时候，UI上直接显示空字符串就行
            if (value === '' || value === null || value === undefined) {
              cellContent = '';
            } else {
              cellContent = this.getDateFormat(columnModel, value);
            }
            break;
          case 'boolean': // 4
            if (value === null || value === undefined) {
              cellContent = '';
            } else {
              cellContent = value;
            }
            break;
          case 'ref': // 5
            cellContent = value && value.name ? value.name : '';
            break;
          case 'enum': // 6
            if (columnModel.data) {
              let foundEnumItem = columnModel.data.find(enumItem => (enumItem.key === value));
              if (typeof foundEnumItem !== 'undefined') {
                cellContent = foundEnumItem.value;
              }
            }
            break;
        }
      }

      // 如果用户提供的数据有问题，比如columnModel.type是string，但是value却是
      // 一个Object，那么这里只能强制类型转换了。
      // TODO 需要给用户提示数据错误问题。
      cellContent = String(cellContent);

      // 用户自定义对齐方式
      if (columnModel.align) {
        className = `text-${columnModel.align}`;
      }

      // 添加列类名
      className = classNames(className, columnModel.columnClassName);

      let tdInner = cellContent;
      // 该列是否有悬浮按钮
      if (columnModel.floatOperationComponent) {
        tdInner = (
          <div style={{position: 'relative'}}>
            <div style={{
              position: 'relative',
              top: '0px',
              left: '0px'
            }}>
              {cellContent}
            </div>
            <div id="curtain" style={{
              position: 'absolute',
              top: '0px',
              right: '0px'
            }}>
              <columnModel.floatOperationComponent
                rowIdx={rowIdx}
                rowObj={rowObj}
              />
            </div>
          </div>
        );
      }

      return columnModel.hidden === true ? null :
        (<td key={colIdx} className={className} title={cellContent}>
          {tdInner}
        </td>);
    });
  }

  // 渲染操作列，比如修改和删除按钮
  renderOperationColumn() {
    const { rowIdx, rowObj, operationColumnClass: CustomComponent,
      operationColumn
    } = this.props;

    if (!operationColumn) {
      return null;
    }

    return (
      <CustomComponent
        rowIdx={rowIdx}
        rowObj={rowObj}
      />
    );
  }

  renderSelectionColumn() {
    const { rowIdx, rowObj, selectRow, selectionMode, selected } = this.props;

    if (!selectRow) {
      return null;
    }

    return (
      <td>
        <input
          type={selectionMode}
          checked={selected}
          onChange={this.handleCheckboxChange.bind(this)}
        />
      </td>
    );
  }

  render() {
    const { columnsModel, rowObj, operationColumn } = this.props;
    let row;
    let rowClassName = classNames(this.props.selected && 'selected');
    // 默认操作列在右侧，除非用户专门指定在左侧
    if (operationColumn && operationColumn.align === 'left') {
      row = (
        <tr className={rowClassName}>
          { this.renderSelectionColumn() }
          { this.renderOperationColumn() }
          { this.renderCells() }
        </tr>
      );
    } else {
      row = (
        <tr
          className={rowClassName}
          onDoubleClick={this.handleRowDoubleClick.bind(this, rowObj)}
        >
          { this.renderSelectionColumn() }
          { this.renderCells() }
          { this.renderOperationColumn() }
        </tr>
      );
    }
    return row;
  }
}

export default GridRow;

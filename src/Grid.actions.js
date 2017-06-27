/**
 * 模拟redux dispatch去更新state
 * https://medium.com/@wereHamster/beware-react-setstate-is-asynchronous-ce87ef1a9cf3#.52vhwpymp
 */

import update from 'immutability-helper';

/**
 * Update selected status of given row
 *
 * @export
 * @param {number} rowIdx index of given row
 * @param {boolean} isSelected selected status
 */
export function updateRowSelectedState(rowIdx, isSelected) {
  return (prevState/* , props */) => {
    return update(prevState, {
      selectedRowsObj: {
        [rowIdx]: {
          selected: { $set: isSelected }
        }
      }
    });
  };
}

/**
 * 批量更新所有行的选中状态
 */
export function updateAllRowsSelectedState(isSelected) {
  return (prevState/* , props */) => {
    let selectedRowsObj = {};

    prevState.viewedTableData.forEach((item, index) => {
      selectedRowsObj[index] = {
        selected: isSelected
      };
    });

    return update(prevState, {
      selectedRowsObj: {
        $set: selectedRowsObj
      }
    });
  };
}

/**
 * 更新表头被选中的状态
 */
export function updateTableHeadRowSelectedState(isSelected) {
  return (prevState/* , props */) => {
    return update(prevState, {
      isHeadRowSelected: {$set: isSelected}
    });
  };
}

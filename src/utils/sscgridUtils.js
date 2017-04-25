// TODO: The publicly exposed parts of this should be in lib/SSCGridUtils.

function trimString(s) {
  let l = 0;
  let r = s.length - 1;
  while (l < s.length && s[l] === ' ') {
    l++;
  }
  while (r > l && s[r] === ' ') {
    r -= 1;
  }
  return s.substring(l, r + 1);
}
function compareObjects(o1, o2) {
  let k = '';
  for (k in o1) {
    if (o1[k] !== o2[k]) {
      return false;
    }
  }
  for (k in o2) {
    if (o1[k] !== o2[k]) {
      return false;
    }
  }
  return true;
}
function itemExists(haystack, needle) {
  let i;
  for (i = 0; i < haystack.length; i++) {
    if (compareObjects(haystack[i], needle)) {
      return true;
    }
  }
  return false;
}

/**
 * 在objects中查找toSearch
 * 原始版本：http://stackoverflow.com/a/8517170/4685522
 * @param {String} toSearch
 * @param {Object} objects 结构为
 * ```json
 * [
 *   { id: '1', name: 'n1', label: 'l1 n1' },
 *   { id: '2', name: 'n2', label: 'l2 n2' }
 * ]
 * ```
 */
export function searchFor(toSearch, objects) {
  let results = [];
  let i;
  toSearch = trimString(toSearch); // trim it
  for (i = 0; i < objects.length; i++) {
    let key;
    let object = objects[i];
    // 遍历对象的每个键值对进行搜索
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        let value = object[key];
        // 目前只搜索字符串类型的，对于Boolean等类型暂时不做处理
        if (typeof value !== 'string') {
          continue;
        }
        // 没有搜索到
        if (value.indexOf(toSearch) === -1) {
          continue;
        }
        // 搜索到之后先判断结果集是否已经存在该行数据了
        if (!itemExists(results, object)) {
          results.push(object);
        }
      }
    }
  }
  return results;
}

/**
 * 检查当前状态中是否所有行都被选中
 * @param {Object} obj 一个包含所有行被选中状态的对象
 * ```js
 * {
 *   0: { selected: true  }, 第一行被选中
 *   1: { selected: false }  第二行未被选中
 * }
 * ```
 * @return {boolean} 如果是true说明所有行都被选中，否则有一行或者多行未被选中。
 */
export function isAllRowsSelected(obj) {
  let ret = true;
  let i;
  for (i in obj) {
    if (obj.hasOwnProperty(i)) {
      ret = ret && obj[i].selected;
    }
  }
  return ret;
}

/**
 * 根据字段类型，返回不同的默认值
 * @param {Object} fieldModel
 * @param {*} fieldValue
 */
export const getFieldDefaultValue = (fieldModel, fieldValue) => {
  if (fieldValue) {
    return fieldValue;
  }
  switch (fieldModel.type) {
    case 'string': // 0
    case 'double': // 2
      // 字符型初始为空字符串
      return '';
    case 'boolean': // 4
      // 布尔型默认是false
      return false;
    case 'enum': // 6
      // 如果是枚举型，默认使用第一个选项的值
      return fieldModel.data[0].key;
    default:
      break;
  }
};

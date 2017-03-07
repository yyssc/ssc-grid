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

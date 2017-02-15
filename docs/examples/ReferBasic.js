/**
 * Created by Tiger on 17/2/15.
 */
function generateData(x = 3, y = 2, z = 1, gData = []) {
// x：每一级下的节点总数。y：每级节点里有y个节点、存在子节点。z：树的level层级数（0表示一级）
  function _loop(_level, _preKey, _tns) {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({
        label: `${key}-label`,
        value: `${key}-value`,
        key,
        disabled: key === '0-0-0-1' || false,
      });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const __level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return _loop(__level, key, tns[index].children);
    });
  }
  _loop(z);
  return gData;
}

const gData = generateData();

const gridInstance = (
    <Refer treeData={gData} />
);

ReactDOM.render(gridInstance, mountNode);

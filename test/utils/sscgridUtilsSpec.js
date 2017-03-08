import { searchFor } from '../../src/utils/sscgridUtils';

describe('sscgridUtils', () => {
  it('应该从复杂数组中搜索出正确的结果', () => {
    let objects = [
      {
        foo: 'bar',
        bar: 'sit'
      },
      {
        foo: 'lorem',
        bar: 'ipsum'
      },
      {
        foo: 'dolor blor',
        bar: 'amet blo'
      }
    ];
    let expect = [
      {
        foo: 'lorem',
        bar: 'ipsum'
      },
      {
        foo: 'dolor blor',
        bar: 'amet blo'
      }
    ];
    let results = searchFor('lo ', objects);
    assert.deepEqual(results, expect);
  });
});

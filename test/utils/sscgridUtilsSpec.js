import { searchFor, getFieldDefaultValue } from '../../src/utils/sscgridUtils';

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

  it('应该初始化正确的默认值', () => {
    const mockStringFieldModel = {
      type: 'string',
    };
    assert.equal(getFieldDefaultValue(mockStringFieldModel, null), '');
    assert.equal(getFieldDefaultValue(mockStringFieldModel, undefined), '');
    // 输入类型和定义类型不匹配的时候，将数值型强制转换成字符型
    // assert.equal(getFieldDefaultValue(mockStringFieldModel, 0), '0');

    const mockDoubleFieldModel = {
      type: 'double',
    };
    assert.equal(getFieldDefaultValue(mockDoubleFieldModel, null), '');
    assert.equal(getFieldDefaultValue(mockDoubleFieldModel, undefined), '');
    assert.equal(getFieldDefaultValue(mockDoubleFieldModel, 0), 0);

    const mockBooleanFieldModel = {
      type: 'boolean',
    };
    assert.equal(getFieldDefaultValue(mockBooleanFieldModel, null), false);
    assert.equal(getFieldDefaultValue(mockBooleanFieldModel, undefined), false);
    // 输入类型和定义类型不匹配的时候，都使用默认false
    assert.equal(getFieldDefaultValue(mockBooleanFieldModel, 0), false);
    // assert.equal(getFieldDefaultValue(mockBooleanFieldModel, 1), false);
    // assert.equal(getFieldDefaultValue(mockBooleanFieldModel, '1'), false);

    const mockEnumFieldModel = {
      type: 'enum',
      data: [
        { key: 10, value: 'a' },
        { key: 20, value: 'b' },
      ],
    };
    assert.equal(getFieldDefaultValue(mockEnumFieldModel, null), 10);
    assert.equal(getFieldDefaultValue(mockEnumFieldModel, undefined), 10);
    assert.equal(getFieldDefaultValue(mockEnumFieldModel, 0), 10);
    // 输入类型和定义类型不匹配的时候，或者找不到指定的key的时候，均使用第一个值
    assert.equal(getFieldDefaultValue(mockEnumFieldModel, '10'), 10);
    // assert.equal(getFieldDefaultValue(mockEnumFieldModel, 30), 10);

    const mockCustomFieldModel = {
      type: 'custom',
    };
    assert.equal(getFieldDefaultValue(mockCustomFieldModel, 0), 0);
  });
});



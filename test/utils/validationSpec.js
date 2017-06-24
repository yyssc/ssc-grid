import { calcValidationState } from '../../src/utils/validation';

describe('validation', () => {
  it('校验非空字段', () => {
    let result = calcValidationState('', [{ type: 'required' }]);
    assert.deepEqual(result, {
      validationState: 'error',
      helpText: '\n必须输入该字段！',
      helpTexts: ['必须输入该字段！'],
    });
  });
});



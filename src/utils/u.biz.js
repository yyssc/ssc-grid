/* eslint-disable no-var, curly, vars-on-top, func-names, one-var, no-unused-vars, guard-for-in */

var enumerables = true;
var enumerablesTest = {toString: 1};

for (var I in enumerablesTest) {
  enumerables = null;
}
if (enumerables) {
  enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
    'toLocaleString', 'toString', 'constructor'];
}

// u.biz.js
const u = {
  isNumber: (obj) => {
    // return obj === +obj
    return (obj - parseFloat( obj ) + 1) >= 0;
  }
};

/**
 * 复制对象属性
 *
 * @param {Object}  目标对象
 * @param {config} 源对象
 */
u.extend = function(object, config) {
  var args = arguments, options;
  if (args.length > 1) {
    for (var len = 1; len < args.length; len++) {
      options = args[len];
      if (object && options && typeof options === 'object') {
        var i, j, k;
        for (i in options) {
          object[i] = options[i];
        }
        if (enumerables) {
          for (j = enumerables.length; j--;) {
            k = enumerables[j];
            if (options.hasOwnProperty && options.hasOwnProperty(k)) {
              object[k] = options[k];
            }
          }
        }
      }
    }
  }
  return object;
};

/**
 * 抽象格式化类
 */
function AbstractMasker() {}

AbstractMasker.prototype.format = function format(obj) {
  if (obj == null) {
    return null;
  }

  const fObj = this.formatArgument(obj);
  return this.innerFormat(fObj);
};

/**
 * 统一被格式化对象结构
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.formatArgument = function formatArgument(/* obj */) {

};

/**
 * 格式化
 *
 * @param obj
 * @return
 */
AbstractMasker.prototype.innerFormat = function innerFormat(/* obj */) {

};

/**
 *格式结果
 */
function FormatResult(value, color) {
  this.value = value;
  this.color = color;
}
// FormatResult.prototype = new Object;
FormatResult.prototype = {};

/**
 * <b> 数字格式化  </b>
 *
 * <p> 格式化数字
 *
 * </p>
 *
 * Create at 2009-3-20 上午08:50:32
 *
 * @author bq
 * @since V6.0
 */

/**
 * 构造方法
 */
function NumberMasker(formatMeta) {
  this.update(formatMeta);
}

NumberMasker.DefaultFormatMeta = {
  isNegRed: true,
  isMarkEnable: true,
  markSymbol: ',',
  pointSymbol: '.',
  positiveFormat: 'n',
  negativeFormat: '-n'
};

NumberMasker.prototype = new AbstractMasker;
NumberMasker.prototype.formatMeta = null;

NumberMasker.prototype.update = function(formatMeta) {
  this.formatMeta = u.extend({}, NumberMasker.DefaultFormatMeta, formatMeta);
};

/**
 *格式化对象
 */
NumberMasker.prototype.innerFormat = function(obj) {
  var dValue, express, seperatorIndex, strValue;
  dValue = obj.value;
  if (dValue > 0) {
    express = this.formatMeta.positiveFormat;
    strValue = dValue + '';
  } else if (dValue < 0) {
    express = this.formatMeta.negativeFormat;
    strValue = (dValue + '').substr(1, (dValue + '').length - 1);
  } else {
    express = this.formatMeta.positiveFormat;
    strValue = dValue + '';
  }
  seperatorIndex = strValue.indexOf('.');
  strValue = this.setTheSeperator(strValue, seperatorIndex);
  strValue = this.setTheMark(strValue, seperatorIndex);
  var color = null;
  if (dValue < 0 && this.formatMeta.isNegRed) {
    color = 'FF0000';
  }

  /**
   * 将AFindText全部替换为ARepText
   */
  String.prototype.replaceAll = function(AFindText, ARepText) { // eslint-disable-line no-extend-native
    // 自定义String对象的方法
    var raRegExp = new RegExp(AFindText, 'g');
    return this.replace(raRegExp, ARepText);
  };

  return new FormatResult(express.replaceAll('n', strValue), color);
};

/**
 *设置标记
*/
NumberMasker.prototype.setTheMark = function(str, seperatorIndex) {
  var endIndex, first, index;
  if (!this.formatMeta.isMarkEnable)
    return str;
  if (seperatorIndex <= 0)
    seperatorIndex = str.length;
  first = str.charCodeAt(0);
  endIndex = 0;
  if (first === 45)
    endIndex = 1;
  index = seperatorIndex - 3;
  while (index > endIndex) {
    str = str.substr(0, index - 0) + this.formatMeta.markSymbol + str.substr(index, str.length - index);
    index = index - 3;
  }
  return str;
};
NumberMasker.prototype.setTheSeperator = function(str, seperatorIndex) {
  var ca;
  if (seperatorIndex > 0) {
    ca = NumberMasker.toCharArray(str);
    // ca[seperatorIndex] = NumberMasker.toCharArray(this.formatMeta.pointSymbol)[0];
    ca[seperatorIndex] = this.formatMeta.pointSymbol;
    str = ca.join('');
  }
  return str;
};
/**
 * 将字符串转换成char数组
 * @param {} str
 * @return {}
 */
NumberMasker.toCharArray = function(str2) {
  var str = str2.split('');
  var charArray = new Array();
  for (var i = 0; i < str.length; i++) {
    charArray.push(str[i]);
  }
  return charArray;
};

/**
 *默认构造方法
 */
NumberMasker.prototype.formatArgument = function(obj) {
  var numberObj = {};
  numberObj.value = obj;
  return numberObj;
};

u.NumberMasker = NumberMasker;

/**
 * 数据格式化工具
 */

function NumberFormater(precision) {
  this.precision = precision;
}

NumberFormater.prototype.update = function update(precision) {
  this.precision = precision;
};

NumberFormater.prototype.format = function format(value) {
  if (!u.isNumber(value)) return '';

  // 以0开头的数字将其前面的0去掉
  while ((value + '').charAt(0) === '0' && value.length > 1 && (value + '').indexOf('0.') !== 0) {
    value = value.substring(1);
  }
  let result = value;
  if (u.isNumber(this.precision)) {
    // TODO 需要引入BigNumber.js
    // bignumber.js v2.0.7 https://github.com/MikeMcl/bignumber.js
    if (window.BigNumber && !( (value.toString().indexOf('.') > -1) && (value.toString().replace( '.', '' ).length > 15) ) ) {
      // 已经引入BigNumber,并且满足bigNum最大只支持15位有效数字
      result = (new window.BigNumber(value)).toFixed(this.precision);
    } else {
      const digit = parseFloat(value);
      // 解决toFixed四舍五入问题，如1.345
      result = (Math.round(digit * Math.pow(10, this.precision)) / Math.pow(10, this.precision)).toFixed(this.precision);
    }
    if (result === 'NaN') {
      return '';
    }
  }

  return result;
};

u.NumberFormater = NumberFormater;

export default u;

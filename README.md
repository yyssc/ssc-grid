# SSC-Grid [![Travis][build-badge]][build] [![AppVeyor][appveyor-badge]][appveyor] [![npm][npm-badge]][npm] [![Codecov][codecov-badge]][codecov]

SSC 3.0 Grid组件

![](screenshot_20170124_012.jpg)

## 使用

```
npm install ssc-grid --save
```

```
import Grid from 'ssc-grid';
...
render() {
  const cols = {...};
  const tableData = {...};
  return (
    <Grid cols={cols} tableData={tableData} />
  );
}
```

## 文档

[API文档][documentation]中带有示例代码，并且可以在线编辑并运行代码。

[documentation]: https://ssc-grid.github.io
[contributing]: CONTRIBUTING.md

[build-badge]: https://travis-ci.org/yyssc/ssc-grid.svg?branch=master
[build]: https://travis-ci.org/yyssc/ssc-grid

[npm-badge]: https://badge.fury.io/js/ssc-grid.svg
[npm]: http://badge.fury.io/js/ssc-grid

[codecov-badge]: https://img.shields.io/codecov/c/github/yyssc/ssc-grid/master.svg
[codecov]: https://codecov.io/gh/yyssc/ssc-grid

[appveyor-badge]: https://img.shields.io/appveyor/ci/yyssc/ssc-grid/master.svg
[appveyor]: https://ci.appveyor.com/project/yyssc/ssc-grid

# Maintaining SSC Grid

## 准备开发环境

```
npm install
```

## 开发组件

以TDD开发模式运行测试代码

```
npm run tdd
```

## 开发文档

以开发模式运行文档网站

```
npm run docs
```

```
npm run docs-prod  # 运行非调试版文档本地服务器
npm run docs-prod-unoptimized # 运行非调试版文档（未优化）本地服务器
```

## 测试

运行测试代码

```
export CHROME_BIN=chromium-browser ## 如果操作系统为Linux，需要设定该环境变量
export CHROME_BIN=google-chrome ## 如果操作系统为Linux，需要设定该环境变量
npm test
```

## 编译

编译代码以及文档

```
npm run build
```

编译调试版文档到docs-built目录下

```
npm run docs-build
```

## 发版（Releases）

注意：请勿使用`npm publish`命令进行手动发布

注意2：发布之前先`npm run test`确保测试通过

注意3：发布之前先修改`CHANGELOG.md`文件，然后将修改提交到github，然后再进行如下发布流程

```
npm run release patch // 打补丁，默认不添加任何参数，以`dry run`模式运行，防止误操作
npm run release minor // 增加新功能（当major是0的时候，比如0.2.1，那么接口变化也用release minor）
npm run release major // 接口出现变化
npm run release patch -- --run // 进行真实发版
```

### 发布的时候hang住了

如果在发布的时候，hang住了，通常是在git clone文档repo的时候，可以Ctrl+C之后执行（需要首先确认hang在哪里了）：

```
git clone git@github.com:ssc-grid/ssc-grid.github.io.git tmp-docs-repo
cd tmp-docs-repo/
rm -rf assets/ *.html rm -rf assets/ *.html
cp -r ../docs-built/* .
git add -A .
git commit -m 'Release v0.3.0'
git tag -a -m 'v0.3.0' v0.3.0
git push --follow-tags
cd ..
rm -rf tmp-docs-repo/
```

release的流程在[这里](https://github.com/AlexKVal/release-script/blob/master/src/release.js#L198)

### 发布脚本会做如下事情

- 运行lint脚本
- 运行测试脚本
- 修改版本号
- git tag
- 在本地编译源码到`dist`等目录下，并将编译结果发布到npm上
- 在本地编译文档源码到`docs-built`目录，并将`docs-built`目录下的文件push到[https://github.com/ssc-grid/ssc-grid.github.io](https://github.com/ssc-grid/ssc-grid.github.io)项目

### 关于dry run

发版工具默认以`dry run`模式运行，防止误操作导致代码被`git push`到代码仓库，以及
`npm publish`到npmjs.com中。

在运行过`dry run`模式之后，由于`package.json`中的版本号被升级了，所以需要通过`git checkout -- .`来恢复原来的版本。（先确认local没有其他修改）

你可以使用

- 学到如何使用发版工具，以及发版工具是如何运行的。
- 确认发版过程中不会出现其他问题，比如编译失败，或者其他潜在的问题。

## 历史遗留问题

TODO 可能已经废弃了，需要确认

```
grid@0.1.0 /home/chenyang/source/grid
├── UNMET PEER DEPENDENCY history@^1.17.0
└─┬ react-router@1.0.3 
  └── warning@2.1.0 
```

通过`npm install history@2.1.2`解决。
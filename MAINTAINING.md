# Maintaining SSC Grid

## 准备开发环境

```
npm install
```

babel-cli和webpack需要安装到global中。

```
sudo npm install -g babel-cli
sudo npm install webpack -g ## 有些js文件中通过exec()直接执行command line
```

```
export CHROME_BIN=chromium-browser ## 如果操作系统为Linux，需要设定该环境变量
npm test
```

## 历史遗留问题

```
grid@0.1.0 /home/chenyang/source/grid
├── UNMET PEER DEPENDENCY history@^1.17.0
└─┬ react-router@1.0.3 
  └── warning@2.1.0 
```

通过`npm install history@2.1.2`解决。

## 从Github合并代码到用友GitLab

```
# 配置环境
git clone git@git.yonyou.com:sscplatform/react_comp.git
cd react_comp
git remote add upstream https://github.com/yyssc/ssc-grid.git
# 合并代码
git fetch upstream
git checkout develop
git merge upstream/master
git push
```

## 发版（Releases）

注意：请勿手动`npm publish`

```
npm run release patch // 打补丁，默认不添加任何参数，以`dry run`模式运行，防止误操作
npm run release minor // 增加新功能（当major是0的时候，比如0.2.1，那么接口变化也用release minor）
npm run release major // 接口出现变化
npm run release patch -- --run // 进行真实发版
```

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

### 关于dry run

发版工具默认以`dry run`模式运行，防止误操作导致代码被`git push`到代码仓库，以及
`npm publish`到npmjs.com中。

你可以使用

- 学到如何使用发版工具，以及发版工具是如何运行的。
- 确认发版过程中不会出现其他问题，比如编译失败，或者其他潜在的问题。

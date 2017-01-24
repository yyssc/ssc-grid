# Maintaining SSC Grid

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
npm run release patch // 默认不添加任何参数，以`dry run`模式运行，防止误操作
npm run release patch -- --run // 进行真实发版
```

### 关于dry run

发版工具默认以`dry run`模式运行，防止误操作导致代码被`git push`到代码仓库，以及
`npm publish`到npmjs.com中。

你可以使用

- 学到如何使用发版工具，以及发版工具是如何运行的。
- 确认发版过程中不会出现其他问题，比如编译失败，或者其他潜在的问题。

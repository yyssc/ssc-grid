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

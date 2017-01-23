# grid
React grid component for SSC 3.0

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

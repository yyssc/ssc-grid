# SSC-Comp Documentation Website

This website is single page app built on
[React](http://facebook.github.io/react/), with styles and structure taken from
the [Bootstrap](http://getbootstrap.com/) docs website.  The app is statically
generated to HTML via node and then hosted it by pushing HTML to [GitHub
Pages](http://pages.github.com/).

## 开发

From the repository root run `npm run docs` and navigate your browser to
`http://localhost:4000`. This will start an express base node server with
webpack-dev middleware that will watch your file changes and recompile all the
static assets needed to generate the site. In the console output you'll see that
we bind to two ports. The first port is the one you'll use to load the docs in
your browser. The second is the webpack-dev-server we use to build the client
side assets in watch mode. _Note: while the docs should start on port 4000 if
that port is in use we progressively look for an available port.  Observe
console output for the actual port that we use._ We use the
[webpack][webpack-hot] and [react][react-hot] hot loading functionality to allow
your development experience to have quickest feedback loop possible.

For a demo of how the hot loader works checkout this video:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=vViVUbyAWeY
" target="_blank"><img src="http://img.youtube.com/vi/vViVUbyAWeY/0.jpg" 
alt="Demo of hot loader" width="240" height="180" border="10" /></a>

### 如何写一个新的组件

比如创建了新的组件`TextInput`，那么需要改动如下几个文件：

- `docs/src/ReactPlaygroud.js` 将组件import到文档页面，可以在文档页面的代码示例中直接使用。
- `docs/src/Samples.js` 将组件import到文档页面，可以在文档页面的代码示例中直接使用。
- `docs/examples/TextInputBasic.js` 创建示例代码，这个示例代码会被添加到文档中。
- `docs/src/sections/*Section.js` 根据组件的类型，比如`TextInput`从属于表单，那么就不用新建`TextInputSection.js`，而是修改已存在的`FormSection.js`文件。
- `docs/src/ComponentsPage.js` 文档中的“组件列表”页面。在代码的最上面需要导入`docs/src/section/*Section.js`，然后将`<*Section>`添加到`render()`中，最后在右边栏中的`<Nav>`中添加组件的锚，方便在文档页面中快速定位到组件。
- `docs/examples/.eslintrc` 将`TextInput`添加到`globals`中，也就是eslint在检查`docs/examples/*.js`的时候不检查`TextInput`这个全局变量。

## Production

This site is statically published on github pages, to do this the static assets
need to be generated. You can simulate a similar experience with `npm run
docs-prod` and navigating your browser to `http://localhost:4000`

[webpack-hot]: http://webpack.github.io/docs/hot-module-replacement-with-webpack.html
[react-hot]: http://gaearon.github.io/react-hot-loader/

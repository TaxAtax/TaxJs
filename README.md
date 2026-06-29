# TaxJS

一个轻量、纯粹的 JavaScript 工具库，提供简洁的 DOM 操作、数组处理、对象扩展以及内置的前端路由模块。**无任何外部依赖**，旨在用最原生、最直接的方式提升开发效率。

## 设计初衷

厌倦了大型框架的复杂和冗余？TaxJS 回归 JavaScript 的本质，对原生 API 进行实用、直观的封装，让你更专注于业务逻辑本身。

## 核心特性

*   **简洁的 DOM 选择与操作**：通过 `t()` 函数和原型链扩展，提供类似 jQuery 的流畅体验。
*   **实用的原生方法增强**：为 `Array` 和 `Object` 扩展了 `swap`、`uni`、`clear` 等常用方法。
*   **内置简易动画**：支持 `fadeIn`、`slideUp` 等常见动画效果，无需额外引入动画库。
*   **前端路由模块**：内置极简路由器 (`t.router`)，轻松构建单页应用 (SPA)。（新功能）

## 快速开始

### 引入

在你的 HTML 文件中，直接通过 `<script>` 标签引入 `TaxJS.js` 即可。

```html
<script src="path/to/TaxJS.js"></script>
```

### 基础用法

#### DOM 操作

```javascript
// 选择元素
const el = t('#myElement');
// 或
const els = t('.my-class');

// 设置样式
el.sty('color', 'red');
// 或批量设置
el.sty({
    'background': '#f0f0f0',
    'padding': '10px'
});

// 修改内容
el.html('<strong>新内容</strong>');
el.text('纯文本内容');
```

#### 数组增强

```javascript
const arr = [1, 2, 3, 4, 5];
arr.swap(0, 4);   // [5, 2, 3, 4, 1]
arr.uni();        // 数组去重
```

### 路由模块 (`t.router`)

TaxJS 内置了一个极简路由，让你可以轻松实现页面无刷新切换。

```javascript
// 1. 注册路由
t.router.register('/', function() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('about').style.display = 'none';
});

t.router.register('/about', function() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('about').style.display = 'block';
});

// 2. 启动路由
document.addEventListener('DOMContentLoaded', function() {
    t.router.init();
});

// 3. 在点击事件中导航
document.getElementById('aboutLink').addEventListener('click', function(e) {
    e.preventDefault();
    t.router.navigate('/about');
});
```

#### 路由 API

*   `t.router.register(path, handler)`：注册一个路由规则。
*   `t.router.navigate(path)`：跳转到指定路径（会更新浏览器地址栏）。
*   `t.router.init()`：初始化路由器，监听 `popstate` 事件并处理当前 URL。

## 完整 API 参考

*   **DOM 操作**：`t()`, `sty()`, `html()`, `text()`, `val()`, `addCls()`, `delCls()`, `animate()` 等。
*   **数组**：`atg()`, `swap()`, `uni()`, `clear()`, `fa()`, `ba()`, `find()` 等。
*   **对象**：`get()`, `set()`。
*   **Ajax**：`ajax.get()`, `ajax.post()`。

*(提示：完整列表请参阅源码或后续详细文档)*

## License

MIT License © TaxAtax

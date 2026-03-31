
# TaxJS操作库使用说明

## 简介
TaxJS是一个轻量级的操作库，旨在简化JavaScript中的操作。它提供了直观的API来创建元素、设置属性、添加事件监听器等功能，让前端开发更加高效。

## 核心功能

### 1. 元素选择器
TaxJS提供了多种方式来选择页面元素：
- `t('#id')` - 通过ID选择元素
- `t('.class')` - 通过类名选择元素
- `t('tag')` - 通过标签名选择元素
- `t.getId('id')` - 直接通过ID获取元素
- `t.getByCls('class')` - 通过类名获取元素

### 2. 元素创建
使用`t.create()`方法可以轻松创建新元素：
- `t.create('div')` - 创建div元素并添加到body末尾
- `t.create('button', parentElement)` - 创建按钮并插入到指定父元素

### 3. 属性操作
TaxJS扩展了Element原型，提供便捷的属性操作方法：
- `element.setAttr('属性名', '属性值')` - 设置元素属性
- `element.getAttr('属性名')` - 获取元素属性值
- `element.removeAttr('属性名')` - 移除元素属性

### 4. 类名操作
提供了丰富的类名操作功能：
- `element.getClsList()` - 获取元素所有类名
- `element.getCls('className')` - 检查元素是否包含指定类名
- `element.addClass('className')` - 添加类名
- `element.removeClass('className')` - 移除类名
- `element.toggleClass('className')` - 切换类名

### 5. 样式操作
简化CSS样式操作：
- `element.sty('属性名', '属性值')` - 设置单个样式

- `element.sty({prop1: 'value1', prop2: 'value2'})` - 批量设置样式

- `还可批量设置样式` - t():返回值如果是多个元素即可批量设置

  `t().sty()`

### 6. 事件处理
便捷的事件监听器管理：
- `element.on('click', handler)` - 添加事件监听器
- `element.off('click', handler)` - 移除事件监听器
- `element.emit('click')` - 触发事件

### 7. 内容操作
操作元素内容的多种方式：
- `element.text('文本内容')` - 设置或获取文本内容
- `element.html('<p>HTML内容</p>')` - 设置或获取HTML内容
- `element.val('表单值')` - 设置或获取表单元素值

### 8. 动画效果
内置基础动画功能：
- `element.animate('fadeIn', 500)` - 淡入动画
- `element.animate('fadeOut', 500)` - 淡出动画
- `element.animate('slideup', 300)` - 上滑动画
- `element.animate('slidedown', 300)` - 下滑动画
- `element.animate('toggle', 400)` - 切换显示状态

### 9. DOM结构操作
丰富的DOM节点操作方法：
- `element.append(child)` - 在元素末尾添加子元素
- `element.prepend(child)` - 在元素开头添加子元素
- `element.before(sibling)` - 在元素前面添加兄弟元素
- `element.after(sibling)` - 在元素后面添加兄弟元素
- `element.remove()` - 移除元素自身
- `element.empty()` - 清空元素所有子元素

## 数组扩展功能
TaxJS还扩展了原生数组方法，提供更强大的数据处理能力：
- `array.forEach(callback)` - 遍历数组元素
- `array.map(callback)` - 映射数组元素
- `array.filter(callback)` - 过滤数组元素
- `array.find(callback)` - 查找数组元素
- `array.reduce(callback, initialValue)` - 归约数组元素

## 使用方法
1. 在HTML页面中引入TaxJS库文件
2. 直接使用`t()`选择器或Element原型方法进行DOM操作
3. 享受简洁高效的DOM操作体验

## 浏览器兼容性
TaxJS支持所有现代浏览器，包括Chrome、Firefox、Safari、Edge等主流浏览器。

## 声明
此程序完全开源

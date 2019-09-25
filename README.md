## javascript-nodejs-tree
JavaScript 十行代码实现无限分类树

实现原理：利用引用类型，变量只是指向该对象的指针（不了解的去看引用类型，C语言的指针、地址是什么）
****
> 对该函数的实现困惑点在treeResult.push(item)?
> 为何此处仅将根节点加入了返回的结果集，console返回的结果集却已是tree树

>>实际在对父节点添加子类parentNode.children.push操作时 根节点也已同步发生变化，这就是引用类型。或者说他们的值都指向同一个地点（有图的话可能比较好理解）。  
>>可以console map 、treeResult 、rows看看是否能印证上面说话

```javascript
	function convertToTreeData(rows){ 
	  // 将数据存储为以id为KEY的map对象 用于过滤出根节点
	  var map = {};
	  //返回的结果
	  var treeResult = [];
	  rows.forEach((item) => map[item.id] = item)
	  // 使用rows的upper_id去map对象中找key 即id、有值，此项不在顶级当中,则把此项添加到对应的父级
	  // 没有在map中找到对应的key，该item则作为顶级
	  rows.forEach((item) => {
		  var parentNode = map[item.upper_id];
		  parentNode != undefined ? (parentNode.children || ( parentNode.children = [] )).push(item) : treeResult.push(item);
	  })
	  return treeResult;
	}
```

示例
```javascript
	let arr = [
	{ id: 1, name: "零零零", upper_id: 0 },
	{ id: 2, name: "壹壹壹", upper_id: 1 },
	{ id: 3, name: "壹壹壹", upper_id: 1 },
	{ id: 4, name: "贰贰贰", upper_id: 2 },
	{ id: 5, name: "零零零", upper_id: 0 },
	{ id: 6, name: "伍伍伍, upper_id: 5 },
	{ id: 7, name: "陆陆陆", upper_id: 6 },
	{ id: 8, name: "陆陆陆", upper_id: 6 },
	];

	console.log(convertToTreeData(rows))
```

本人js小白一个  如有说错  欢迎指正
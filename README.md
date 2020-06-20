## javascript-nodejs-tree
JavaScript 十行代码以内实现无限分类树

实现原理：利用引用类型，变量只是指向该对象的指针（不了解的去看引用类型，C语言的指针、地址是什么）
****
> 对该函数的实现困惑点在treeResult.push(item)?
> 为何此处仅将根节点加入了返回的结果集，console返回的结果集却已是tree树

>>实际在对父节点添加子类parentNode.children.push操作时 根节点也已同步发生变化，这就是引用类型。或者说他们的值都指向同一个地点（有图的话可能比较好理解）。  
>>可以函数return前console map 、treeResult 、rows看看是否能印证上面说话

```javascript
	/*
	 * 无限分类树实现
	 * rows: [{id:*, text:*, pid:*}]
	 * return: [{id:*, text:*, state:'close',
	 *           children:[{id:*, text:*, state:'close', children:[...]}]}]
	 */
	function convert2Tree(rows, id='id', pid='pid'){ 
	  // 将数据存储为以id为KEY的map对象 用于过滤出根节点
	  const map = {}, r = [];
	  rows.forEach(item => (map[item[id]] = item))
	  // 使用rows的pid去map对象中找key 即id、有值，此项不在顶级当中,则把此项添加到对应的父级
	  // 没有在map中找到对应的key，该item则作为顶级
	  rows.forEach(item => {
		  let parentNode = map[item[pid]];
		  parentNode != undefined ? (parentNode.children || ( parentNode.children = [] )).push(item) : r.push(item);
	  })
	  return r;
	}
```

示例
```javascript
	let arr = [
	{ id: 1, name: "零零零", pid: 0 },
	{ id: 2, name: "壹壹壹", pid: 1 },
	{ id: 3, name: "壹壹壹", pid: 1 },
	{ id: 4, name: "贰贰贰", pid: 2 },
	{ id: 5, name: "零零零", pid: 0 },
	{ id: 6, name: "伍伍伍", pid: 5 },
	{ id: 7, name: "陆陆陆", pid: 6 },
	{ id: 8, name: "陆陆陆", pid: 6 },
	];

	console.log(convert2Tree(rows))
```


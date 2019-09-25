function convertToTreeData(rows){
  var map = {};
  var treeResult = [];
  rows.forEach((item) => map[item.id] = item)
  rows.forEach((item) => {
      var parentNode = map[item.upper_id];
      parentNode != undefined ? (parentNode.children || ( parentNode.children = [] )).push(item) : treeResult.push(item);
  })
  return treeResult;
}
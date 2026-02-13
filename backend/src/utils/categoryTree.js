const CategoryTree = (categories = []) => {
  const map = {};
  const roots = [];

  categories.forEach((cat) => {
    map[cat._id.toString()] = { ...cat, children: [] };
  });

  categories.forEach((cat) => {
    const id = cat._id.toString();
    const parentId = cat.parentId?.toString();
    if(parentId && map[parentId]){
      map[parentId]?.children.push(map[id]);
    } else {
      roots.push(map[id]);
    }
  });
  return roots;
};

export default CategoryTree;

// 对象深拷贝
export const objDeepCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

// 我需要一个会改变原数组的过滤
const arrayFilert = function (list, fn) {
  for (let i = 0; i < list.length; ) {
    if (!fn(list[i], i)) {
      list.splice(i, 1);
    } else {
      i++;
    }
  }
  return list;
};

/**
 * 用来过滤数组开始的树结构数据，采用的剔除不相干枝干的逻辑，所以会改变原数组，使用时请传入数组的副本
 * @param {Array} treeList 要过滤的树
 * @param {Funtction} fn 过滤规则
 */
const deepFilter = function (treeList, fn) {
  return arrayFilert(treeList, (item) => {
    if (item.children && item.children.length) {
      deepFilter(item.children, fn);
      if (item.children.length) {
        return true;
      } else {
        // 之前的逻辑是它只有在属于目录的时候才会有children，所以不需要考虑本身匹配的情况
        // 此系统中菜单下还可能会有菜单，所以要处理他自己就能匹配的情况
        return fn(item);
      }
    } else {
      return fn(item);
    }
  });
};

/** deepFilter的包装，使方法不改变传入的数据  */
export const treeFilter = function (treeList, fn) {
  return deepFilter(objDeepCopy(treeList), fn);
};

// 将树转成一维数组
export const flattenDeep = (array = []) => {
  const list = [];

  const deep = function (obj) {
    if (obj.type === "1") {
      // eslint-disable-next-line no-unused-vars
      const { children, ...item } = obj;
      list.push(item);
    }
    if (obj.children && obj.children.length) {
      obj.children.forEach((item) => deep(item));
    }
  };

  array.forEach((item) => deep(item));

  return list;
};
